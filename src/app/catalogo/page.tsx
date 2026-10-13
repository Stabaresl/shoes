import type { Metadata } from "next";
import { VistaCatalogo } from "@/components/VistaCatalogo";
import { obtenerCatalogo, obtenerCategorias } from "@/lib/catalogo";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Todos los tenis de footshootermzl: deportivos, urbanos y casuales.",
};

export default async function PaginaCatalogo() {
  const [productos, categorias] = await Promise.all([obtenerCatalogo(), obtenerCategorias()]);
  return (
    <VistaCatalogo
      etiqueta="todo lo que hay"
      titulo="Catálogo"
      productos={productos}
      categorias={categorias}
      activa="todo"
    />
  );
}
