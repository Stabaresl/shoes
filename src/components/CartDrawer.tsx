"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const lines = useCartStore((s) => s.lines);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const totalPrice = useCartStore((s) => s.totalPrice());

  // Escape cierra el carrito.
  useEffect(() => {
    if (!isOpen) return;
    const alTeclear = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l-4 border-ink bg-paper"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito"
          >
            <div className="flex items-center justify-between border-b-2 border-ink px-5 py-4">
              <h2 className="titular text-3xl">Tu carrito</h2>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="flex size-11 items-center justify-center rounded-full hover:bg-ink/5"
                aria-label="Cerrar carrito"
              >
                <X className="size-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <motion.span
                  initial={{ rotate: -20, scale: 0.6 }}
                  animate={{ rotate: -6, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 12 }}
                  className="flex size-20 items-center justify-center rounded-2xl border-4 border-ink bg-accent"
                >
                  <ShoppingBag className="size-9" />
                </motion.span>
                <p className="titular mt-3 text-2xl">Todavía vacío</p>
                <p className="text-sm text-slate">Tu próximo par te está esperando.</p>
                <Link
                  href="/catalogo"
                  onClick={close}
                  className="mt-3 rounded-full bg-ink px-6 py-3 text-sm font-bold text-paper hover:bg-ink-soft"
                >
                  Ver catálogo
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-5 py-2">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={`${line.productSlug}-${line.size}`}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 60, height: 0 }}
                        className="flex gap-3 border-b border-slate-light py-4"
                      >
                        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border-2 border-ink bg-paper-card">
                          <Image src={line.image} alt={line.name} fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate font-bold">{line.name}</p>
                              <p className="text-xs text-slate">
                                {line.colorway} · Talla {line.size}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeLine(line.productSlug, line.size)}
                              className="flex size-8 shrink-0 items-center justify-center rounded-full text-slate hover:bg-ink/5 hover:text-ink"
                              aria-label={`Quitar ${line.name} talla ${line.size}`}
                            >
                              <X className="size-4" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center gap-1 rounded-full border-2 border-ink">
                              <button
                                type="button"
                                onClick={() => setQuantity(line.productSlug, line.size, line.quantity - 1)}
                                className="flex size-8 items-center justify-center"
                                aria-label="Restar uno"
                              >
                                <Minus className="size-3.5" />
                              </button>
                              <span className="w-5 text-center text-sm font-bold">{line.quantity}</span>
                              <button
                                type="button"
                                onClick={() => setQuantity(line.productSlug, line.size, line.quantity + 1)}
                                className="flex size-8 items-center justify-center"
                                aria-label="Sumar uno"
                              >
                                <Plus className="size-3.5" />
                              </button>
                            </div>
                            <p className="font-bold">{formatPrice(line.price * line.quantity)}</p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="border-t-2 border-ink px-5 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-slate">Subtotal</span>
                    <span className="font-display text-2xl font-black italic">{formatPrice(totalPrice)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={close}
                    className="block w-full rounded-full border-[3px] border-ink bg-accent py-4 text-center font-black text-ink uppercase shadow-[5px_5px_0_var(--color-ink)] transition-[translate,box-shadow] active:translate-x-1 active:translate-y-1 active:shadow-none"
                  >
                    Hacer el pedido
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
