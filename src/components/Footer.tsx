import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { enlaceWhatsApp, REDES } from "@/lib/tienda";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons/SocialIcons";
import { Logo } from "./Logo";

const ICONOS = { instagram: InstagramIcon, tiktok: TikTokIcon, facebook: FacebookIcon };

export function Footer({ categorias }: { categorias: { slug: string; titulo: string }[] }) {
  const whatsapp = enlaceWhatsApp("¡Hola! Quiero preguntar por unos tenis.");
  const redes = (Object.keys(REDES) as (keyof typeof REDES)[]).filter((r) => REDES[r]);

  return (
    <footer className="sobre-oscuro overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="titular text-3xl sm:text-4xl">
              ¿Dudas con la talla?
              <br />
              <span className="text-accent">Pregúntanos.</span>
            </p>
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-bold text-ink shadow-[4px_4px_0_var(--color-paper)] transition-transform hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <MessageCircle className="size-4" /> Escribir por WhatsApp
              </a>
            )}
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-[0.2em] text-paper/60 uppercase">Tienda</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/catalogo" className="hover:text-accent">
                  Todo el catálogo
                </Link>
              </li>
              {categorias.map((c) => (
                <li key={c.slug}>
                  <Link href={`/coleccion/${c.slug}`} className="hover:text-accent">
                    {c.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {redes.length > 0 && (
            <div>
              <h2 className="text-xs font-bold tracking-[0.2em] text-paper/60 uppercase">Síguenos</h2>
              <div className="mt-4 flex gap-3">
                {redes.map((r) => {
                  const Icono = ICONOS[r];
                  return (
                    <a
                      key={r}
                      href={REDES[r]}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={r}
                      className="flex size-10 items-center justify-center rounded-full bg-paper/10 transition-colors hover:bg-accent hover:text-ink"
                    >
                      <Icono className="size-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div aria-hidden className="mt-16 select-none">
        <Logo light className="block translate-y-[0.18em] px-2 text-center text-[7.4vw]" />
      </div>
      <p className="border-t border-paper/10 py-5 text-center text-xs text-paper/50">
        © {new Date().getFullYear()} footshootermzl · Tienda online de calzado
      </p>
    </footer>
  );
}
