# Portfolio — Nicole Frenkel (FRNKL)

Sitio de portfolio personal. Es **solo frontend**, sin backend: toda la
información (experiencia, proyectos, textos) está hardcodeada directamente
en el HTML y se edita a mano cada vez que cambia el contenido.

## Stack

- HTML + CSS + JS puro, todo en un único archivo: `index.html`.
- Sin build step, sin framework, sin dependencias (`package.json` no existe
  a propósito).
- Fuentes vía Google Fonts (`<link>` en el `<head>`).
- Contenido bilingüe EN/ES: cada texto tiene `data-en` / `data-es` y un
  switch de idioma en JS que reemplaza el `innerHTML` según el botón
  clickeado (ver `<script>` al final de `index.html`).

Se eligió HTML/CSS/JS puro en vez de Vite/React o Next.js porque el sitio
es solo UI estática que el usuario va a ir editando directamente en el
código — no hace falta build ni estructura de componentes.

## Estructura

```
index.html    → todo: markup, <style> inline, <script> inline
.gitignore    → ignora .vercel/ y .DS_Store
```

Secciones dentro de `index.html`:
- **Home** (`#view-home`): hero, marquee de equipos/empresas, timeline de
  experiencia (`#journey`), educación, contacto (`#contact`).
- **Projects** (`#view-projects`): carrusel 3D de proyectos (cards con
  `role_en`/`role_es`/`desc_en`/`desc_es` hardcodeados en el array
  `projects` dentro del `<script>`), que abre un bottom sheet con detalle
  al hacer click.

No hay routing real: son dos `<main>` que se muestran/ocultan con JS
(`showView()`), no hay history API ni URLs distintas por vista.

## Cómo editar contenido

Todo el contenido (experiencia, proyectos, textos, mails, links de
LinkedIn/Behance) se edita directo en `index.html`:
- Textos con traducción: atributos `data-en` / `data-es` en el HTML.
- Proyectos del carrusel: array `const projects = [...]` en el `<script>`.
- Fotos de proyectos: son placeholders (`<div class="photo">`), todavía no
  hay imágenes reales cargadas.

## Cómo correrlo localmente

No requiere instalación de nada. Alcanza con cualquier server estático:

```bash
python3 -m http.server 8787
# abrir http://localhost:8787/index.html
```

## Deploy a Vercel

Al ser HTML estático sin build, Vercel lo detecta sin necesidad de
`vercel.json` (framework preset: "Other" / estático).

- Repo en GitHub: `git@github.com:pulpobober/portfolioNiki.git` (remote
  `origin`, branch `main`).
- Repo ya conectado a Vercel vía dashboard ("Import Project"). Cada push a
  `main` dispara un deploy automático.
