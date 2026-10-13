"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, HandCoins, MessageCircle, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import { CONTRA_ENTREGA, enlaceWhatsApp } from "@/lib/tienda";
import { cn, formatPrice } from "@/lib/utils";
import { ProductGallery } from "./ProductGallery";

export function ProductDetail({ product, categoria }: { product: Product; categoria: string }) {
  const addItem = useCartStore((s) => s.addItem);
  const disponibles = product.sizes.filter((s) => s.available);
  const [talla, setTalla] = useState<number | null>(disponibles[0]?.size ?? null);
  const [agregado, setAgregado] = useState(false);
  const [avisoTalla, setAvisoTalla] = useState(false);

  function agregar() {
    if (talla === null) {
      setAvisoTalla(true);
      window.setTimeout(() => setAvisoTalla(false), 1800);
      return;
    }
    addItem(product, talla);
    setAgregado(true);
    window.setTimeout(() => setAgregado(false), 1500);
  }

  function pedirPorWhatsApp() {
    const mensaje =
      `¡Hola! Quiero estos tenis: ${product.name} ${product.colorway}` +
      (talla !== null ? `, talla ${talla}` : "") +
      ` (${formatPrice(product.price)}). ${window.location.href}`;
    const url = enlaceWhatsApp(mensaje);
    if (url) window.open(url, "_blank", "noopener");
  }

  const hayWhatsApp = Boolean(enlaceWhatsApp(""));

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-16">
      <ProductGallery images={product.images} alt={`${product.name} ${product.colorway}`} />

      <div>
        <nav aria-label="Ruta" className="text-xs font-semibold text-slate">
          <Link href="/catalogo" className="hover:text-ink">Catálogo</Link> /{" "}
          <Link href={`/coleccion/${product.category}`} className="hover:text-ink">{categoria}</Link>
        </nav>
        <p className="mt-5 inline-block -rotate-2 rounded-md bg-ink px-2.5 py-1 text-xs font-black tracking-[0.18em] text-paper uppercase">
          {product.brand}
        </p>
        <h1 className="titular mt-3 text-[clamp(2.25rem,10vw,3.75rem)] break-words">{product.model}</h1>
        {product.colorway && <p className="mt-2 text-lg text-slate">{product.colorway}</p>}
        <p className="mt-5 inline-block rounded-xl bg-accent px-4 py-1.5 font-display text-3xl font-black italic">
          {formatPrice(product.price)}
        </p>

        {product.description && <p className="mt-6 max-w-md leading-relaxed text-ink-soft">{product.description}</p>}

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-black tracking-[0.15em] uppercase">Talla</span>
            <AnimatePresence>
              {avisoTalla && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="text-sm font-semibold"
                >
                  Elige una talla primero
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          {disponibles.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  type="button"
                  disabled={!s.available}
                  onClick={() => setTalla(s.size)}
                  aria-pressed={talla === s.size}
                  className={cn(
                    "relative flex h-12 w-16 items-center justify-center rounded-xl border-[3px] text-base font-bold transition-[translate,box-shadow,background-color]",
                    !s.available && "cursor-not-allowed border-slate-light text-slate line-through",
                    s.available && talla === s.size && "-translate-y-0.5 border-ink bg-accent shadow-[3px_3px_0_var(--color-ink)]",
                    s.available && talla !== s.size && "border-ink hover:bg-accent-light"
                  )}
                >
                  {s.size}
                </button>
              ))}
            </div>
          ) : (
            <p className="rounded-xl border-2 border-dashed border-slate-light p-4 text-sm text-slate">
              Ahora mismo no tenemos tallas cargadas para este par. Escríbenos y te contamos.
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={agregar}
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full border-[3px] border-ink bg-accent font-black text-ink uppercase shadow-[5px_5px_0_var(--color-ink)] transition-[translate,box-shadow] hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={agregado ? "listo" : "agregar"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2"
              >
                {agregado ? <Check className="size-5" /> : <ShoppingBag className="size-5" />}
                {agregado ? "¡Agregado!" : "Agregar al carrito"}
              </motion.span>
            </AnimatePresence>
          </button>
          {hayWhatsApp && (
            <button
              type="button"
              onClick={pedirPorWhatsApp}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full border-[3px] border-ink font-bold transition-colors hover:bg-ink hover:text-paper"
            >
              <MessageCircle className="size-5" /> Pedir por WhatsApp
            </button>
          )}
        </div>

        {CONTRA_ENTREGA && (
          <p className="mt-8 flex items-start gap-3 rounded-2xl bg-sky/50 p-4 text-sm">
            <HandCoins className="mt-0.5 size-5 shrink-0" />
            <span>
              <strong>Pagas cuando te llega.</strong> Te confirmamos el pedido por WhatsApp antes de
              despacharlo.
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
