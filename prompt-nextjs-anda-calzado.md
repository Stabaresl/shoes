# Prompt: Tienda online Next.js — ANDA Calzado

Copia y pega el siguiente prompt completo en tu herramienta de desarrollo (Claude Code, Cursor, etc.):

---

Quiero que construyas una tienda online moderna, amigable y con muy buen diseño para **ANDA Calzado**, una tienda de zapatos con catálogo variado (deportivo, casual, urbano, formal). El nombre "ANDA" juega con el verbo "andar" y también funciona como una invitación directa a la acción ("¡anda, encuéntralos!") — ese doble sentido debe sentirse en el tono de la marca: cercano, entusiasta, nunca corporativo o frío.

El objetivo #1 del sitio es **invitar a comprar**: cada sección debe empujar suavemente hacia la acción (ver producto, agregar al carrito, comprar), sin sentirse agresivo ni saturado de banners de descuento genéricos.

## Stack técnico

- **Next.js 14+** (App Router, TypeScript)
- **Tailwind CSS** para estilos
- **Framer Motion** para transiciones, hover states y micro-interacciones (agregar al carrito, cambios de talla/color, etc.)
- **Zustand** (o Context API simple) para el estado del carrito de compras
- **Embla Carousel** o **Swiper** para carruseles de producto (categorías destacadas, "también te puede gustar")
- **lucide-react** para iconografía, o cualquier librería de íconos que consideres mejor
- `next/image` para todas las imágenes de producto, optimizadas y con lazy loading
- Usa cualquier otra librería o plugin de Tailwind que eleve la calidad del resultado (ej. `@tailwindcss/forms` para el checkout)

## Identidad de marca (propónla tú, pero sigue esta dirección)

- **Nombre:** ANDA Calzado
- **Personalidad:** amigable, cálida, entusiasta pero no infantil — como una tienda de barrio con muy buen ojo, no una cadena impersonal.
- **Evita los defaults genéricos de IA**: nada de fondo crema #F4F1EA + acento terracota #D97757, nada de fondo negro con verde ácido. Propón una paleta propia que se sienta cómoda y cálida sin caer en esos clichés — piensa en tonos térreos, o un color vivo pero curado (no el típico "azul startup"), combinado con neutros cálidos.
- **Tipografía:** una fuente display con personalidad y calidez para títulos (no la típica geométrica fría), combinada con una sans-serif muy legible para precios, tallas y datos de producto.
- **Concepto de ícono/signature:** algo que remita a movimiento o huella de forma sutil y elegante — no un logo literal de zapato de clip-art. Puede ser una marca gráfica abstracta inspirada en una huella, un trazo de paso, o una curva de movimiento.

## Estructura del sitio

1. **Hero** — con foco claro en invitar a explorar el catálogo. Puede incluir un producto destacado real (imagen grande, buen recorte) con animación de entrada (Framer Motion), no la fórmula genérica de headline + gradiente. CTA principal: "Ver colección" o similar, con microinteracción atractiva al hover.
2. **Categorías destacadas** — grid o carrusel de las categorías principales (deportivo, casual, urbano, formal), cada una con imagen representativa y transición suave al hacer hover.
3. **Productos destacados / más vendidos** — grid de tarjetas de producto: imagen (con segunda imagen al hover mostrando otro ángulo), nombre, precio, tallas disponibles como chips pequeños, botón rápido de "Agregar al carrito" que anima el ícono del carrito al hacer click.
4. **Por qué comprar en ANDA** — 3-4 puntos de valor reales para una tienda de zapatos (ej. cambios/devoluciones fáciles, envío rápido, guía de tallas, calidad garantizada) con iconografía coherente con el signature de marca, no íconos genéricos flotando.
5. **Página de producto individual** — galería de imágenes con miniaturas, selector de talla con feedback visual claro (deshabilitar tallas agotadas, no ocultarlas), selector de color si aplica, botón de compra prominente, sección de detalles/materiales, y productos relacionados al final.
6. **Carrito** — panel lateral (drawer) que se abre con animación al agregar un producto, muestra resumen claro, permite ajustar cantidad/talla, y tiene un CTA directo a checkout.
7. **Newsletter/footer** — invitación amigable a suscribirse (no un formulario frío), redes sociales, información de envíos y devoluciones.

## Animación (nivel de detalle esperado)

- Entrada orquestada del hero (no todo apareciendo de golpe).
- Hover en tarjetas de producto: cambio de imagen, leve elevación, aparición suave del botón "Agregar al carrito".
- Feedback visual inmediato y satisfactorio al agregar algo al carrito (micro-animación del ícono, no solo un cambio de número).
- Scroll reveals sutiles en las secciones de categorías y "por qué comprar en ANDA".
- Transiciones suaves al cambiar de talla/color en la página de producto.
- Respeta `prefers-reduced-motion`.
- La animación debe sentirse juguetona y cálida (acorde a la personalidad amigable de la marca), pero sin saturar — la sofisticación viene de que cada animación tenga un propósito claro (dar feedback, guiar la atención), no de la cantidad de efectos.

## Copy y tono

- Todo el copy debe sonar cercano y entusiasta, en español neutro/latino, nunca corporativo ni robótico.
- Los botones deben decir exactamente lo que hacen ("Agregar al carrito", "Ver detalles", no "Enviar" o "Click aquí").
- Los mensajes de carrito vacío, error o confirmación deben tener personalidad de marca, no ser genéricos ("¡Tu carrito está listo para llenarse de buenos pasos!" en vez de "No hay productos en el carrito").
- Usa contenido de ejemplo realista para los productos (nombre, precio, descripción breve), y marca claramente en comentarios del código cuáles son placeholders a reemplazar por catálogo real.

## Calidad y estándares

- Totalmente responsive, mobile-first (la mayoría de compradores van a entrar desde el celular).
- Foco visible en navegación por teclado, buen contraste de color (accesibilidad).
- Performance: `next/image`, lazy loading, evitar animaciones que generen layout shift.
- Código limpio, componentizado, TypeScript bien tipado.
- Antes de terminar, revisa tu propio resultado: ¿alguna sección se ve genérica o como cualquier otra tienda? Ajústala hasta que se sienta propia de ANDA.

Antes de escribir código, dame primero un plan breve: paleta final con hex, tipografías elegidas, concepto del signature/ícono de marca, y un wireframe en ASCII del hero y del grid de productos destacados — para revisarlo contigo antes de construir todo el sitio.

---
