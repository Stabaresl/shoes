"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { enlaceWhatsApp } from "@/lib/tienda";
import { useMontado } from "@/lib/use-montado";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

type Categoria = { slug: string; titulo: string };

export function Header({ categorias }: { categorias: Categoria[] }) {
  const ruta = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [bajo, setBajo] = useState(false);
  const toggleCart = useCartStore((s) => s.toggle);
  const montado = useMontado();
  const guardados = useCartStore((s) => s.totalItems());
  // El carrito vive en localStorage: el número solo se muestra ya en el navegador.
  const totalItems = montado ? guardados : 0;
  const whatsapp = enlaceWhatsApp("¡Hola! Vengo de la tienda y quiero preguntar por unos tenis.");

  useEffect(() => {
    let cuadro = 0;
    const revisar = () => {
      cuadro = 0;
      setBajo(window.scrollY > 24);
    };
    const alDesplazar = () => {
      if (!cuadro) cuadro = requestAnimationFrame(revisar);
    };
    revisar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => {
      window.removeEventListener("scroll", alDesplazar);
      cancelAnimationFrame(cuadro);
    };
  }, []);

  // Sobre la galería de portada el header es transparente y claro.
  const sobreFoto = ruta === "/" && !bajo && !menuAbierto;

  const enlaces = [
    { href: "/catalogo", etiqueta: "Catálogo" },
    ...categorias.slice(0, 3).map((c) => ({ href: `/coleccion/${c.slug}`, etiqueta: c.titulo })),
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,color] duration-300",
        sobreFoto
          ? "sobre-oscuro bg-transparent text-paper"
          : "bg-paper/90 text-ink shadow-[0_1px_0_var(--color-slate-light)] backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" aria-label="footshootermzl — inicio" className="shrink-0">
          <Logo light={sobreFoto} className="text-lg sm:text-xl" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {enlaces.map((e) => {
            const activo = ruta === e.href;
            return (
              <Link
                key={e.href}
                href={e.href}
                aria-current={activo ? "page" : undefined}
                className="relative rounded-full px-4 py-2 text-sm font-semibold"
              >
                {activo && (
                  <motion.span
                    layoutId="nav-activo"
                    className={cn("absolute inset-0 rounded-full", sobreFoto ? "bg-paper/15" : "bg-ink/8")}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{e.etiqueta}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden h-10 items-center gap-2 rounded-full border-2 border-current px-4 text-sm font-bold transition-transform hover:-translate-y-0.5 sm:flex"
            >
              <MessageCircle className="size-4" />
              Escríbenos
            </a>
          )}
          <button
            type="button"
            onClick={toggleCart}
            className="relative flex size-11 items-center justify-center rounded-full transition-colors hover:bg-current/10"
            aria-label={`Abrir carrito${totalItems ? ` (${totalItems})` : ""}`}
          >
            <ShoppingBag className="size-5" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0, rotate: -40 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-accent text-[11px] font-black text-ink"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full md:hidden"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
          >
            {menuAbierto ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuAbierto && (
          <motion.nav
            aria-label="Menú"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-light md:hidden"
          >
            <ul className="flex flex-col px-4 py-4">
              {enlaces.map((e, i) => (
                <motion.li
                  key={e.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={e.href}
                    onClick={() => setMenuAbierto(false)}
                    className="titular block py-2.5 text-3xl"
                  >
                    {e.etiqueta}
                  </Link>
                </motion.li>
              ))}
              {whatsapp && (
                <li className="pt-3">
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent font-bold text-ink"
                  >
                    <MessageCircle className="size-4" /> Escríbenos por WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
