# footshootermzl — tienda online de calzado

Tienda de tenis deportivos, urbanos y casuales. El catálogo se maneja desde una
hoja de Google y las fotos desde Google Drive; los pedidos llegan por WhatsApp.

## Correrla en el computador

```bash
npm install
npm run dev
```

Abran http://localhost:3000. Sin configurar nada, usa el catálogo guardado en
`src/lib/products.ts`.

## Configuración

Copien `.env.example` como `.env.local` (o pongan las variables en Vercel):

| Variable | Para qué |
| --- | --- |
| `CATALOGO_URL` | Enlace de la hoja de Google con el catálogo. |
| `REVALIDAR_CLAVE` | Clave para refrescar el catálogo al instante (`/api/revalidar?clave=…`). |
| `GOOGLE_API_KEY` | Opcional: permite poner carpetas de Drive en la columna de fotos. |
| `NEXT_PUBLIC_WHATSAPP` | Opcional: cambia el WhatsApp de la tienda. |
| `SITIO_URL` | URL pública (la usan las automatizaciones de n8n). |

Textos, colecciones del carrusel, videos y redes sociales se cambian en
`src/lib/tienda.ts`.

## Documentación

- `catalogo/COMO-USAR-LA-HOJA.md` — cómo manejar el catálogo desde Google Sheets y Drive.
- `catalogo/plantilla-catalogo.csv` — el catálogo actual, listo para importar a la hoja.
- `automatizacion/` — publicaciones automáticas en Facebook y bot de Messenger (n8n).

## Cómo está hecha

Next.js 16, Tailwind CSS 4, Framer Motion, Zustand (carrito) y PapaParse (lectura
de la hoja). La galería de portada (`src/components/ui/morph-gallery.tsx`) y el
carrusel de polaroids (`src/components/ui/polaroid-line-carousel.tsx`) vienen de
21st.dev.

## Publicarla

Importen este repositorio en [Vercel](https://vercel.com), agreguen las
variables de arriba y listo. Cada `git push` a `main` vuelve a publicar la tienda.
