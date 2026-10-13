// URL del optimizador de imágenes de Next para componentes que no usan
// <Image> (la galería WebGL y el carrusel de polaroids). El ancho debe estar en
// deviceSizes/imageSizes (ver next.config.ts) y la calidad en `qualities`.

type Ancho = 256 | 384 | 640 | 1080 | 1920;

export function urlOptimizada(src: string, ancho: Ancho): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${ancho}&q=75`;
}
