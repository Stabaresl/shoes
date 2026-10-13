import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Cinta } from "@/components/home/Cinta";
import { Colecciones, type Coleccion } from "@/components/home/Colecciones";
import { ComoComprar } from "@/components/home/ComoComprar";
import { EnMovimiento } from "@/components/home/EnMovimiento";
import { HeroGaleria } from "@/components/home/HeroGaleria";
import { ProductGrid } from "@/components/ProductGrid";
import {
  obtenerCatalogo,
  obtenerDestacados,
  obtenerPortada,
  slugificar,
  tituloCategoria,
} from "@/lib/catalogo";
import { urlOptimizada } from "@/lib/imagen";
import type { Product } from "@/lib/products";
import { CATEGORIAS, CINTA, COLECCIONES, CONTRA_ENTREGA, enlaceWhatsApp, VIDEOS } from "@/lib/tienda";
import { formatPrice } from "@/lib/utils";

function armarColecciones(productos: Product[]): Coleccion[] {
  const colecciones: Coleccion[] = [];
  const crear = (tipo: "marca" | "categoria", valor: string, foto?: string) => {
    const suyos = productos.filter((p) =>
      tipo === "marca" ? slugificar(p.brand) === slugificar(valor) : p.category === valor
    );
    if (suyos.length === 0) return;
    const portada = suyos.find((p) => p.slug === foto) ?? suyos[0];
    const modelos = `${suyos.length} ${suyos.length === 1 ? "modelo" : "modelos"}`;
    colecciones.push({
      titulo: tipo === "marca" ? suyos[0].brand : tituloCategoria(valor),
      descripcion: tipo === "categoria" && CATEGORIAS[valor] ? `${modelos} · ${CATEGORIAS[valor].frase}` : modelos,
      imagen: urlOptimizada(portada.images[0], 640),
      href: tipo === "marca" ? `/marca/${slugificar(valor)}` : `/coleccion/${valor}`,
    });
  };

  for (const c of COLECCIONES) crear(c.tipo, c.valor, c.foto);
  // Categorías nuevas que lleguen desde la hoja y no estén en la lista.
  const categorias = new Set(productos.map((p) => p.category));
  for (const cat of categorias) {
    if (!COLECCIONES.some((c) => c.tipo === "categoria" && c.valor === cat)) crear("categoria", cat);
  }
  return colecciones;
}

export default async function Inicio() {
  const [portada, destacados, catalogo] = await Promise.all([
    obtenerPortada(),
    obtenerDestacados(),
    obtenerCatalogo(),
  ]);
  const whatsapp = enlaceWhatsApp("¡Hola! Vengo de la tienda y quiero unos tenis.");

  return (
    <>
      <HeroGaleria
        whatsapp={whatsapp}
        bajada={
          CONTRA_ENTREGA
            ? "Deportivos, urbanos y casuales. Escoges, nos escribes y pagas cuando te llega."
            : "Deportivos, urbanos y casuales. Escoges tu par y nos escribes."
        }
        fotos={portada.map((p) => ({
          src: urlOptimizada(p.images[0], 1920),
          thumb: urlOptimizada(p.images[0], 256),
          alt: `${p.name} ${p.colorway}`,
          nombre: p.name,
          color: p.colorway,
          precio: formatPrice(p.price),
          slug: p.slug,
        }))}
      />

      <Cinta textos={CINTA} className="-mt-6" />

      <section className="mx-auto max-w-7xl px-4 pt-24 pb-24 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="titular text-5xl sm:text-7xl">
            Lo más
            <br />
            <span className="relative inline-block">
              pedido
              <svg
                aria-hidden
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 h-4 w-full text-accent"
                preserveAspectRatio="none"
              >
                <path d="M2 14 C 80 2, 200 2, 298 12" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <Link
            href="/catalogo"
            className="group inline-flex items-center gap-2 font-bold underline decoration-accent decoration-4 underline-offset-8"
          >
            Ver los {catalogo.length} pares
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ProductGrid products={destacados} />
      </section>

      <Colecciones colecciones={armarColecciones(catalogo)} />
      <Cinta textos={CINTA} invertida className="-mt-5" />

      <EnMovimiento videos={VIDEOS} />
      <ComoComprar />

      {whatsapp && (
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-ink bg-accent p-8 sm:p-14">
            <p className="font-marker text-xl">¿no encuentras tu talla?</p>
            <h2 className="titular mt-2 max-w-3xl text-5xl sm:text-7xl">Escríbenos y te ayudamos a encontrarlo</h2>
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="sobre-oscuro mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-ink px-7 font-bold text-paper shadow-[5px_5px_0_var(--color-paper)] transition-[translate,box-shadow] hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <MessageCircle className="size-5" /> Hablar por WhatsApp
            </a>
          </div>
        </section>
      )}
    </>
  );
}
