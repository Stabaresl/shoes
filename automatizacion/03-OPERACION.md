# 03 — Pruebas, costos, límites y problemas

---

## §1. Probar antes de soltarlo

### 1.1 El endpoint del catálogo

Con `npm run dev` corriendo, abre en el navegador:

```
http://localhost:3000/api/catalogo
```

Debe devolver `"total": 63` y la lista de productos. Si falla aquí, no sigas:
los dos flujos dependen de esto.

También acepta filtros, útiles para probar:
`?categoria=urbano` · `?slug=adidas-samba-blanco-negro`

### 1.2 La publicación en Facebook

- [ ] Abre el workflow 1 en n8n y pulsa **Execute Workflow** (ejecución manual).
- [ ] Revisa nodo por nodo que todos queden en verde.
- [ ] Entra a tu página de Facebook: debe haber una publicación nueva con foto,
      precio, tallas y el enlace de WhatsApp.
- [ ] Bórrala desde Facebook si era solo prueba.

> **La rotación no avanza en ejecuciones manuales.** n8n solo guarda la memoria del
> workflow (qué productos ya salieron) en ejecuciones automáticas, con el workflow
> activo. En pruebas manuales siempre te va a publicar el primer producto. Es normal.

### 1.3 El bot de Messenger

- [ ] Workflow 2 **activo** y webhook ya conectado en Meta (`01-META.md` §6).
- [ ] Desde tu perfil personal de Facebook, escríbele a tu página:
      *"hola, ¿tienen Adidas Samba en talla 40?"*
- [ ] En n8n, mira **Executions**: debe aparecer una ejecución nueva.
- [ ] El bot debe responder con el precio y las tallas reales del catálogo.
- [ ] Escribe ahora *"listo, me los llevo"*: además del texto debe aparecerte
      un botón **"Escribir por WhatsApp"**.

Si no responde, mira §5.

---

## §2. Cuánto cuesta

### Lo gratis

Publicar en tu página y responder Messenger por la API de Meta **no cuesta nada**.
n8n autohospedado tampoco.

### Lo que sí cuesta: Claude

Cada mensaje del bot manda al modelo el catálogo compacto (~1.600 tokens) más las
instrucciones y el historial. Con `claude-opus-5`:

| Concepto | Aproximado |
|---|---|
| Un mensaje respondido | USD 0,01 – 0,02 |
| 1.000 mensajes al mes | USD 10 – 20 |

El rango depende del *prompt caching*: el flujo marca el catálogo como cacheable,
así que varios mensajes seguidos (dentro de ~5 minutos) salen bastante más baratos
que uno suelto.

**Si quieres gastar menos**, en el nodo **"Construir prompt"** cambia:

```js
model: 'claude-opus-5',
```

por `'claude-haiku-4-5'` — cuesta del orden de cinco veces menos, a cambio de
respuestas algo menos finas. Para responder tallas y precios suele bastar.

**Pon un tope de gasto** en console.anthropic.com → Billing → Limits. Es la
protección real contra una sorpresa.

---

## §3. Pasar la app a modo activo (para atender clientes de verdad)

Mientras la app esté en **modo desarrollo**, el bot solo le responde a personas con
un rol en la app. Publicar sí funciona sin trámite; responder a desconocidos, no.

Para que el bot atienda a cualquiera, Meta pide **Acceso avanzado** al permiso
`pages_messaging`, que se consigue con **Revisión de la aplicación**:

- [ ] En el panel de la app: **Revisión de la app → Permisos y funciones**.
- [ ] Busca `pages_messaging` y pide **Acceso avanzado**.
- [ ] Meta te va a exigir, típicamente:
  - **Verificación del negocio** (documentos de tu empresa o actividad económica).
  - Un **video** mostrando el recorrido completo: alguien escribe a la página → el
    bot responde. Grábalo con tu propia cuenta, que sí funciona en modo desarrollo.
  - Una **política de privacidad** publicada en una URL accesible. Va en el sitio,
    y hoy no existe: hay que escribirla.
  - Una explicación de para qué usas el permiso. Sé literal: *"responder
    automáticamente consultas de clientes sobre catálogo de calzado y derivarlas
    a atención humana por WhatsApp"*.
