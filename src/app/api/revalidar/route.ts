import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { ETIQUETA_CATALOGO } from "@/lib/catalogo";

/**
 * Vuelve a leer la hoja de Google al instante (sin esperar los 5 minutos).
 * Úsenlo así: /api/revalidar?clave=SU_CLAVE  (REVALIDAR_CLAVE en las variables).
 */
function claveValida(intento: string | null): boolean {
  const real = process.env.REVALIDAR_CLAVE;
  if (!real || !intento) return false;
  const a = Buffer.from(intento);
  const b = Buffer.from(real);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function revalidar(req: NextRequest) {
  if (!claveValida(req.nextUrl.searchParams.get("clave"))) {
    return Response.json({ ok: false, error: "Clave incorrecta" }, { status: 401 });
  }
  revalidateTag(ETIQUETA_CATALOGO, { expire: 0 });
  return Response.json({ ok: true, mensaje: "Listo: la tienda ya muestra la hoja actualizada." });
}

export const GET = revalidar;
export const POST = revalidar;
