import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductGrid } from "@/components/ProductGrid";
import { obtenerCatalogo, obtenerProducto, obtenerRelacionados, tituloCategoria } from "@/lib/catalogo";

export async function generateStaticParams() {
  return (await obtenerCatalogo()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const producto = await obtenerProducto(slug);
  if (!producto) return {};
  return {
    title: `${producto.name} ${producto.colorway}`.trim(),
    description: producto.description || `${producto.name} ${producto.colorway} en footshootermzl.`,
  };
}

export default async function PaginaProducto({ params }: PageProps<"/producto/[slug]">) {
  const { slug } = await params;
  const producto = await obtenerProducto(slug);
  if (!producto) notFound();

  const relacionados = await obtenerRelacionados(producto);

  return (
    <>
      <ProductDetail product={producto} categoria={tituloCategoria(producto.category)} />
      {relacionados.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <h2 className="titular mb-10 text-4xl sm:text-5xl">También te puede gustar</h2>
          <ProductGrid products={relacionados} />
        </section>
      )}
    </>
  );
}
