"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Pause, Play } from "lucide-react";

type Video = { src: string; titulo: string; poster?: string };

/**
 * Videos que solo se descargan y reproducen cuando están en pantalla (y nunca
 * solos si la persona pidió reducir el movimiento).
 */
function VideoEnPantalla({ video, className }: { video: Video; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reducir = useReducedMotion();
  const [sonando, setSonando] = useState(false);
  const [pausadoAMano, setPausadoAMano] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducir || pausadoAMano) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!el.src) el.src = video.src;
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducir, pausadoAMano, video.src]);

  function alternar() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      if (!el.src) el.src = video.src;
      setPausadoAMano(false);
      el.play().catch(() => {});
    } else {
      setPausadoAMano(true);
      el.pause();
    }
  }

  return (
    <div className={className}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={video.poster}
        width={1280}
        height={720}
        aria-label={video.titulo}
        onPlay={() => setSonando(true)}
        onPause={() => setSonando(false)}
        className="h-full w-full object-cover"
      />
      <button
        type="button"
        onClick={alternar}
        aria-label={sonando ? "Pausar video" : "Reproducir video"}
        className="absolute right-4 bottom-4 flex size-12 items-center justify-center rounded-full bg-paper text-ink shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:scale-105"
      >
        {sonando ? <Pause className="size-5" /> : <Play className="size-5" />}
      </button>
    </div>
  );
}

export function EnMovimiento({ videos }: { videos: Video[] }) {
  const seccion = useRef<HTMLElement>(null);
  const reducir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: seccion, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reducir ? ["0%", "0%"] : ["8%", "-18%"]);
  const [principal, ...resto] = videos;
  if (!principal) return null;

  return (
    <section ref={seccion} className="overflow-x-clip py-24 sm:py-32">
      <motion.p
        aria-hidden
        style={{ x }}
        className="titular titular-angosto pointer-events-none text-[22vw] whitespace-nowrap text-ink/[0.07] select-none"
      >
        En movimiento · En movimiento
      </motion.p>
      <div className="mx-auto -mt-[11vw] max-w-7xl px-4 sm:px-6">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="titular text-5xl sm:text-6xl">
              Hechos para
              <br />
              <span className="text-slate">moverse</span>
            </h2>
          </div>
          <VideoEnPantalla
            video={principal}
            className="relative aspect-video overflow-hidden rounded-[2rem] border-4 border-ink bg-ink shadow-[10px_10px_0_var(--color-accent)] lg:col-span-8"
          />
        </div>
        {resto.length > 0 && (
          <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4">
            {resto.map((v) => (
              <VideoEnPantalla
                key={v.src}
                video={v}
                className="relative aspect-[9/16] w-56 shrink-0 snap-start overflow-hidden rounded-3xl border-4 border-ink bg-ink sm:w-64"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
