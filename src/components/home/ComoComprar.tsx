import { CONTRA_ENTREGA } from "@/lib/tienda";

const PASOS = [
  { titulo: "Escoge tu par", texto: "Mira el catálogo, elige modelo y talla, y agrégalo al carrito." },
  { titulo: "Escríbenos", texto: "Tu pedido nos llega por WhatsApp. Te confirmamos talla, dirección y envío." },
  CONTRA_ENTREGA
    ? { titulo: "Pagas al recibir", texto: "Te llega a la puerta y pagas cuando lo tienes en tus manos." }
    : { titulo: "Te lo enviamos", texto: "Acordamos el pago y despachamos tu par." },
];

export function ComoComprar() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <h2 className="titular text-5xl sm:text-6xl">
        Así de <span className="rounded-lg bg-accent px-2">fácil</span>
      </h2>
      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {PASOS.map((p, i) => (
          <li
            key={p.titulo}
            className="group relative rounded-[2rem] border-4 border-ink bg-paper-card p-7 shadow-[6px_6px_0_var(--color-ink)] transition-[translate,box-shadow] duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_var(--color-ink)]"
          >
            <span className="titular titular-angosto block text-8xl text-accent [-webkit-text-stroke:3px_var(--color-ink)]">
              {i + 1}
            </span>
            <h3 className="titular mt-4 text-2xl">{p.titulo}</h3>
            <p className="mt-2 text-slate">{p.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