- [ ] Envía y espera. Suele tardar de días a un par de semanas.

Mientras tanto, para no dejar clientes sin respuesta, activa en **Meta Business
Suite → Bandeja de entrada → Automatizaciones** la **respuesta instantánea** y las
**preguntas frecuentes**, con tu enlace de WhatsApp. Es manual y básico, pero
funciona desde hoy y no depende de ninguna revisión.

---

## §4. Marketplace: qué se puede y qué no

**Meta no tiene API pública de Marketplace.** No existe forma oficial de publicar
productos ni de leer o responder sus conversaciones desde n8n o desde ningún lado.

Lo que sí puedes hacer:

- **Publicar como página/negocio.** Parte de esos mensajes caen en la Bandeja de
  entrada de la página, y ahí aplican las respuestas automáticas nativas de Meta
  Business Suite (respuesta instantánea, preguntas frecuentes, palabras clave).
  Configúralas con tu enlace de WhatsApp.
- **Responder a mano**, con las respuestas guardadas de Business Suite.

Lo que **no** deberías hacer: bots no oficiales, extensiones o scraping del
Marketplace. Violan los Términos de Meta y el riesgo concreto es que te cierren la
cuenta o la página — con un negocio encima, no compensa.

---

## §5. Cuando algo falla

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| Meta rechaza la URL al guardar el webhook | El workflow 2 no está activo, o el túnel se cayó | Actívalo, comprueba que `cloudflared` sigue corriendo, y que la URL es la **Production** |
| n8n muestra webhooks con `localhost` | Falta `WEBHOOK_URL` | `02-N8N.md` §1, último apartado |
| Error `190` en los nodos de Facebook | Token caducado o revocado | Repite `01-META.md` §4 y actualiza la credencial |
| Error `200` / *permission denied* | Falta un permiso, o la página no está suscrita a la app | Revisa `01-META.md` §4.1 y §6 |
| Error `unsupported get request` | `GRAPH_VERSION` retirada por Meta | Pon la versión que muestre tu panel |
| El bot no responde a un amigo | La app sigue en modo desarrollo | §3 de este documento |
| `ECONNREFUSED` al obtener el catálogo | La web no está corriendo, o `CATALOGO_URL` está mal | `npm run dev`, y revisa `02-N8N.md` §3 |
| El bot inventa precios | El catálogo no llegó | Mira la salida del nodo "Obtener catálogo" en Executions |
| `401` en "Consultar a Claude" | Clave mal puesta o sin saldo | Revisa la credencial y el saldo en console.anthropic.com |
| Publica siempre el mismo producto | Ejecuciones manuales | Es esperado: §1.2 |

**Dónde mirar siempre primero:** n8n → **Executions**. Cada ejecución fallida te
deja ver la entrada y la salida de cada nodo, y ahí casi siempre está el mensaje
de error exacto que devolvió Meta.

---

## §6. Límites que conviene tener en la cabeza

- **Ventana de 24 horas.** Puedes responder libremente a alguien durante las 24 h
  siguientes a *su* último mensaje. Fuera de esa ventana, Meta bloquea el envío.
  Para responder consultas no es problema; para mandar promociones, sí.
- **El bot no vende.** Cierra la conversación pasando a WhatsApp, donde atiendes tú.
  Es a propósito: cobrar, apartar y negociar es mejor no automatizarlo.
- **Todo depende de tu PC.** n8n local, la web local y el túnel: si apagas el
  computador, se cae todo. Cuando esto empiece a facturar, mover n8n y la web a un
  servidor es el siguiente paso natural.
- **El historial del bot vive en memoria de n8n.** Se guarda por persona, se
  limita a los últimos 8 turnos y se borra solo a las 24 h. Si reinicias n8n, se
  pierde: no pasa nada grave, el bot simplemente vuelve a empezar la conversación.
