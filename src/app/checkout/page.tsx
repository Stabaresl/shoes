"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { CONTRA_ENTREGA, enlaceWhatsApp } from "@/lib/tienda";
import { useMontado } from "@/lib/use-montado";
import { formatPrice } from "@/lib/utils";

const campo =
  "h-12 w-full rounded-xl border-[3px] border-ink bg-paper-card px-4 text-base focus:shadow-[3px_3px_0_var(--color-ink)] focus:outline-none";

/**
 * No hay pasarela de pago: el pedido se arma aquí y se envía por WhatsApp,
 * donde lo confirman antes de despachar.
 */
export default function PaginaPedido() {
  const montado = useMontado();
  const guardadas = useCartStore((s) => s.lines);
  const lines = montado ? guardadas : [];
  const totalPrice = useCartStore((s) => s.totalPrice());
  const hayWhatsApp = Boolean(enlaceWhatsApp(""));

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    const detalle = lines
      .map((l) => `• ${l.quantity} × ${l.name} ${l.colorway}, talla ${l.size} — ${formatPrice(l.price * l.quantity)}`)
      .join("\n");
    const lineas = [
      "¡Hola! Quiero hacer este pedido:",
      detalle,
      `Total: ${formatPrice(totalPrice)}`,
      "",
      `Nombre: ${datos.get("nombre")}`,
      `Ciudad: ${datos.get("ciudad")}`,
      `Dirección: ${datos.get("direccion")}`,
    ];
    if (datos.get("notas")) lineas.push(`Notas: ${datos.get("notas")}`);
    const mensaje = lineas.join("\n");
    const url = enlaceWhatsApp(mensaje);
    if (url) window.open(url, "_blank", "noopener");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="titular text-5xl sm:text-6xl">Tu pedido</h1>

      {lines.length === 0 ? (
        <div className="mt-10 rounded-[2rem] border-4 border-dashed border-ink/30 p-10 text-center">
          <p className="text-slate">Tu carrito está vacío.</p>
          <Link href="/catalogo" className="mt-4 inline-block rounded-full bg-ink px-6 py-3 font-bold text-paper">
            Ver catálogo
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <section aria-label="Resumen">
            <ul className="divide-y divide-slate-light rounded-[2rem] border-4 border-ink bg-paper-card px-5">
              {lines.map((line) => (
                <li key={`${line.productSlug}-${line.size}`} className="flex gap-4 py-4">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-paper">
                    <Image src={line.image} alt={line.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">{line.name}</p>
                    <p className="text-xs text-slate">
                      {line.colorway} · Talla {line.size} · {line.quantity} {line.quantity === 1 ? "par" : "pares"}
                    </p>
                  </div>
                  <p className="font-bold">{formatPrice(line.price * line.quantity)}</p>
                </li>
              ))}
              <li className="flex items-center justify-between py-4">
                <span className="font-bold">Total</span>
                <span className="font-display text-2xl font-black italic">{formatPrice(totalPrice)}</span>
              </li>
            </ul>
            {CONTRA_ENTREGA && (
              <p className="mt-4 text-sm text-slate">Pagas cuando te llega. El envío lo confirmamos por WhatsApp.</p>
            )}
          </section>

          <section aria-label="Datos de entrega">
            {hayWhatsApp ? (
              <form onSubmit={enviar} className="grid gap-4">
                <label className="grid gap-1.5 text-sm font-bold">
                  Nombre
                  <input name="nombre" required autoComplete="name" className={campo} />
                </label>
                <label className="grid gap-1.5 text-sm font-bold">
                  Ciudad
                  <input name="ciudad" required autoComplete="address-level2" className={campo} />
                </label>
                <label className="grid gap-1.5 text-sm font-bold">
                  Dirección
                  <input name="direccion" required autoComplete="street-address" className={campo} />
                </label>
                <label className="grid gap-1.5 text-sm font-bold">
                  Notas (opcional)
                  <textarea name="notas" rows={3} className={`${campo} h-auto py-3`} placeholder="Barrio, apartamento, horario…" />
                </label>
                <button
                  type="submit"
                  className="mt-2 flex h-14 items-center justify-center gap-2 rounded-full border-[3px] border-ink bg-accent font-black text-ink uppercase shadow-[5px_5px_0_var(--color-ink)] transition-[translate,box-shadow] active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  <MessageCircle className="size-5" /> Enviar pedido por WhatsApp
                </button>
                <p className="text-xs text-slate">Se abre WhatsApp con tu pedido listo para enviar. No se guarda nada aquí.</p>
              </form>
            ) : (
              <p className="rounded-2xl border-4 border-dashed border-ink/30 p-6 text-sm text-slate">
                Falta configurar el número de WhatsApp de la tienda (variable NEXT_PUBLIC_WHATSAPP).
              </p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
