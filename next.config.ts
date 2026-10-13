import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75],
    // Solo se optimizan las fotos del catálogo local y las que vienen de Drive
    // a través de /api/foto. Cualquier otra ruta responde 400.
    localPatterns: [{ pathname: "/products/**" }, { pathname: "/api/foto/**" }],
    // Fotos de Drive: un mes en caché (el archivo casi nunca cambia).
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
