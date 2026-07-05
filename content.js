/* ============================================================
   CONTENIDO EDITABLE — PROYECTOS DEL CARRUSEL
   ============================================================

   Este archivo tiene SOLO los proyectos que se ven en el carrusel
   (la vista "Selected projects" / "Proyectos"). Es lo único de acá
   que se toca seguido.

   Cada proyecto es un bloque entre llaves { ... } separado por coma.

   Para AGREGAR un proyecto:
     1. Copiá un bloque { ... } entero, incluida la coma del final.
     2. Pegalo dentro de los corchetes [ ... ], donde quieras que aparezca.
     3. Cambiale los textos.

   Para SACAR un proyecto: borrá su bloque { ... } entero (y su coma).

   Qué significa cada campo:
     title    → título del proyecto (igual en los dos idiomas).
     role_en  → subtítulo/rol en INGLÉS.
     role_es  → subtítulo/rol en ESPAÑOL.
     desc_en  → descripción larga en INGLÉS (se ve al abrir la card).
     desc_es  → descripción larga en ESPAÑOL.

   Reglas para no romper nada:
     - Los textos van SIEMPRE entre comillas "así".
     - Si dentro de un texto necesitás comillas, usá comillas simples 'así'.
     - No borres las comas que separan los campos ni los bloques.
   ============================================================ */

const projects = [
  { title:"Banco Galicia", role_en:"Product · UX/UI · fintech", role_es:"Producto · UX/UI · fintech",
    desc_en:"Add the story here — the problem, your role and team, the key decisions and trade-offs, and the outcome (with a metric if you have one).",
    desc_es:"Contá la historia acá — el problema, tu rol y equipo, las decisiones y trade-offs clave, y el resultado (con una métrica si tenés)." },
  { title:"UHC · Tietoevry", role_en:"UX · US healthcare", role_es:"UX · salud EE.UU.",
    desc_en:"Add the story here — the problem, your role and team, the key decisions and trade-offs, and the outcome.",
    desc_es:"Contá la historia acá — el problema, tu rol y equipo, las decisiones clave y el resultado." },
  { title:"Carestino", role_en:"E-commerce · UX/UI", role_es:"E-commerce · UX/UI",
    desc_en:"Add the story here — the problem, your role, key decisions, and the outcome.",
    desc_es:"Contá la historia acá — el problema, tu rol, las decisiones clave y el resultado." },
  { title:"Miller Zell", role_en:"Retail experience", role_es:"Experiencia retail",
    desc_en:"Add the story here — the problem, your role, key decisions, and the outcome.",
    desc_es:"Contá la historia acá — el problema, tu rol, las decisiones clave y el resultado." },
  { title:"Bleet", role_en:"Product design", role_es:"Diseño de producto",
    desc_en:"Add the story here — the problem, your role, key decisions, and the outcome.",
    desc_es:"Contá la historia acá — el problema, tu rol, las decisiones clave y el resultado." },
  { title:"Debute", role_en:"Furniture · industrial", role_es:"Mobiliario · industrial",
    desc_en:"Add the story here — the problem, your role, key decisions, and the outcome.",
    desc_es:"Contá la historia acá — el problema, tu rol, las decisiones clave y el resultado." },
];
