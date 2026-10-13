// Configuración de la tienda: textos, contacto y selección de respaldo.
// Todo lo que diga "CONFIRMAR" es una propuesta que Santiago y Alejo deben validar.

/**
 * WhatsApp de la tienda con indicativo, solo dígitos. Se puede cambiar con la
 * variable NEXT_PUBLIC_WHATSAPP sin tocar código.
 */
export const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP || "573122651224").replace(/\D/g, "");

/** CONFIRMAR: ¿ya despachan con pago contra entrega? Si no, pongan false. */
export const CONTRA_ENTREGA = true;

/** Redes sociales. Las que queden vacías no se muestran. */
export const REDES = {
  instagram: "",
  tiktok: "",
  facebook: "",
};

export function enlaceWhatsApp(mensaje: string): string | null {
  if (!WHATSAPP) return null;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

/** Textos que corren en la cinta animada. */
export const CINTA = [
  CONTRA_ENTREGA ? "Pagas cuando te llega" : "Pide por WhatsApp",
  "On Cloud",
  "New Balance 9060",
  "Adidas Samba",
  "Jordan 1 Low",
  "Nike Mercurial",
  "Deportivo · Urbano · Casual",
];

export const CATEGORIAS: Record<string, { titulo: string; frase: string }> = {
  deportivo: { titulo: "Deportivo", frase: "Fútbol, running y entrenamiento." },
  urbano: { titulo: "Urbano", frase: "Siluetas de calle con actitud propia." },
  casual: { titulo: "Casual", frase: "Comodidad de todos los días." },
};

/**
 * Colecciones del carrusel de polaroids, en este orden. `foto` es el slug del
 * producto cuya primera foto se usa; si ese producto no existe, se toma el
 * primero de la colección.
 */
export const COLECCIONES: { tipo: "marca" | "categoria"; valor: string; foto?: string }[] = [
  { tipo: "marca", valor: "On", foto: "on-cloud-negro-blanco" },
  { tipo: "categoria", valor: "deportivo", foto: "nike-mercurial-rosa-morado" },
  { tipo: "categoria", valor: "urbano", foto: "adidas-samba-blanco-rojo" },
  { tipo: "marca", valor: "New Balance", foto: "new-balance-9060-crema-vino" },
  { tipo: "marca", valor: "Jordan", foto: "jordan-1-low-cafe-mocha" },
  { tipo: "marca", valor: "Adidas", foto: "adidas-adizero-evo-sl-negro-naranja" },
  { tipo: "marca", valor: "Nike", foto: "nike-mercurial-turquesa-rosa" },
  { tipo: "categoria", valor: "casual", foto: "nike-blazer-low-blanco" },
];

/** Si la hoja no marca ninguna "portada", estas fotos van en la galería grande. */
export const PORTADA_RESPALDO = [
  "adidas-adizero-evo-sl-negro-naranja",
  "on-cloud-negro-blanco",
  "nike-mercurial-rosa-morado",
  "jordan-1-low-cafe-mocha",
  "adidas-samba-blanco-rojo",
  "new-balance-1906r-blanco-negro",
  "adidas-supernova-rojo-blanco",
  "on-cloud-lila-crema",
];

/** Si la hoja no marca ningún "destacado", estos van en "Lo más pedido". */
export const DESTACADOS_RESPALDO = [
  "on-cloud-negro-blanco",
  "new-balance-9060-crema-vino",
  "adidas-samba-blanco-negro",
  "jordan-1-low-cafe-mocha",
  "on-cloud-menta-negro",
  "nike-mercurial-turquesa-rosa",
  "new-balance-9060-negro",
  "adidas-spezial-verde-oliva",
];

/**
 * Videos de la sección "En movimiento". Súbanlos a public/videos/ y agréguenlos
 * aquí: el primero sale grande (horizontal) y los demás en fila (verticales, 9:16).
 * OJO: video-hero.mp4 es un video de referencia generado con IA (tiene marca de
 * agua de Gemini y no muestra pares del catálogo). Reemplácenlo por los videos
 * con modelos apenas los graben.
 */
export const VIDEOS: { src: string; titulo: string; poster?: string }[] = [
  { src: "/video-hero.mp4", titulo: "Tenis en movimiento", poster: "/video-hero-poster.jpg" },
];
