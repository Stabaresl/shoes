/**
 * Genera los dos workflows de n8n en automatizacion/n8n/.
 * Se escribe el JSON desde JS para no pelear con el escapado de los bloques
 * de código que van dentro de los nodos Code.
 *
 *   node automatizacion/_generar-workflows.js
 *
 * Si cambias algo aquí, vuelve a correrlo y reimporta los JSON en n8n.
 */
const fs = require("fs");
const path = require("path");

const salida = path.join(__dirname, "n8n");
let contador = 0;
const id = (p) => `${p}-${String(++contador).padStart(4, "0")}`;

const nodo = (name, type, typeVersion, position, parameters, extra = {}) => ({
  parameters,
  id: id("nodo"),
  name,
  type,
  typeVersion,
  position,
  ...extra,
});

const conectar = (pares) => {
  const c = {};
  for (const [desde, hacia, salidaIdx = 0] of pares) {
    c[desde] = c[desde] || { main: [] };
    while (c[desde].main.length <= salidaIdx) c[desde].main.push([]);
    c[desde].main[salidaIdx].push({ node: hacia, type: "main", index: 0 });
  }
  return c;
};

const set = (asignaciones) => ({
  assignments: {
    assignments: asignaciones.map(([name, value]) => ({
      id: id("asig"),
      name,
      value,
      type: "string",
    })),
  },
  includeOtherFields: false,
  options: {},
});

const CONFIG = [
  ["PAGE_ID", "PEGA_AQUI_EL_ID_DE_TU_PAGINA"],
  ["GRAPH_VERSION", "v23.0"],
  ["CATALOGO_URL", "http://host.docker.internal:3000/api/catalogo"],
  ["WHATSAPP", "573122651224"],
];

const urlGraph = (recurso) =>
  `={{ 'https://graph.facebook.com/' + $('Configuración').first().json.GRAPH_VERSION + '/' + $('Configuración').first().json.PAGE_ID + '/${recurso}' }}`;

// ---------------------------------------------------------------------------
// WORKFLOW 1 — Publicación programada en la página de Facebook
// ---------------------------------------------------------------------------

const codigoElegirProducto = `
// Escoge el siguiente producto de la rotación y arma el texto de la publicación.
const config = $('Configuración').first().json;
const catalogo = $input.first().json;

const productos = (catalogo.productos || []).filter((p) => !p.agotado);
if (productos.length === 0) {
  throw new Error('El catálogo no devolvió productos disponibles. Revisa CATALOGO_URL.');
}

// La memoria del workflow recuerda qué se publicó ya en esta vuelta.
// OJO: solo se guarda en ejecuciones reales (workflow activo), no en pruebas manuales.
const memoria = $getWorkflowStaticData('global');
if (!Array.isArray(memoria.publicados)) memoria.publicados = [];

let pendientes = productos.filter((p) => !memoria.publicados.includes(p.slug));
if (pendientes.length === 0) {
  memoria.publicados = [];           // vuelta completa: vuelve a empezar
  pendientes = productos;
}

const producto = pendientes[0];
const tallas = producto.tallasDisponibles.join(', ');

// Mientras la web corra solo en local, su enlace no le sirve a nadie en Facebook.
// En cuanto publiques el sitio y definas SITIO_URL, el enlace aparece solo.
const esPublico = (u) => !!u && !/localhost|127\\.0\\.0\\.1|host\\.docker\\.internal/.test(u);

const copy = [
  producto.nombre + ' — ' + producto.color,
  '',
  producto.descripcion,
  '',
  'Precio: ' + producto.precioTexto,
  'Tallas disponibles: ' + tallas,
  '',
  'Pídelos por WhatsApp: https://wa.me/' + config.WHATSAPP,
  esPublico(producto.url) ? 'Míralos en la tienda: ' + producto.url : null,
].filter((l) => l !== null).join('\\n');

return [{
  json: {
    slug: producto.slug,
    nombre: producto.nombre,
    imagenUrl: producto.imagenes[0],
    copy,
    quedanPorPublicar: pendientes.length - 1,
  },
}];
`.trim();

