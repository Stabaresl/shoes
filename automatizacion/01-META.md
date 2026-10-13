# 01 — Lo que haces tú en Facebook / Meta

Todo este documento es trabajo **externo**: navegador, cuenta de Facebook, panel de
desarrolladores. No se toca código aquí.

Ve marcando las casillas. Al final tendrás los 5 datos que pide el `README.md`.

---

## §1. La página y su ID

- [ ] Entra a tu página de Facebook con la cuenta que es **administradora**.
- [ ] Ve a **Configuración → Información de la página** (o `facebook.com/tu-pagina/about`).
- [ ] Baja hasta **Identificador de la página** y cópialo.

Es un número largo, tipo `102938475610293`. Ese es tu **`PAGE_ID`**.

> Si no lo encuentras: en Meta Business Suite → Configuración → Cuentas → Páginas,
> aparece bajo el nombre de la página.

---

## §2. Crear la app de Meta

- [ ] Entra a **developers.facebook.com** con la misma cuenta.
- [ ] Arriba a la derecha: **Mis aplicaciones → Crear aplicación**.
- [ ] Caso de uso: elige **"Otro"** y luego tipo **"Empresa"** (Business).
- [ ] Nombre: `footshootermzl automatizacion` (o el que quieras). Correo de contacto: el tuyo.
- [ ] Crear.

Ya dentro de la app:

- [ ] En el panel izquierdo, anota la **versión de la API** que muestra el
      selector (arriba, junto al nombre de la app, o en Configuración → Avanzado).
      Es algo como `v23.0`. Ese es tu **`GRAPH_VERSION`**.

> **Verifica esta versión, no la des por hecha.** Los flujos vienen con `v23.0`
> puesto por defecto, pero Meta saca una nueva cada pocos meses y retira las viejas.
> Usa la que te muestre tu panel.

---

## §3. Añadir los productos que necesita la app

En el panel de la app, sección **Productos** (o "Agregar producto"):

- [ ] Añade **Messenger**.
- [ ] Añade **Inicio de sesión con Facebook para empresas** (Facebook Login for Business).
      Lo necesitas solo para poder generar el token; no vas a construir un login.

---

## §4. Conseguir el token de página (el paso más delicado)

Un "token de página" es la llave que le permite a n8n publicar y responder **en tu
nombre**. Vamos a generar uno de larga duración.

### 4.1 Token de usuario

- [ ] Entra al **Explorador de la API de Graph**:
      `developers.facebook.com/tools/explorer`
- [ ] Arriba a la derecha, en **Aplicación de Meta**, selecciona la app que creaste.
- [ ] En **Token de usuario**, haz clic en **Agregar permisos** y marca estos cuatro:

  | Permiso | Para qué |
  |---|---|
  | `pages_show_list` | ver tus páginas |
  | `pages_read_engagement` | leer la página |
  | `pages_manage_posts` | publicar fotos y textos |
  | `pages_messaging` | responder mensajes de Messenger |

- [ ] Haz clic en **Generar token de acceso** y acepta los permisos en la ventana
      que se abre. Elige tu página cuando te lo pregunte.

### 4.2 Convertirlo en token largo

El token que acabas de generar dura ~1 hora. Hay que cambiarlo por uno permanente.

- [ ] Copia el token que aparece en el explorador.
- [ ] Ve a la **Herramienta de tokens de acceso**:
      `developers.facebook.com/tools/debug/accesstoken`
- [ ] Pega el token y pulsa **Depurar**.
- [ ] Abajo, pulsa **Extender token de acceso**. Te devuelve uno de ~60 días.
- [ ] Copia ese token extendido.

### 4.3 Sacar el token de la página (este sí no caduca)

- [ ] Vuelve al **Explorador de la API de Graph**.
- [ ] Pega el token extendido en el campo de token.
- [ ] En la barra de la petición, escribe: `me/accounts` y pulsa **Enviar**.
- [ ] En la respuesta, busca tu página por su `name`. El campo **`access_token`**
      de ese bloque es tu **token de página definitivo**.

- [ ] Guárdalo. Es el que vas a pegar en n8n.

> **Por qué este no caduca:** un token de página derivado de un token de usuario de
> larga duración no tiene fecha de expiración. Sí se invalida si cambias tu
> contraseña de Facebook, si quitas la app, o si Meta detecta algo raro. Si un día
> los flujos empiezan a fallar con error 190, repite este §4.

### 4.4 Comprobar que sirve

- [ ] En el explorador, con el **token de página** puesto, pide: `me?fields=name,id`
- [ ] Debe responder con el nombre y el ID de tu página. Si responde con tu nombre
      personal, cogiste el token equivocado: vuelve al paso 4.3.

---

## §5. Clave de la API de Claude

El bot de Messenger usa Claude para redactar las respuestas.

- [ ] Entra a **console.anthropic.com** y crea una cuenta si no la tienes.
- [ ] Ve a **Settings → API Keys → Create Key**.
- [ ] Cópiala (empieza por `sk-ant-`). **Solo se muestra una vez.**
- [ ] Carga saldo en **Billing**. Con USD 5 te sobra para arrancar y probar
      (el cálculo de cuánto cuesta cada mensaje está en `03-OPERACION.md` §2).

---

## §6. Conectar el webhook de Messenger

⚠️ **Este paso va después de tener n8n listo y el flujo activo** (`02-N8N.md`).
Meta llama a la URL en el momento de guardarla; si n8n no responde, no te deja continuar.

Ten a mano la URL pública de tu webhook, que salió de `02-N8N.md` §1 y §4. Se ve así:

```
https://algo.trycloudflare.com/webhook/messenger
```

En el panel de tu app:

- [ ] Ve a **Messenger → Configuración de Messenger** (o Productos → Messenger → Ajustes).
- [ ] En **Webhooks**, pulsa **Configurar webhooks** / **Editar devolución de llamada**.
- [ ] **URL de devolución de llamada:** pega tu URL pública terminada en `/webhook/messenger`.
- [ ] **Token de verificación:** escribe exactamente

  ```
  footshooter-verificacion-2026
  ```

  Es el valor que trae el flujo. Si quieres otro, cámbialo en n8n en el nodo
  **"Comprobar token"** (línea `const VERIFY_TOKEN = ...`) y pon aquí el mismo.

- [ ] Pulsa **Verificar y guardar**. Si todo está bien, la ventana se cierra sin error.
- [ ] En **Campos de webhook**, suscríbete a:
  - `messages`
  - `messaging_postbacks`
- [ ] Más abajo, en **Generar tokens de acceso** / **Páginas conectadas**, asegúrate
      de que tu página aparece **suscrita a la app**. Si hay un botón "Suscribir", púlsalo.

---

## §7. Lo que falta para atender clientes reales

Tu app nace en **modo desarrollo**. En ese modo:

- ✅ Publicar en tu propia página **funciona sin más trámite** (eres admin de ambas).
- ⚠️ El bot de Messenger **solo responde a personas con un rol en la app**
      (tú, y quien añadas como administrador, desarrollador o tester).

Un cliente cualquiera que escriba a la página **no recibirá respuesta del bot**
hasta que pases la app a modo activo. Para eso Meta pide **Revisión de la app**
con **Acceso avanzado** al permiso `pages_messaging`.

Los detalles del trámite están en `03-OPERACION.md` §3. Mientras tanto puedes probar
todo con tu propia cuenta.
