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

     caseStudyEl → OPCIONAL. Sólo lo tienen los proyectos que ya tienen
                   su case study completo cargado (por ahora, "UHC ·
                   Tietoevry"). Apunta a un bloque de contenido armado a
                   medida en index.html — no lo edites a mano; si querés
                   sacarle el case study a un proyecto, simplemente borrá
                   esta línea entera del bloque.

   Campos OPCIONALES para la card del carrusel (el diseño "portada
   inmersiva": foto de fondo + degradado oscuro + texto encima). Si un
   proyecto no los tiene, la card cae en el diseño anterior (fondo de
   color liso) usando role_en/es como eyebrow — así que podés ir
   agregándolos de a uno sin romper los demás:

     cover     → ruta a la imagen de portada (ej: "assets/foo/img-01.jpg").
     coverPos  → posición del recorte de la imagen, ej: "top center",
                 "center", "top left". Si no lo ponés, usa "top center".
     eyebrow_en/es → línea chica arriba del título (ej: "Cliente · Tipo
                 de proyecto"). Si no lo ponés, usa role_en/es.
     blurb_en/es   → bajada de UNA línea que se ve en la card (distinta
                 de desc_en/es, que es la historia larga de adentro).
     chips_en/es   → lista de tags cortos (ej: ["Simplify plan
                 discovery","Reduce cognitive load"]). Mismo orden y
                 misma cantidad en los dos idiomas.
     cta_en/es → texto del botón de la card (ej: "Project Overview").
                 Si no lo ponés, usa "View project" / "Ver proyecto".

   Reglas para no romper nada:
     - Los textos van SIEMPRE entre comillas "así".
     - Si dentro de un texto necesitás comillas, usá comillas simples 'así'.
     - No borres las comas que separan los campos ni los bloques.
   ============================================================ */

const projects = [
  { title:"AI-Powered Medicare Shopping Experience", role_en:"UX · US healthcare", role_es:"UX · salud EE.UU.",
    desc_en:"Add the story here — the problem, your role and team, the key decisions and trade-offs, and the outcome.",
    desc_es:"Contá la historia acá — el problema, tu rol y equipo, las decisiones clave y el resultado.",
    caseStudyEl:"csMedicare",
    cover:"assets/case-studies/medicare/card-cover.jpg", coverPos:"top center",
    eyebrow_en:"UHG · Responsive Web", eyebrow_es:"UHG · Web responsive",
    blurb_en:"Redesigning the Medicare shopping homepage into an AI-ready, personalized enrollment experience.",
    blurb_es:"Rediseño de la homepage de compra de Medicare hacia una experiencia de inscripción personalizada y lista para IA.",
    chips_en:["Simplify plan discovery","Reduce cognitive load","AI personalization","Boost recommendations"],
    chips_es:["Simplificar la búsqueda de planes","Reducir la carga cognitiva","Personalización con IA","Mejorar las recomendaciones"],
    cta_en:"Project Overview", cta_es:"Resumen del proyecto" },
  { title:"Banco Galicia", role_en:"Product · UX/UI · fintech", role_es:"Producto · UX/UI · fintech",
    desc_en:"Add the story here — the problem, your role and team, the key decisions and trade-offs, and the outcome (with a metric if you have one).",
    desc_es:"Contá la historia acá — el problema, tu rol y equipo, las decisiones y trade-offs clave, y el resultado (con una métrica si tenés)." },
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

/* ============================================================
   CONTENIDO EDITABLE — RECOMENDACIONES (testimonios)
   ============================================================

   Las tarjetas de la sección "Recommendations". Funcionan igual que
   los proyectos de arriba: cada testimonio es un bloque { ... }
   separado por coma. La sección crece sola: agregá los que quieras.

   Para AGREGAR uno:
     1. Copiá un bloque { ... } entero, con la coma del final.
     2. Pegalo dentro de los corchetes [ ... ].
     3. Cambiale los textos.

   Qué significa cada campo:
     name     → nombre de la persona (igual en los dos idiomas).
     role_en  → rol / relación en INGLÉS  (ej: "UX Designer · Coworker at ...").
     role_es  → rol / relación en ESPAÑOL.
     quote_en → el testimonio en INGLÉS.
     quote_es → el testimonio en ESPAÑOL.

   La tarjeta muestra solo las primeras líneas y agrega un "Read more"
   automáticamente cuando el texto es largo. No hace falta cortarlo a mano.

   Reglas para no romper nada:
     - Los textos van SIEMPRE entre comillas "así".
     - Si dentro de un texto necesitás comillas, usá comillas simples 'así'.
     - No borres las comas que separan los campos ni los bloques.
   ============================================================ */

const recommendations = [
  { name:"David McLean",
    role_en:"Sr. UX/CX Designer · Coworker at UHG",
    role_es:"Sr. UX/CX Designer · Compañero en UHG",
    quote_en:"I truly enjoyed working with Nicole and greatly valued her partnership. She was thoughtful, collaborative, and consistently brought a positive attitude to the team. Nicole had a knack for bringing people together, asking insightful questions, and creating space for productive conversations. She also demonstrated strong leadership by guiding discussions with confidence, building alignment across teams, and helping others stay focused on shared goals. Her ability to build trust and foster collaboration made her an exceptional teammate and someone I genuinely enjoyed working with. I was grateful for her support, partnership, and the positive impact she had on those around her.",
    quote_es:"Disfruté mucho trabajar con Nicole y valoré enormemente su compañerismo. Fue reflexiva, colaborativa y siempre aportó una actitud positiva al equipo. Nicole tenía la habilidad de unir a las personas, hacer preguntas perspicaces y generar espacio para conversaciones productivas. También demostró un fuerte liderazgo guiando las discusiones con confianza, construyendo alineación entre equipos y ayudando a los demás a mantener el foco en los objetivos compartidos. Su capacidad para generar confianza y fomentar la colaboración la convirtió en una compañera excepcional y en alguien con quien realmente disfruté trabajar. Estuve agradecido por su apoyo, su compañerismo y el impacto positivo que tuvo en quienes la rodeaban." },

  { name:"Magali Bitler",
    role_en:"UX/UI Designer · Coworker at Galicia Bank",
    role_es:"Diseñadora UX/UI · Compañera en Galicia Bank",
    quote_en:"Nicole not only has an enormous background of experience and knowledge, but she also stands out for always wanting to help others, both as a designer and as a coworker. She is a very hard worker and passionate about what she does, and it shows in the value she delivers.",
    quote_es:"Nicole no solo tiene una enorme trayectoria de experiencia y conocimiento, sino que además se destaca por querer siempre ayudar a los demás, tanto como diseñadora como compañera. Es muy trabajadora y apasionada por lo que hace, y eso se nota en el valor que entrega." },

  { name:"Johanna Sofia Peri",
    role_en:"Sr. UX/UI Designer · Coworker at Galicia Bank",
    role_es:"Sr. UX/UI Designer · Compañera en Galicia Bank",
    quote_en:"Niki is a great professional and teammate, always willing to lend a hand whenever someone needs it. Her experience as a designer and her background in industrial design make her a creative professional with a holistic perspective when it comes to crafting solutions for designing experiences and services.",
    quote_es:"Niki es una gran profesional y compañera, siempre dispuesta a dar una mano cuando alguien lo necesita. Su experiencia como diseñadora y su formación en diseño industrial la convierten en una profesional creativa, con una mirada holística a la hora de crear soluciones para diseñar experiencias/servicios." },
];
