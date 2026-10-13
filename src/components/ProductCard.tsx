"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import { cn, formatPrice } from "@/lib/utils";

export function ProductCard({ product, prioridad = false }: { product: Product; prioridad?: boolean }) {
  const addItem = useCartStore((s) => s.addItem);
  const disponibles = product.sizes.filter((s) => s.available);
  const [talla, setTalla] = useState<number | null>(disponibles[0]?.size ?? null);
  const [agregado, setAgregado] = useState(false);
  const segunda = product.images[1];

  function agregar(e: React.MouseEvent) {
    e.preventDefault();
    if (talla === null) return;
    addItem(product, talla);
    setAgregado(true);
    window.setTimeout(() => setAgregado(false), 1300);
  }

  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border-[3px] border-ink bg-paper-card transition-[translate,box-shadow] duration-200 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_var(--color-ink)]">
        <Link href={`/producto/${product.slug}`} className="absolute inset-0">
          <Image
            src={product.images[0]}
            alt={`${product.name} ${product.colorway}`}
            fill
            priority={prioridad}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "object-cover transition-[scale,opacity] duration-500 ease-out",
              segunda ? "group-hover:opacity-0" : "group-hover:scale-110"
            )}
          />
          {segunda && (
            <Image
              src={segunda}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          <span className="absolute top-3 left-3 -rotate-3 rounded-md bg-ink px-2 py-1 text-[10px] font-black tracking-[0.15em] text-paper uppercase transition-transform duration-300 group-hover:rotate-0">
            {product.brand}
          </span>
          {disponibles.length === 0 && (
            <span className="absolute top-3 right-3 rotate-3 rounded-md bg-paper px-2 py-1 text-[10px] font-black text-ink uppercase">
              Agotado
            </span>
          )}
        </Link>

        {disponibles.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full flex-wrap gap-1 bg-gradient-to-t from-ink/85 to-transparent p-3 pt-8 transition-transform duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0">
            {disponibles.slice(0, 6).map((s) => (
              <button
                key={s.size}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setTalla(s.size);
                }}
                aria-pressed={talla === s.size}
                aria-label={`Talla ${s.size}`}
                className={cn(
                  "flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 text-[11px] font-bold transition-colors",
                  talla === s.size ? "bg-accent text-ink" : "bg-paper text-ink hover:bg-accent-light"
                )}
              >
                {s.size}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3 px-1">
        <Link href={`/producto/${product.slug}`} className="min-w-0">
          <h3 className="truncate font-display text-base leading-tight font-black uppercase italic">
            {product.model}
          </h3>
          <p className="truncate text-xs text-slate">{product.colorway}</p>
          <p className="mt-1 text-sm font-bold">{formatPrice(product.price)}</p>
        </Link>

        <button
          type="button"
          onClick={agregar}
          disabled={talla === null}
          className="relative flex size-11 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-accent text-ink transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-ink)] active:translate-y-0 active:shadow-none disabled:bg-slate-light"
          aria-label={talla === null ? "Agotado" : `Agregar ${product.name} talla ${talla} al carrito`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={agregado ? "listo" : "mas"}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
            >
              {agregado ? <Check className="size-5" strokeWidth={3} /> : <Plus className="size-5" strokeWidth={3} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </article>
  );
}
