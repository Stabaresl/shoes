"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PolaroidLineCarousel from "@/components/ui/polaroid-line-carousel";

export type Coleccion = {
  titulo: string;
  descripcion: string;
  imagen: string;
  href: string;
};

export function Colecciones({ colecciones }: { colecciones: Coleccion[] }) {
  const [activa, setActiva] = useState(0);
  const alCambiar = useCallback((i: number) => setActiva(i), []);
  const actual = colecciones[activa];

  return (
    <section id="colecciones" className="sobre-oscuro bg-ink pt-24 text-paper sm:pt-28">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-6">
        <div>
          <p className="font-marker text-xl text-accent">arrastra la cuerda →</p>
          <h2 className="titular mt-2 text-5xl sm:text-7xl">
            Elige tu
            <br />
            estilo
          </h2>
        </div>
        {actual && (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={actual.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Link
                href={actual.href}
                className="group inline-flex h-14 items-center gap-2 rounded-full bg-accent px-7 font-black text-ink uppercase shadow-[5px_5px_0_var(--color-paper)] transition-[translate,box-shadow] hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                Ver {actual.titulo}
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <PolaroidLineCarousel
        slides={colecciones.map((c) => ({
          image: c.imagen,
          title: c.titulo,
          caption: c.descripcion,
          alt: c.titulo,
        }))}
        height="min(72svh, 600px)"
        cardWidth={280}
        sag={52}
        autoplay={4200}
        string="#bcd4ea"
        background="var(--color-ink)"
        ink="var(--color-paper)"
        onChange={alCambiar}
        ariaLabel="Colecciones"
        style={{
          ["--pl-font-note" as string]: "var(--font-marcador)",
          ["--pl-font-title" as string]: "var(--font-archivo)",
        }}
      />
    </section>
  );
}
