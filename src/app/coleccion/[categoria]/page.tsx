import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VistaCatalogo } from "@/components/VistaCatalogo";
import { obtenerCatalogo, obtenerCategorias, tituloCategoria } from "@/lib/catalogo";
import { CATEGORIAS } from "@/lib/tienda";

export async function generateStaticParams() {
  return (await obtenerCategorias()).map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/coleccion/[categoria]">): Promise<Metadata> {
  const { categoria } = await params;
  return { title: tituloCategoria(categoria), description: CATEGORIAS[categoria]?.frase };
}

export default async function PaginaColeccion({ params }: PageProps<"/coleccion/[categoria]">) {
  const { categoria } = await params;
  const [productos, categorias] = await Promise.all([obtenerCatalogo(), obtenerCategorias()]);
  const suyos = productos.filter((p) => p.category === categoria);
  if (suyos.length === 0) notFound();

  return (
    <VistaCatalogo
      etiqueta="colección"
      titulo={tituloCategoria(categoria)}
      frase={CATEGORIAS[categoria]?.frase}
      productos={suyos}
      categorias={categorias}
      activa={categoria}
    />
  );
}
