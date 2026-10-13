"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import MorphGallery from "@/components/ui/morph-gallery";

export type FotoPortada = {
  src: string;
  thumb: string;
  alt: string;
  nombre: string;
  color: string;
  precio: string;
  slug: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const LINEAS = ["Tenis que", "hablan", "por ti."];

export function HeroGaleria({
  fotos,
  whatsapp,
  bajada,
}: {
  fotos: FotoPortada[];
  whatsapp: string | null;
  bajada: string;
}) {
  const [indice, setIndice] = useState(0);
  const reducir = useReducedMotion();
  const actual = fotos[indice];
  const mover = (paso: number) => setIndice((i) => (i + paso + fotos.length) % fotos.length);

  return (
    <section className="relative -mt-(--alto-header)" aria-label="Portada">
      <MorphGallery
        items={fotos.map(({ src, thumb, alt }) => ({ src, thumb, alt }))}
        index={indice}
        onIndexChange={setIndice}
        height="max(100svh, 640px)"
        autoplay={5200}
        duration={1600}
        arrows={false}
      />

      {/* Velo para que el texto se lea sobre cualquier foto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-r from-black/75 via-black/30 to-black/0"
      />

      <div className="pointer-events-none absolute inset-0 z-[7] flex items-center pt-(--alto-header) pb-40 sm:pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <motion.p
            initial={reducir ? false : { opacity: 0, rotate: -12, scale: 0.6 }}
            animate={{ opacity: 1, rotate: -3, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.2 }}
            className="mb-5 inline-block rounded-md bg-accent px-3 py-1.5 text-xs font-black tracking-[0.18em] text-ink uppercase shadow-[3px_3px_0_var(--color-paper)]"
          >
            Tienda online de calzado
          </motion.p>

          <h1 className="titular text-[clamp(3rem,9vw,7.5rem)] text-paper">
            {LINEAS.map((linea, i) => (
              <span key={linea} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={i === 1 ? "inline-block text-accent" : "inline-block"}
                  initial={reducir ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.35 + i * 0.12 }}
                >
                  {linea}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={reducir ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.8 }}
            className="mt-6 max-w-md text-base text-paper/90 sm:text-lg"
          >
            {bajada}
          </motion.p>

          <motion.div
            initial={reducir ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.95 }}
            className="pointer-events-auto mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/catalogo"
              className="group inline-flex h-14 items-center gap-2 rounded-full bg-accent px-7 text-base font-black text-ink uppercase shadow-[5px_5px_0_var(--color-paper)] transition-[translate,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_var(--color-paper)] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Ver catálogo
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="sobre-oscuro inline-flex h-14 items-center gap-2 rounded-full border-2 border-paper px-6 font-bold text-paper backdrop-blur-sm transition-colors hover:bg-paper hover:text-ink"
              >
                <MessageCircle className="size-5" /> Pedir por WhatsApp
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* El par que está en la foto, con enlace y controles. */}
      {actual && (
        <div className="absolute inset-x-4 bottom-6 z-10 sm:inset-x-auto sm:right-6 sm:bottom-28 sm:w-80">
          <div className="flex items-stretch gap-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={actual.slug + indice}
                initial={{ opacity: 0, y: 12, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="min-w-0 flex-1"
              >
                <Link
                  href={`/producto/${actual.slug}`}
                  className="group block rounded-2xl bg-paper p-3.5 text-ink shadow-[5px_5px_0_var(--color-accent)] transition-transform hover:-translate-y-0.5"
                >
                  <span className="text-[10px] font-black tracking-[0.2em] text-slate uppercase">
                    En la foto · {String(indice + 1).padStart(2, "0")}/{String(fotos.length).padStart(2, "0")}
                  </span>
                  <span className="mt-0.5 block truncate font-display text-lg font-black italic uppercase">
                    {actual.nombre}
                  </span>
                  <span className="flex items-center justify-between gap-2 text-sm">
                    <span className="truncate text-slate">{actual.color}</span>
                    <span className="flex shrink-0 items-center gap-1 font-bold">
                      {actual.precio}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
              </motion.div>
            </AnimatePresence>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => mover(-1)}
                aria-label="Foto anterior"
                className="flex min-h-11 min-w-11 flex-1 items-center justify-center rounded-xl bg-paper/15 text-paper backdrop-blur-md transition-colors hover:bg-paper hover:text-ink"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => mover(1)}
                aria-label="Foto siguiente"
                className="flex min-h-11 min-w-11 flex-1 items-center justify-center rounded-xl bg-paper/15 text-paper backdrop-blur-md transition-colors hover:bg-paper hover:text-ink"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
