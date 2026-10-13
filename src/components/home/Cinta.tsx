import { Asterisk } from "lucide-react";
import { cn } from "@/lib/utils";

/** Banda inclinada que corre de lado a lado. Se pausa al pasar el mouse. */
export function Cinta({
  textos,
  className,
  invertida = false,
}: {
  textos: string[];
  className?: string;
  invertida?: boolean;
}) {
  const fila = (oculta: boolean) => (
    <ul aria-hidden={oculta || undefined} className="flex shrink-0 items-center">
      {textos.map((t) => (
        <li key={t} className="titular flex items-center gap-6 px-6 text-2xl whitespace-nowrap sm:text-3xl">
          {t}
          <Asterisk className="size-7 shrink-0" strokeWidth={3} aria-hidden />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("relative z-10 overflow-x-clip", className)}>
      <div
        className={cn(
          "cinta -mx-[5%] w-[110%] border-y-4 border-ink py-3",
          invertida ? "rotate-2 bg-ink text-paper" : "-rotate-2 bg-accent text-ink"
        )}
      >
        <div className="cinta-pista">
          {fila(false)}
          {fila(true)}
        </div>
      </div>
    </div>
  );
}
