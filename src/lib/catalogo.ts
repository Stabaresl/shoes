import "server-only";
import Papa from "papaparse";
import { cache } from "react";
import { idArchivoDrive, idCarpetaDrive, rutaFoto } from "./drive";
import { catalogoLocal, type Product } from "./products";
import { CATEGORIAS, DESTACADOS_RESPALDO, PORTADA_RESPALDO } from "./tienda";

/**
 * Catálogo de la tienda.
 *
 * Fuente: una hoja de Google (CATALOGO_URL). Cada fila es un par de zapatos.
 * La tienda la vuelve a leer cada 5 minutos, o al instante con /api/revalidar.
 * Si la hoja no está configurada o falla, se usa el catálogo local (products.ts).
 *
 * Columnas (no importan mayúsculas ni tildes):
 *   activo | portada | destacado | categoria | marca | modelo | color | precio |
 *   tallas | fotos | descripcion | slug
 */

export const ETIQUETA_CATALOGO = "catalogo";
const REVALIDAR_CADA = 300;

const SI = new Set(["si", "x", "1", "true", "yes", "verdadero"]);
const NO = new Set(["no", "0", "false", "falso"]);

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLowerCase();
}

export function slugificar(texto: string): string {
  return normalizar(texto)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** "36-38, 40 42" → [36, 37, 38, 40, 42] (acepta medias tallas: 38.5). */
export function leerTallas(texto: string): number[] {
  const tallas = new Set<number>();
  for (const parte of texto.replace(/,(?=\d\b)/g, ".").split(/[\s;,/]+/)) {
    const rango = parte.match(/^(\d+(?:\.\d)?)-(\d+(?:\.\d)?)$/);
    if (rango) {
      for (let t = Number(rango[1]); t <= Number(rango[2]); t++) tallas.add(t);
    } else if (/^\d+(?:\.\d)?$/.test(parte)) {
      tallas.add(Number(parte));
    }
  }
  return [...tallas].sort((a, b) => a - b);
}

/** Enlace de compartir de Google Sheets → URL que descarga la hoja como CSV. */
export function urlCsv(url: string): string {
  if (/output=csv|format=csv/.test(url)) return url;
  const hoja = url.match(/\/spreadsheets\/d\/([A-Za-z0-9_-]+)/);
  if (!hoja) return url;
  const gid = url.match(/[#&?]gid=(\d+)/)?.[1] ?? "0";
  return `https://docs.google.com/spreadsheets/d/${hoja[1]}/export?format=csv&gid=${gid}`;
}

async function fotosDeCarpeta(idCarpeta: string): Promise<string[]> {
  const clave = process.env.GOOGLE_API_KEY;
  if (!clave) {
    console.warn("[catalogo] Hay una carpeta de Drive en la hoja, pero falta GOOGLE_API_KEY para leerla.");
    return [];
  }
  const q = encodeURIComponent(`'${idCarpeta}' in parents and mimeType contains 'image/' and trashed = false`);
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&orderBy=name&fields=files(id)&pageSize=50&key=${clave}`;
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDAR_CADA, tags: [ETIQUETA_CATALOGO] } });
    if (!res.ok) throw new Error(`Drive respondió ${res.status}`);
    const { files } = (await res.json()) as { files?: { id: string }[] };
    return (files ?? []).map((f) => rutaFoto(f.id));
  } catch (error) {
    console.error(`[catalogo] No se pudo leer la carpeta ${idCarpeta}:`, error);
    return [];
  }
}

async function leerFotos(texto: string): Promise<string[]> {
  const fotos: string[] = [];
  for (const parte of texto.split(/[\s,;]+/).filter(Boolean)) {
    const carpeta = idCarpetaDrive(parte);
    const archivo = idArchivoDrive(parte);
    if (carpeta) fotos.push(...(await fotosDeCarpeta(carpeta)));
    else if (archivo) fotos.push(rutaFoto(archivo));
    else if (parte.startsWith("/")) fotos.push(parte);
    else console.warn(`[catalogo] Foto ignorada (usen un enlace de Drive o una ruta /products/...): ${parte}`);
  }
  return fotos;
}

type Fila = Record<string, string | undefined>;

async function filaAProducto(fila: Fila, n: number): Promise<Product | null> {
  const v = (k: string) => fila[k]?.trim() ?? "";
  if (NO.has(normalizar(v("activo")))) return null;

  const marca = v("marca");
  const modelo = v("modelo");
  const precio = Number(v("precio").replace(/\D/g, ""));
  if (!marca || !modelo || !precio) {
    console.warn(`[catalogo] Fila ${n} ignorada: falta marca, modelo o precio.`);
    return null;
  }

  const color = v("color");
  const images = await leerFotos(v("fotos"));
  if (images.length === 0) {
    console.warn(`[catalogo] Fila ${n} (${marca} ${modelo}) sin fotos: no se muestra.`);
    return null;
  }

  return {
    slug: slugificar(v("slug") || `${marca} ${modelo} ${color}`),
    brand: marca,
    model: modelo,
    name: `${marca} ${modelo}`,
    colorway: color,
    category: slugificar(v("categoria")) || "urbano",
    price: precio,
    description: v("descripcion"),
    images,
    sizes: leerTallas(v("tallas")).map((size) => ({ size, available: true })),
    cover: SI.has(normalizar(v("portada"))),
    featured: SI.has(normalizar(v("destacado"))),
  };
}

async function leerHoja(url: string): Promise<Product[]> {
  const res = await fetch(urlCsv(url), {
    next: { revalidate: REVALIDAR_CADA, tags: [ETIQUETA_CATALOGO] },
  });
  if (!res.ok) throw new Error(`La hoja respondió ${res.status}`);
  const texto = await res.text();
  if (texto.trimStart().startsWith("<")) {
    throw new Error("La hoja devolvió una página, no un CSV. ¿Está compartida como «cualquiera con el enlace»?");
  }

  const { data } = Papa.parse<Fila>(texto, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (h) => slugificar(h).replace(/-/g, "_"),
  });

  const productos = (await Promise.all(data.map((fila, i) => filaAProducto(fila, i + 2)))).filter(
    (p): p is Product => p !== null,
  );

  // Slugs únicos aunque dos filas se llamen igual.
  const vistos = new Map<string, number>();
  for (const p of productos) {
    const veces = vistos.get(p.slug) ?? 0;
    vistos.set(p.slug, veces + 1);
    if (veces > 0) p.slug = `${p.slug}-${veces + 1}`;
  }
  return productos;
}

export const obtenerCatalogo = cache(async (): Promise<Product[]> => {
  const url = process.env.CATALOGO_URL;
  if (!url) return catalogoLocal;
  try {
    const productos = await leerHoja(url);
    if (productos.length === 0) throw new Error("La hoja no tiene productos válidos.");
    return productos;
  } catch (error) {
    console.error("[catalogo] Usando el catálogo local porque la hoja falló:", error);
    return catalogoLocal;
  }
});

// ---------- consultas ----------

export async function obtenerProducto(slug: string) {
  return (await obtenerCatalogo()).find((p) => p.slug === slug);
}

const porSlugs = (productos: Product[], slugs: string[]) =>
  slugs.map((s) => productos.find((p) => p.slug === s)).filter((p): p is Product => Boolean(p));

export async function obtenerPortada(): Promise<Product[]> {
  const productos = await obtenerCatalogo();
  const marcados = productos.filter((p) => p.cover);
  if (marcados.length > 0) return marcados.slice(0, 10);
  const respaldo = porSlugs(productos, PORTADA_RESPALDO);
  return respaldo.length > 0 ? respaldo : productos.slice(0, 8);
}

export async function obtenerDestacados(): Promise<Product[]> {
  const productos = await obtenerCatalogo();
  const marcados = productos.filter((p) => p.featured);
  if (marcados.length > 0) return marcados.slice(0, 12);
  const respaldo = porSlugs(productos, DESTACADOS_RESPALDO);
  return respaldo.length > 0 ? respaldo : productos.slice(0, 8);
}

export function tituloCategoria(categoria: string): string {
  return CATEGORIAS[categoria]?.titulo ?? categoria.charAt(0).toUpperCase() + categoria.slice(1);
}

export async function obtenerCategorias(): Promise<{ slug: string; titulo: string; total: number }[]> {
  const conteo = new Map<string, number>();
  for (const p of await obtenerCatalogo()) conteo.set(p.category, (conteo.get(p.category) ?? 0) + 1);
  const orden = Object.keys(CATEGORIAS);
  return [...conteo]
    .map(([slug, total]) => ({ slug, titulo: tituloCategoria(slug), total }))
    .sort((a, b) => (orden.indexOf(a.slug) + 1 || 99) - (orden.indexOf(b.slug) + 1 || 99));
}

export async function obtenerMarcas(): Promise<{ slug: string; nombre: string; total: number }[]> {
  const conteo = new Map<string, { nombre: string; total: number }>();
  for (const p of await obtenerCatalogo()) {
    const slug = slugificar(p.brand);
    const actual = conteo.get(slug) ?? { nombre: p.brand, total: 0 };
    actual.total += 1;
    conteo.set(slug, actual);
  }
  return [...conteo].map(([slug, m]) => ({ slug, ...m })).sort((a, b) => b.total - a.total);
}

export async function obtenerRelacionados(producto: Product, cantidad = 4) {
  const productos = await obtenerCatalogo();
  const mismaMarca = productos.filter((p) => p.brand === producto.brand && p.slug !== producto.slug);
  const mismaCategoria = productos.filter(
    (p) => p.category === producto.category && p.brand !== producto.brand,
  );
  return [...mismaMarca, ...mismaCategoria].slice(0, cantidad);
}
