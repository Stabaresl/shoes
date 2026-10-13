import Link from "next/link";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductGrid } from "./ProductGrid";

/** Encabezado + navegación entre categorías + grilla con filtro por marca. */
export function VistaCatalogo({
  etiqueta,
  titulo,
  frase,
  productos,
  categorias,
  activa,
}: {
  etiqueta: string;
  titulo: string;
  frase?: string;
  productos: Product[];
  categorias: { slug: string; titulo: string; total: number }[];
  activa?: string;
}) {
  const pestanas = [{ href: "/catalogo", titulo: "Todo", clave: "todo" }].concat(
    categorias.map((c) => ({ href: `/coleccion/${c.slug}`, titulo: c.titulo, clave: c.slug }))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-marker text-lg text-slate">{etiqueta}</p>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
        <h1 className="titular text-[clamp(2.5rem,11vw,6rem)] break-words">{titulo}</h1>
        <p className="mb-2 rounded-full border-[3px] border-ink px-4 py-1.5 text-sm font-black">
          {productos.length} {productos.length === 1 ? "par" : "pares"}
        </p>
      </div>
      {frase && <p className="mt-3 max-w-xl text-lg text-slate">{frase}</p>}

      <nav aria-label="Categorías" className="mt-8 flex flex-wrap gap-2 border-b-2 border-ink pb-6">
        {pestanas.map((p) => (
          <Link
            key={p.clave}
            href={p.href}
            aria-current={activa === p.clave ? "page" : undefined}
            className={cn(
              "titular rounded-full px-4 py-2 text-lg transition-colors",
              activa === p.clave ? "bg-accent text-ink" : "hover:bg-ink/5"
            )}
          >
            {p.titulo}
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        {productos.length > 0 ? (
          <ProductGrid products={productos} filtros />
        ) : (
          <p className="py-20 text-center text-slate">Todavía no hay pares aquí. Vuelve pronto.</p>
        )}
      </div>
    </div>
  );
}