const codigoRegistrar = `
// Marca el producto como publicado solo si Facebook respondió bien.
const memoria = $getWorkflowStaticData('global');
if (!Array.isArray(memoria.publicados)) memoria.publicados = [];

const elegido = $('Elegir producto').first().json;
if (!memoria.publicados.includes(elegido.slug)) {
  memoria.publicados.push(elegido.slug);
}
memoria.ultimaPublicacion = new Date().toISOString();

const respuesta = $input.first().json;

return [{
  json: {
    publicado: elegido.slug,
    nombre: elegido.nombre,
    postId: respuesta.post_id || respuesta.id || null,
    fecha: memoria.ultimaPublicacion,
    llevanPublicados: memoria.publicados.length,
  },
}];
`.trim();

const workflowPublicacion = {
  name: "Footshooter — Publicación en Facebook",
  nodes: [
    nodo("Horario de publicación", "n8n-nodes-base.scheduleTrigger", 1.2, [-140, 300], {
      rule: { interval: [{ field: "cronExpression", expression: "0 9,13,19 * * *" }] },
    }),
    nodo("Configuración", "n8n-nodes-base.set", 3.4, [80, 300], set(CONFIG)),
    nodo("Obtener catálogo", "n8n-nodes-base.httpRequest", 4.2, [300, 300], {
      url: "={{ $json.CATALOGO_URL }}",
      options: {},
    }),
    nodo("Elegir producto", "n8n-nodes-base.code", 2, [520, 300], {
      jsCode: codigoElegirProducto,
    }),
    nodo("Descargar foto", "n8n-nodes-base.httpRequest", 4.2, [740, 300], {
      url: "={{ $json.imagenUrl }}",
      options: {
        response: { response: { responseFormat: "file", outputPropertyName: "foto" } },
      },
    }),
    nodo("Publicar en Facebook", "n8n-nodes-base.httpRequest", 4.2, [960, 300], {
      method: "POST",
      url: urlGraph("photos"),
      authentication: "genericCredentialType",
      genericAuthType: "httpQueryAuth",
      sendBody: true,
      contentType: "multipart-form-data",
      bodyParameters: {
        parameters: [
          { parameterType: "formBinaryData", name: "source", inputDataFieldName: "foto" },
          { name: "caption", value: "={{ $('Elegir producto').first().json.copy }}" },
        ],
      },
      options: {},
    }),
    nodo("Registrar publicado", "n8n-nodes-base.code", 2, [1180, 300], {
      jsCode: codigoRegistrar,
    }),
  ],
  connections: conectar([
    ["Horario de publicación", "Configuración"],
    ["Configuración", "Obtener catálogo"],
    ["Obtener catálogo", "Elegir producto"],
    ["Elegir producto", "Descargar foto"],
    ["Descargar foto", "Publicar en Facebook"],
    ["Publicar en Facebook", "Registrar publicado"],
  ]),
  settings: { executionOrder: "v1" },
  pinData: {},
};

// ---------------------------------------------------------------------------
// WORKFLOW 2 — Bot de Messenger con IA + desvío a WhatsApp
// ---------------------------------------------------------------------------

const codigoVerificar = `
// Meta llama esta URL una sola vez (GET) para comprobar que el webhook es tuyo.
// Este token lo inventas tú y lo escribes IGUAL en el panel de Meta.
// Es el único sitio donde vive: cámbialo aquí y en Meta, en ningún lado más.
const VERIFY_TOKEN = 'footshooter-verificacion-2026';

const q = $input.first().json.query || {};

if (q['hub.mode'] !== 'subscribe' || q['hub.verify_token'] !== VERIFY_TOKEN) {
  throw new Error('Token de verificación incorrecto. Recibido: ' + q['hub.verify_token']);
}

return [{ json: { challenge: q['hub.challenge'] } }];
`.trim();

