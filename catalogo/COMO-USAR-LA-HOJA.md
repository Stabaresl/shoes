# Cómo manejar el catálogo desde Google Sheets

La tienda lee una hoja de Google. Cada fila es un par de tenis. Cuando cambian
algo en la hoja (precio, tallas, una foto nueva), la tienda se actualiza sola en
máximo **5 minutos**, sin tocar código.

Las fotos van en **Google Drive**: se sube la foto, se copia su enlace y se pega
en la hoja. La tienda la descarga, la optimiza y la muestra sola.

---

## 1. Crear la hoja (una sola vez)

1. Abran [Google Sheets](https://sheets.google.com) → **Hoja de cálculo en blanco**.
2. **Archivo → Importar → Subir** → elijan `catalogo/plantilla-catalogo.csv`
   (trae los 63 productos que ya tiene la tienda).
   En "Ubicación de importación" elijan **Reemplazar hoja de cálculo**.
3. **Compartir** (botón verde) → en "Acceso general" pongan
   **Cualquier persona con el enlace** → **Lector**.
4. Copien el enlace de la hoja y pónganlo en la variable `CATALOGO_URL`
   (en Vercel: *Settings → Environment Variables*; en su computador: `.env.local`).
   Sirve el enlace normal de compartir; no hace falta "publicar en la web".

## 2. Las columnas

| Columna | Qué poner | Ejemplo |
| --- | --- | --- |
| `activo` | `si` o `no`. En `no` el par desaparece de la tienda. | `si` |
| `portada` | `si` para que salga en la galería grande del inicio. | `si` |
| `destacado` | `si` para que salga en "Lo más pedido". | |
| `categoria` | `deportivo`, `urbano`, `casual`… Si escriben una nueva, se crea sola. | `urbano` |
| `marca` | Obligatoria. | `On` |
| `modelo` | Obligatorio. | `Cloud` |
| `color` | Como lo dirían a un cliente. | `Negro / Blanco` |
| `precio` | Obligatorio. Con o sin puntos. | `234.000` |
| `tallas` | Las que HAY. Rangos con guion. | `36-40, 42` |
| `fotos` | Uno o varios enlaces de Drive, separados por espacio o salto de línea. | (ver abajo) |
| `descripcion` | Una o dos frases. Opcional. | |

No importa si escriben los títulos con mayúscula o tilde (`Categoría` funciona).
Una fila sin marca, modelo, precio o fotos no se muestra (y no rompe nada).

## 3. Agregar fotos desde Drive

1. Suban la foto a una carpeta de Drive (ej. `Tienda/fotos`).
2. Compartan **la carpeta** como **Cualquier persona con el enlace → Lector**
   (así todas las fotos que suban ahí quedan públicas).
3. Clic derecho en la foto → **Compartir → Copiar enlace**.
4. Péguenlo en la columna `fotos` de la fila de ese par.
   La primera foto es la principal; la segunda aparece al pasar el mouse.

**Opcional, carpeta por par:** si consiguen una clave de Google (`GOOGLE_API_KEY`
con la "Google Drive API" activada en console.cloud.google.com), pueden pegar el
enlace de una **carpeta** en vez de cada foto. Todas las fotos de esa carpeta
aparecen solas, en orden alfabético.

Consejos para las fotos: buena luz, el par completo y centrado, y en lo posible
formato cuadrado o vertical. Las de la galería de portada se ven mejor si el
tenis está en el centro (los bordes se recortan).

## 4. Ver los cambios al instante

La tienda vuelve a leer la hoja cada 5 minutos. Si no quieren esperar, abran:

```
https://SU-TIENDA/api/revalidar?clave=SU_CLAVE
```

(`SU_CLAVE` es la variable `REVALIDAR_CLAVE`).

**Botón dentro de la hoja (opcional):** en la hoja, **Extensiones → Apps Script**,
borren lo que haya y peguen esto (cambien la URL y la clave):

```js
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Tienda")
    .addItem("Actualizar tienda ahora", "actualizarTienda")
    .addToUi();
}

function actualizarTienda() {
  const res = UrlFetchApp.fetch(
    "https://SU-TIENDA/api/revalidar?clave=SU_CLAVE",
    { muteHttpExceptions: true }
  );
  SpreadsheetApp.getUi().alert(
    res.getResponseCode() === 200
      ? "¡Listo! La tienda ya muestra los cambios."
      : "No se pudo actualizar: " + res.getContentText()
  );
}
```

Guarden, recarguen la hoja y aparece el menú **Tienda → Actualizar tienda ahora**
(la primera vez Google pide permiso).

## 5. ¿Y si la hoja falla?

Si la hoja no responde o queda vacía, la tienda muestra el catálogo guardado en
el código (`src/lib/products.ts`) en vez de caerse. En los registros del servidor
aparece el motivo con la etiqueta `[catalogo]`.

## 6. Videos

Los videos no van en la hoja (pesan mucho para pasar por Drive). Pónganlos en
`public/videos/` y agréguenlos a la lista `VIDEOS` de `src/lib/tienda.ts`.
El primero sale grande; los demás, en fila, en formato vertical (como reels).
