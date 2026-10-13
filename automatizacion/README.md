# Automatización de Facebook — footshootermzl

Dos automatizaciones en n8n:

1. **Publicación programada** — cada día, a las horas que definas, toma un producto
   del catálogo y publica foto + info en la página de Facebook, rotando sin repetir.
2. **Bot de Messenger** — responde los mensajes que entran a la página usando el
   catálogo real, y cuando el cliente quiere comprar le muestra un botón a WhatsApp.

Ambas leen el catálogo desde `GET /api/catalogo` de esta misma web, que sale de
la hoja de Google del catálogo (ver `catalogo/COMO-USAR-LA-HOJA.md`; si no está
configurada, de `src/lib/products.ts`). Lo editas en la hoja y la web, las
publicaciones y el bot quedan alineados.

> **Marketplace no está incluido y no puede estarlo.** Meta no expone ninguna API
> de Marketplace: ni para publicar ni para leer o responder sus conversaciones.
> Lo que sí funciona está explicado en `03-OPERACION.md`.

---

## Qué hay en esta carpeta

```
automatizacion/
├── README.md                 ← estás aquí: índice y checklist de datos
├── 01-META.md                ← TODO lo que haces tú en Facebook/Meta (empieza aquí)
├── 02-N8N.md                 ← configuración de n8n e importación de los flujos
├── 03-OPERACION.md           ← pruebas, costos, límites y solución de problemas
├── n8n/
│   ├── workflow-1-publicacion-facebook.json
│   └── workflow-2-messenger-bot.json
└── _generar-workflows.js     ← genera los dos JSON; solo si quieres cambiar los flujos a mano
```

Y en la web:

```
src/app/api/catalogo/route.ts ← el endpoint que consumen los dos flujos
```

---

## Orden de trabajo

| # | Paso | Dónde | Documento |
|---|------|-------|-----------|
| 1 | Página, app de Meta, permisos y tokens | Facebook / Meta | `01-META.md` §1–§4 |
| 2 | Clave de la API de Claude | console.anthropic.com | `01-META.md` §5 |
| 3 | URL pública para tu n8n local | tu PC | `02-N8N.md` §1 |
| 4 | Credenciales e importación de flujos | n8n | `02-N8N.md` §2–§4 |
| 5 | Conectar el webhook de Messenger | Meta | `01-META.md` §6 |
| 6 | Pruebas | n8n + Messenger | `03-OPERACION.md` §1 |
| 7 | Revisión de la app para atender clientes reales | Meta | `03-OPERACION.md` §3 |

El paso 5 va **después** del 4 a propósito: Meta verifica la URL en el momento de
guardarla, y para eso el flujo de n8n ya tiene que estar activo.

---

## Datos que tienes que conseguir

Ve anotándolos; los vas a pegar en n8n en el paso 4.

| Dato | Ejemplo | De dónde sale |
|------|---------|---------------|
| `PAGE_ID` | `102938475610293` | `01-META.md` §1 |
| Token de página (largo) | `EAAG...` (200+ caracteres) | `01-META.md` §4 |
| `VERIFY_TOKEN` | `footshooter-verificacion-2026` | lo inventas tú, `01-META.md` §6 |
| `GRAPH_VERSION` | `v23.0` | `01-META.md` §2 |
| Clave de Claude | `sk-ant-...` | `01-META.md` §5 |
| Número de WhatsApp | `573122651224` | tuyo, sin `+` ni espacios |
| `CATALOGO_URL` | `http://localhost:3000/api/catalogo` | `02-N8N.md` §3 |

⚠️ **El token de página y la clave de Claude son contraseñas.** Van dentro de n8n,
en credenciales — nunca en un archivo de este repositorio ni en un chat.

---

## Antes de publicar nada: los precios

`src/lib/products.ts` empieza con este aviso:

> `PLACEHOLDER: precios, descripciones, tallas y stock son datos de ejemplo`

Los 63 productos tienen **precios y tallas inventados** para maquetar el sitio.
Si activas la publicación automática ahora, tu página de Facebook va a anunciar
precios falsos, y el bot se los va a decir a los clientes.

**Carga el catálogo real en `src/lib/products.ts` antes del paso 6.**
Todo lo demás puedes montarlo y probarlo mientras tanto.
