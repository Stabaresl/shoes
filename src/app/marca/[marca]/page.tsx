import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VistaCatalogo } from "@/components/VistaCatalogo";
import { obtenerCatalogo, obtenerCategorias, obtenerMarcas, slugificar } from "@/lib/catalogo";

export async function generateStaticParams() {
  return (await obtenerMarcas()).map((m) => ({ marca: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/marca/[marca]">): Promise<Metadata> {
  const { marca } = await params;
  const encontrada = (await obtenerMarcas()).find((m) => m.slug === marca);
  return { title: encontrada?.nombre ?? "Marca" };
}

export default async function PaginaMarca({ params }: PageProps<"/marca/[marca]">) {
  const { marca } = await params;
  const [productos, categorias] = await Promise.all([obtenerCatalogo(), obtenerCategorias()]);
  const suyos = productos.filter((p) => slugificar(p.brand) === marca);
  if (suyos.length === 0) notFound();

  return (
    <VistaCatalogo
      etiqueta="marca"
      titulo={suyos[0].brand}
      productos={suyos}
      categorias={categorias}
    />
  );
}
