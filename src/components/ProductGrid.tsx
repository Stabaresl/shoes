"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

/** Grilla de productos; con `filtros` muestra chips por marca arriba. */
export function ProductGrid({ products, filtros = false }: { products: Product[]; filtros?: boolean }) {
  const [marca, setMarca] = useState<string | null>(null);

  const marcas = useMemo(() => {
    const conteo = new Map<string, number>();
    for (const p of products) conteo.set(p.brand, (conteo.get(p.brand) ?? 0) + 1);
    return [...conteo].sort((a, b) => b[1] - a[1]);
  }, [products]);

  const visibles = marca ? products.filter((p) => p.brand === marca) : products;

  return (
    <LayoutGroup>
      {filtros && marcas.length > 1 && (
        <div role="group" aria-label="Filtrar por marca" className="mb-8 flex flex-wrap gap-2">
          {[["Todas", products.length] as const, ...marcas].map(([nombre, total]) => {
            const valor = nombre === "Todas" ? null : nombre;
            const activa = marca === valor;
            return (
              <button
                key={nombre}
                type="button"
                onClick={() => setMarca(valor)}
                aria-pressed={activa}
                className={cn(
                  "relative h-10 rounded-full border-2 border-ink px-4 text-sm font-bold transition-colors",
                  activa ? "text-paper" : "hover:bg-ink/5"
                )}
              >
                {activa && (
                  <motion.span
                    layoutId="filtro-marca"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">
                  {nombre} <span className="opacity-60">{total}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      <motion.ul layout className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibles.map((product, i) => (
            <motion.li
              key={product.slug}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} prioridad={i < 2} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}
