import type { Metadata, Viewport } from "next";
import { Archivo, Permanent_Marker, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { obtenerCategorias } from "@/lib/catalogo";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["wdth"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const marcador = Permanent_Marker({
  variable: "--font-marcador",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "footshootermzl — Tienda online de calzado",
    template: "%s · footshootermzl",
  },
  description:
    "Tenis deportivos, urbanos y casuales: On Cloud, New Balance, Adidas, Nike, Jordan y más. Encuentra tu próximo par en footshootermzl.",
};

export const viewport: Viewport = {
  themeColor: "#13213a",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const categorias = await obtenerCategorias();
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${jakarta.variable} ${marcador.variable} h-full antialiased`}
    >
      <body className="grano flex min-h-full flex-col bg-paper font-sans text-ink">
        <Header categorias={categorias.map(({ slug, titulo }) => ({ slug, titulo }))} />
        <main className="flex-1 pt-(--alto-header)">{children}</main>
        <Footer categorias={categorias.map(({ slug, titulo }) => ({ slug, titulo }))} />
        <CartDrawer />
      </body>
    </html>
  );
}
