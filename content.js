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
                   su case study completo cargado (por ahora, "UHG ·
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
  { title:"Scalable Medicare Experience", role_en:"UX · US healthcare", role_es:"UX · salud EE.UU.",
    desc_en:"Add the story here — the problem, your role and team, the key decisions and trade-offs, and the outcome.",
    desc_es:"Contá la historia acá — el problema, tu rol y equipo, las decisiones clave y el resultado.",
    caseStudyEl:"csShopPages",
    cover:"assets/case-studies/medicare/shop-hub-cover.jpg", coverPos:"top center",
    eyebrow_en:"UHG · Responsive Web", eyebrow_es:"UHG · Web responsive",
    blurb_en:"Rebuilding five high-traffic Medicare plan pages into one scalable, scannable system.",
    blurb_es:"Reconstruir cinco páginas de planes de Medicare de alto tráfico en un único sistema escalable y escaneable.",
    chips_en:["Scale experiences","Clarify complexity","Build reusable systems","Design for constraints"],
    chips_es:["Escalar experiencias","Clarificar la complejidad","Construir sistemas reutilizables","Diseñar con restricciones"],
    cta_en:"Project Overview", cta_es:"Resumen del proyecto" },
  { title:"Miller Zell", role_en:"Retail experience", role_es:"Experiencia retail",
    desc_en:"Add the story here — the problem, your role, key decisions, and the outcome.",
    desc_es:"Contá la historia acá — el problema, tu rol, las decisiones clave y el resultado." },
  { title:"UHG Project", role_en:"UX · US healthcare", role_es:"UX · salud EE.UU.",
    desc_en:"Add the story here — the problem, your role and team, the key decisions and trade-offs, and the outcome.",
    desc_es:"Contá la historia acá — el problema, tu rol y equipo, las decisiones clave y el resultado." },
  { title:"UI Case Study", role_en:"UI · Visual design", role_es:"UI · Diseño visual",
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
  { name:"Brian Reimer",
    role_en:"Manager, Digital Product · UHG",
    role_es:"Manager, Producto Digital · UHG",
    quote_en:"Nicole was an absolute pleasure to work with. She's been a great partner in our product development, always delivering what we had envisioned in our strategy PLUS additional variants as food-for-thought. Most importantly, she goes above and beyond, adding in creative touches that make sense in real-world UX. A great listener and always met timeline expectations, all with a wonderful, collaborative attitude!",
    quote_es:"Fue un absoluto placer trabajar con Nicole. Fue una gran socia en el desarrollo de nuestro producto, entregando siempre lo que habíamos imaginado en nuestra estrategia MÁS variantes adicionales como disparadores para pensar. Y lo más importante: hace siempre más de lo esperado, sumando toques creativos que tienen sentido en la UX del mundo real. Una gran escucha, siempre cumplió con los plazos y todo con una actitud maravillosa y colaborativa." },

  { name:"Wes Moore",
    role_en:"UX/CX Design Leader · UHG",
    role_es:"Líder de Diseño UX/CX · UHG",
    quote_en:"Nicole was a UX designer on the team I managed at UnitedHealthcare, and if there was a tough design problem to solve, she was someone I knew I could throw into the deep end with confidence. She has an impressive ability to take on just about any UX challenge and consistently deliver work that is thoughtful, polished, and user-centered. She is very skilled in Figma, using it to create everything from wireframes and user flows to polished UI designs, interactive prototypes, and AI-enabled experiences. Her expertise spans both desktop and mobile apps, and she is equally comfortable moving between big-picture experience strategy and detailed interface design. What has always stood out to me is how she connects research to design. Nicole doesn't just build prototypes. She builds prototypes that answer questions we all had going into and out of it. She knows how to plan discovery, facilitate usability testing, and synthesize mountains of feedback into presentations that make stakeholders feel beyond satisfied with the insights and directions to take from it. Beyond UX, Nicole also has a strong visual design and branding background. During our time at UnitedHealthcare, she played a key role in evolving an established design system into a cohesive mobile experience, creating new visual elements that felt fresh while remaining true to the overall brand identity. I would welcome the opportunity to work with Nicole again without hesitation. She is a talented designer, an outstanding collaborator, and someone who elevates every team she's a part of. Any organization would be fortunate to have her.",
    quote_es:"Nicole fue diseñadora de UX en el equipo que dirigí en UnitedHealthcare, y si había un problema de diseño difícil de resolver, era alguien a quien sabía que podía tirar a lo profundo con total confianza. Tiene una capacidad impresionante para encarar prácticamente cualquier desafío de UX y entregar de forma consistente un trabajo reflexivo, prolijo y centrado en el usuario. Maneja Figma con muchísima soltura, usándolo para crear desde wireframes y user flows hasta diseños de UI pulidos, prototipos interactivos y experiencias con IA. Su expertise abarca tanto apps de desktop como mobile, y se mueve con la misma comodidad entre la estrategia de experiencia de alto nivel y el diseño de interfaz al detalle. Lo que siempre me llamó la atención es cómo conecta la investigación con el diseño. Nicole no solo arma prototipos: arma prototipos que responden las preguntas que todos teníamos al entrar y al salir de ellos. Sabe planificar el discovery, facilitar pruebas de usabilidad y sintetizar montañas de feedback en presentaciones que dejan a los stakeholders más que satisfechos con los insights y las direcciones a tomar. Más allá de la UX, Nicole también tiene una sólida formación en diseño visual y branding. Durante nuestro tiempo en UnitedHealthcare, cumplió un rol clave en la evolución de un design system consolidado hacia una experiencia mobile cohesiva, creando nuevos elementos visuales que se sentían frescos sin dejar de ser fieles a la identidad de marca. No dudaría en volver a trabajar con Nicole. Es una diseñadora talentosa, una colaboradora excepcional y alguien que eleva a todos los equipos de los que forma parte. Cualquier organización tendría suerte de contar con ella." },

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
