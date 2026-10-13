// Enlaces de Google Drive → rutas que sirve la propia tienda (/api/foto/ID).
// Pasar por nuestro dominio hace que las fotos se optimicen, queden en caché y
// funcionen en la galería WebGL (que exige imágenes del mismo origen o con CORS).

const ID = "[A-Za-z0-9_-]{10,}";

export function idArchivoDrive(enlace: string): string | null {
  const m = enlace.match(new RegExp(`/file/d/(${ID})`)) ?? enlace.match(new RegExp(`[?&]id=(${ID})`));
  return m && !enlace.includes("/folders/") ? m[1] : null;
}

export function idCarpetaDrive(enlace: string): string | null {
  return enlace.match(new RegExp(`/folders/(${ID})`))?.[1] ?? null;
}

export function esIdDrive(id: string): boolean {
  return new RegExp(`^${ID}$`).test(id);
}

export const rutaFoto = (id: string) => `/api/foto/${id}`;
