import type { NextRequest } from "next/server";
import { esIdDrive } from "@/lib/drive";

/**
 * Sirve una foto de Google Drive desde el dominio de la tienda.
 * El archivo en Drive debe estar compartido como «cualquiera con el enlace».
 *
 * - Con GOOGLE_API_KEY usa la API oficial de Drive.
 * - Sin clave usa los enlaces públicos de Google (no documentados, pero
 *   funcionan para archivos públicos).
 */

const MAX_BYTES = 15 * 1024 * 1024;

function origenes(id: string): string[] {
  const clave = process.env.GOOGLE_API_KEY;
  const publicos = [
    `https://lh3.googleusercontent.com/d/${id}=w2000`,
    `https://drive.usercontent.google.com/download?id=${id}&export=view`,
  ];
  return clave
    ? [`https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${clave}`, ...publicos]
    : publicos;
}

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/foto/[id]">) {
  const { id } = await ctx.params;
  if (!esIdDrive(id)) return new Response("Id inválido", { status: 400 });

  for (const url of origenes(id)) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      const tipo = res.headers.get("content-type") ?? "";
      const tamano = Number(res.headers.get("content-length") ?? 0);
      if (!res.ok || !tipo.startsWith("image/") || tamano > MAX_BYTES) continue;

      const cuerpo = await res.arrayBuffer();
      if (cuerpo.byteLength > MAX_BYTES) continue;

      return new Response(cuerpo, {
        headers: {
          "Content-Type": tipo,
          // Un día en el navegador, una semana en la CDN.
          "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
        },
      });
    } catch {
      // Probar con el siguiente origen.
    }
  }
  return new Response("No se encontró la foto en Drive (¿está compartida?)", { status: 404 });
}
