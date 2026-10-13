"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activa, setActiva] = useState(0);

  return (
    <div className="lg:sticky lg:top-[calc(var(--alto-header)+1.5rem)] lg:self-start">
      <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border-4 border-ink bg-paper-card shadow-[10px_10px_0_var(--color-accent)]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={activa}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[activa]}
              alt={alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiva(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-pressed={activa === i}
              className={cn(
                "relative size-20 shrink-0 overflow-hidden rounded-2xl border-[3px] transition-transform",
                activa === i ? "-rotate-3 border-ink" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image src={img} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
