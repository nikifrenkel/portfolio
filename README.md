# Portfolio — Nicole Frenkel (FRNKL)

Sitio de portfolio personal. Es **solo frontend**, sin backend: toda la
información (experiencia, proyectos, textos) está hardcodeada en el código
y se edita a mano cada vez que cambia el contenido.

## Stack

- HTML + CSS + JS puro. Sin build step, sin framework, sin dependencias
  (`package.json` no existe a propósito).
- Fuentes vía Google Fonts (`<link>` en el `<head>` de `index.html`).
- Contenido bilingüe EN/ES: cada texto tiene `data-en` / `data-es` y un
  switch de idioma en JS que reemplaza el `innerHTML` según el botón
  clickeado.

Se eligió HTML/CSS/JS puro en vez de Vite/React o Next.js porque el sitio
es solo UI estática que se edita directamente en el código — no hace falta
build ni estructura de componentes.

## Estructura de archivos

El código está separado por **tipo de cambio**, no por sección, para que
cada edición toque un solo archivo chico:

```
index.html   → el esqueleto (markup). Textos de la home viven acá.
styles.css   → TODO el diseño: colores, tamaños, fuentes, animaciones.
content.js   → contenido editable del carrusel (array `projects`). Comentado.
app.js       → comportamiento: carrusel, navegación, switch de idioma.
```

Orden de carga en `index.html`: `content.js` se carga **antes** que
`app.js`, porque `app.js` usa la variable `projects` que define `content.js`.

## 🗺️ Mapa de cambios — dónde tocar cada cosa

| Quiero cambiar… | Archivo | Dónde exactamente |
|---|---|---|
| Texto/descripción de un proyecto | `content.js` | array `projects` (campos `desc_en` / `desc_es`) |
| Agregar o sacar un proyecto | `content.js` | array `projects` (copiar/borrar un bloque `{ ... }`) |
| Título o rol de un proyecto | `content.js` | array `projects` (`title`, `role_en`, `role_es`) |
| Hero: "Hello!", "It's Nicole", la frase de años | `index.html` | `<header>` dentro de `#view-home` |
| Marquee de empresas/equipos | `index.html` | `<section class="teams">` (los `<span>`) |
| Timeline de experiencia (trabajos) | `index.html` | `<section class="journey">` → `.tl-item` |
| Ubicación / idiomas / educación | `index.html` | bloques `.meta` y `.edu` |
| Mail de contacto | `index.html` | `<section class="contact">` + `<footer>` |
| Links de LinkedIn / Behance | `index.html` | `<footer>` |
| Título de la vista de proyectos | `index.html` | `.cf-title` dentro de `#view-projects` |
| Colores, tamaños, fuentes, espaciados | `styles.css` | variables `:root` arriba, o la clase correspondiente |
| Cómo gira / autoplay del carrusel | `app.js` | funciones `render()` y `play()` |

> Los textos de la home (`index.html`) van siempre en **dos idiomas**:
> atributo `data-en` (inglés) y `data-es` (español). Hay que cambiar los dos,
> más el texto visible entre las etiquetas (que es el que se ve al cargar).

## Cómo editar los proyectos (lo más común)

Se editan en `content.js`, que está comentado paso a paso. Cada proyecto es
un bloque `{ title, role_en, role_es, desc_en, desc_es }`. Para agregar uno,
se copia un bloque entero (con su coma) y se cambian los textos. Las fotos de
proyecto todavía son placeholders (`<div class="photo">`), no hay imágenes
reales cargadas.

## Cómo correrlo localmente

Hay dos formas:

**1. Doble-click (la más simple).** Abrí `index.html` en el navegador y listo.
Los tres archivos (`styles.css`, `content.js`, `app.js`) se cargan como
scripts/estilos clásicos con rutas relativas, que el navegador lee sin problema
desde `file://`. No hace falta instalar ni levantar nada.

**2. Con un server estático** (opcional, útil si querés probar como en
producción):

```bash
python3 -m http.server 8787
# abrir http://localhost:8787/index.html
```

Cualquier server estático sirve; no requiere instalar dependencias.

## Deploy a Vercel

Al ser HTML estático sin build, Vercel lo detecta sin `vercel.json`
(framework preset: "Other" / estático).

- Repo en GitHub: `git@github.com:pulpobober/portfolioNiki.git` (remote
  `origin`, branch `main`).
- Conectado a Vercel vía dashboard. Cada push a `main` dispara un deploy
  automático. Los 4 archivos (`index.html`, `styles.css`, `content.js`,
  `app.js`) se sirven tal cual, sin procesar.