const codigoExtraer = `
// Meta manda un lote de eventos. Nos quedamos solo con mensajes de texto de personas.
const cuerpo = $input.first().json.body || {};
const salida = [];

for (const entrada of cuerpo.entry || []) {
  for (const evento of entrada.messaging || []) {
    const mensaje = evento.message;

    // Ignorar acuses de entrega/lectura y los ecos de lo que envía la propia página.
    if (!mensaje || mensaje.is_echo) continue;
    if (!mensaje.text) continue;

    salida.push({
      json: {
        remitenteId: evento.sender.id,
        texto: mensaje.text,
        recibidoEn: new Date().toISOString(),
      },
    });
  }
}

return salida;   // si va vacío, el flujo se detiene aquí y no gasta nada
`.trim();

const codigoPrompt = `
// Arma la petición para Claude: instrucciones + catálogo compacto + historial.
// >>> AQUÍ SE EDITA LA PERSONALIDAD DEL BOT (la lista "instrucciones") <<<
const entrada = $('Extraer mensaje').first().json;
const catalogo = $('Obtener catálogo').first().json;

// Mientras la web corra solo en local, su enlace no le sirve a ningún cliente.
const esPublico = (u) => !!u && !/localhost|127\\.0\\.0\\.1|host\\.docker\\.internal/.test(u);

// Catálogo compacto, una línea por producto, para gastar pocos tokens.
const lineas = (catalogo.productos || []).map((p) => [
  p.nombre,
  p.color,
  p.categoria,
  p.precioTexto,
  p.agotado ? 'AGOTADO' : 'tallas ' + p.tallasDisponibles.join('/'),
  esPublico(p.url) ? p.url : null,
].filter((c) => c !== null).join(' | '));

const instrucciones = [
  'Eres el asistente de footshootermzl, una tienda de zapatos en Medellín, Colombia.',
  'Atiendes por Messenger. Hablas en español colombiano, cercano y breve, de tú.',
  '',
  'REGLAS:',
  '- Responde en 600 caracteres o menos. Sin listas largas ni markdown: esto es un chat.',
  '- Usa ÚNICAMENTE los datos del catálogo de abajo. Precios, tallas y modelos salen de ahí.',
  '- Si preguntan por algo que no está en el catálogo, dilo claro y ofrece alternativas parecidas.',
  '- Nunca inventes precios, tallas, plazos de envío, promociones ni disponibilidad.',
  '- Si preguntan por envíos, pagos, apartados o cualquier cosa que no esté en el catálogo,',
  '  no improvises: pasa la conversación a WhatsApp.',
  '',
  'PASO A WHATSAPP:',
  '- Cuando el cliente quiera comprar, apartar, negociar, o pida algo que no puedes resolver',
  '  con el catálogo, termina tu respuesta con la marca [WHATSAPP] en una línea aparte.',
  '- Esa marca no la ve el cliente: el sistema la borra y le muestra un botón de WhatsApp.',
  '- No escribas el número de WhatsApp en el texto; del botón se encarga el sistema.',
  '',
  '- Comparte el enlace de un producto solo si aparece en su línea del catálogo.',
  '',
  'CATÁLOGO (nombre | color | categoría | precio | tallas | enlace si lo hay):',
  lineas.join('\\n'),
].join('\\n');

// Historial corto por persona, para que el bot no pierda el hilo.
const memoria = $getWorkflowStaticData('global');
if (!memoria.conversaciones) memoria.conversaciones = {};

const previo = memoria.conversaciones[entrada.remitenteId];
const historial = previo && Array.isArray(previo.mensajes) ? previo.mensajes : [];

const mensajes = [...historial, { role: 'user', content: entrada.texto }];

return [{
  json: {
    remitenteId: entrada.remitenteId,
    cuerpo: {
      model: 'claude-opus-5',
      max_tokens: 1024,
      output_config: { effort: 'low' },
      system: [
        { type: 'text', text: instrucciones, cache_control: { type: 'ephemeral' } },
      ],
      messages: mensajes,
    },
  },
}];
`.trim();

