import { obtenerCatalogo } from "@/lib/catalogo";

/**
 * Catálogo en JSON para las automatizaciones de n8n (publicación en Facebook
 * y bot de Messenger). Sale de la misma fuente que la tienda (la hoja de Google
 * o, si no está configurada, `src/lib/products.ts`), así la web, las
 * publicaciones y el bot quedan alineados.
 *
 * GET /api/catalogo              -> todos los productos
 * GET /api/catalogo?categoria=urbano
 * GET /api/catalogo?slug=adidas-samba-blanco-negro
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const sitio = process.env.SITIO_URL?.replace(/\/$/, "") ?? origin;

  const categoria = searchParams.get("categoria");
  const slug = searchParams.get("slug");

  let seleccion = await obtenerCatalogo();
  if (categoria) seleccion = seleccion.filter((p) => p.category === categoria);
  if (slug) seleccion = seleccion.filter((p) => p.slug === slug);

  const catalogo = seleccion.map((producto) => {
    const tallas = producto.sizes.filter((t) => t.available).map((t) => t.size);

    return {
      slug: producto.slug,
      nombre: producto.name,
      marca: producto.brand,
      modelo: producto.model,
      color: producto.colorway,
      categoria: producto.category,
      precio: producto.price,
      precioTexto: new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      }).format(producto.price),
      descripcion: producto.description,
      tallasDisponibles: tallas,
      agotado: tallas.length === 0,
      url: `${sitio}/producto/${producto.slug}`,
      imagenes: producto.images.map((img) => `${sitio}${img}`),
    };
  });

  return Response.json({
    total: catalogo.length,
    generado: new Date().toISOString(),
    productos: catalogo,
  });
}