const codigoRespuesta = `
// Saca el texto de Claude, detecta la marca [WHATSAPP] y guarda el historial.
const config = $('Configuración').first().json;
const previo = $('Construir prompt').first().json;
const respuesta = $input.first().json;

if (respuesta.stop_reason === 'refusal') {
  throw new Error('Claude rechazó la petición: ' + JSON.stringify(respuesta.stop_details || {}));
}

let texto = (respuesta.content || [])
  .filter((b) => b.type === 'text')
  .map((b) => b.text)
  .join('\\n')
  .trim();

const pasarAWhatsApp = texto.includes('[WHATSAPP]');
texto = texto.replace(/\\[WHATSAPP\\]/g, '').trim();

if (!texto) {
  texto = 'Cuéntame qué modelo te interesa y te ayudo.';
}

// Messenger corta en 2000 caracteres.
if (texto.length > 1900) texto = texto.slice(0, 1897) + '...';

// Guardar historial: últimos 8 turnos por persona.
const memoria = $getWorkflowStaticData('global');
if (!memoria.conversaciones) memoria.conversaciones = {};

const mensajes = [
  ...previo.cuerpo.messages,
  { role: 'assistant', content: texto },
].slice(-8);

memoria.conversaciones[previo.remitenteId] = {
  mensajes,
  actualizado: Date.now(),
};

// Purga conversaciones de más de 24 h para que la memoria no crezca sin control.
const limite = Date.now() - 24 * 60 * 60 * 1000;
for (const [clave, valor] of Object.entries(memoria.conversaciones)) {
  if (!valor.actualizado || valor.actualizado < limite) {
    delete memoria.conversaciones[clave];
  }
}

return [{
  json: {
    remitenteId: previo.remitenteId,
    texto,
    pasarAWhatsApp,
    cuerpoMensaje: {
      recipient: { id: previo.remitenteId },
      messaging_type: 'RESPONSE',
      message: { text: texto },
    },
    cuerpoBoton: {
      recipient: { id: previo.remitenteId },
      messaging_type: 'RESPONSE',
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'button',
            text: '¿Seguimos por WhatsApp? Ahí te atendemos de una.',
            buttons: [{
              type: 'web_url',
              url: 'https://wa.me/' + config.WHATSAPP,
              title: 'Escribir por WhatsApp',
            }],
          },
        },
      },
    },
  },
}];
`.trim();

const enviarMensaje = (expresion) => ({
  method: "POST",
  url: urlGraph("messages"),
  authentication: "genericCredentialType",
  genericAuthType: "httpQueryAuth",
  sendBody: true,
  specifyBody: "json",
  jsonBody: expresion,
  options: {},
});

const workflowMessenger = {
  name: "Footshooter — Bot de Messenger",
  nodes: [
    // --- Rama de verificación: Meta la llama una sola vez, al conectar el webhook ---
    nodo("Verificación de Meta", "n8n-nodes-base.webhook", 2, [-140, 60], {
      httpMethod: "GET",
      path: "messenger",
      responseMode: "responseNode",
      options: {},
    }, { webhookId: "footshooter-messenger-get" }),
    nodo("Comprobar token", "n8n-nodes-base.code", 2, [80, 60], {
      jsCode: codigoVerificar,
    }),
    nodo("Devolver challenge", "n8n-nodes-base.respondToWebhook", 1.1, [300, 60], {
      respondWith: "text",
      responseBody: "={{ $json.challenge }}",
      options: {},
    }),

    // --- Rama de mensajes: se dispara con cada mensaje que entra ---
    nodo("Mensaje entrante", "n8n-nodes-base.webhook", 2, [-140, 340], {
      httpMethod: "POST",
      path: "messenger",
      responseMode: "onReceived",
      options: {},
    }, { webhookId: "footshooter-messenger-post" }),
    nodo("Configuración", "n8n-nodes-base.set", 3.4, [80, 340], set(CONFIG)),
    nodo("Extraer mensaje", "n8n-nodes-base.code", 2, [300, 340], {
      jsCode: codigoExtraer,
    }),
    nodo("Obtener catálogo", "n8n-nodes-base.httpRequest", 4.2, [520, 340], {
      url: "={{ $('Configuración').first().json.CATALOGO_URL }}",
      options: {},
    }),
    nodo("Construir prompt", "n8n-nodes-base.code", 2, [740, 340], {
      jsCode: codigoPrompt,
    }),
    nodo("Consultar a Claude", "n8n-nodes-base.httpRequest", 4.2, [960, 340], {
      method: "POST",
      url: "https://api.anthropic.com/v1/messages",
      authentication: "genericCredentialType",
      genericAuthType: "httpHeaderAuth",
      sendHeaders: true,
      headerParameters: {
        parameters: [{ name: "anthropic-version", value: "2023-06-01" }],
      },
      sendBody: true,
      specifyBody: "json",
      jsonBody: "={{ JSON.stringify($json.cuerpo) }}",
      options: {},
    }),
    nodo("Preparar respuesta", "n8n-nodes-base.code", 2, [1180, 340], {
      jsCode: codigoRespuesta,
    }),
    nodo("Responder en Messenger", "n8n-nodes-base.httpRequest", 4.2, [1400, 340],
      enviarMensaje("={{ JSON.stringify($json.cuerpoMensaje) }}")),
    nodo("¿Pasar a WhatsApp?", "n8n-nodes-base.if", 2, [1620, 340], {
      conditions: {
        options: { caseSensitive: true, leftValue: "", typeValidation: "strict", version: 2 },
        conditions: [{
          id: id("cond"),
          leftValue: "={{ $('Preparar respuesta').first().json.pasarAWhatsApp }}",
          rightValue: "",
          operator: { type: "boolean", operation: "true", singleValue: true },
        }],
        combinator: "and",
      },
      options: {},
    }),
    nodo("Botón de WhatsApp", "n8n-nodes-base.httpRequest", 4.2, [1840, 240],
      enviarMensaje("={{ JSON.stringify($('Preparar respuesta').first().json.cuerpoBoton) }}")),
  ],
  connections: conectar([
    ["Verificación de Meta", "Comprobar token"],
    ["Comprobar token", "Devolver challenge"],
    ["Mensaje entrante", "Configuración"],
    ["Configuración", "Extraer mensaje"],
    ["Extraer mensaje", "Obtener catálogo"],
    ["Obtener catálogo", "Construir prompt"],
    ["Construir prompt", "Consultar a Claude"],
    ["Consultar a Claude", "Preparar respuesta"],
    ["Preparar respuesta", "Responder en Messenger"],
    ["Responder en Messenger", "¿Pasar a WhatsApp?"],
    ["¿Pasar a WhatsApp?", "Botón de WhatsApp", 0],
  ]),
  settings: { executionOrder: "v1" },
  pinData: {},
};

// ---------------------------------------------------------------------------

const archivos = [
  ["workflow-1-publicacion-facebook.json", workflowPublicacion],
  ["workflow-2-messenger-bot.json", workflowMessenger],
];

for (const [nombre, wf] of archivos) {
  fs.writeFileSync(path.join(salida, nombre), JSON.stringify(wf, null, 2) + "\n");

  // Verificación: que ninguna conexión apunte a un nodo que no existe.
  const nombres = wf.nodes.map((n) => n.name);
  const referidos = new Set(
    Object.entries(wf.connections).flatMap(([origen, v]) => [
      origen,
      ...v.main.flat().map((c) => c.node),
    ])
  );
  const rotas = [...referidos].filter((r) => !nombres.includes(r));
  if (rotas.length) throw new Error(`${nombre}: conexiones a nodos inexistentes -> ${rotas}`);

  console.log(`OK  ${nombre}  (${wf.nodes.length} nodos)`);
}
