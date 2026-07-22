/* ============================================================
   COMPORTAMIENTO DEL SITIO (carrusel, navegación, idioma)
   ============================================================
   Esto casi nunca se toca. La lógica de cómo funciona el sitio.
   El contenido editable (proyectos) está en content.js.
   Los textos de la home (hero, timeline, contacto) están en
   index.html con atributos data-en / data-es.

   El sitio es UNA sola página con secciones (#home, #journey,
   #projects, #contact). El topbar usa anchors (#seccion) que
   scrollean dentro de la misma página. En mobile el topbar
   colapsa en un menú hamburguesa.

   NOTA: este archivo usa la variable `projects`, que se define en
   content.js. Por eso en index.html content.js se carga ANTES que app.js.
   ============================================================ */

let lang='en', current=0, sheetOpen=false, timer=null, dragged=false, startX=null, projectsInView=false;

/* ---------- Carrusel ---------- */
const stage=document.getElementById('stage'), dotsWrap=document.getElementById('dots');
projects.forEach((p,i)=>{
  const c=document.createElement('div'); c.className='cf-card';
  const eyebrow_en=p.eyebrow_en||p.role_en, eyebrow_es=p.eyebrow_es||p.role_es;
  const cta_en=p.cta_en||'View project', cta_es=p.cta_es||'Ver proyecto';
  const chips=(p.chips_en||[]).map((chip,ci)=>`<span data-en="${chip}" data-es="${p.chips_es[ci]}">${chip}</span>`).join('');
  c.innerHTML=`<div class="cf-cover"${p.cover?` style="background-image:url('${p.cover}');background-position:${p.coverPos||'top center'};"`:''}></div>
    <div class="cf-scrim"></div>
    <div class="cf-content">
      <div class="cf-eyebrow" data-en="${eyebrow_en}" data-es="${eyebrow_es}">${eyebrow_en}</div>
      <div class="cf-name">${p.title}</div>
      ${p.blurb_en?`<div class="cf-blurb" data-en="${p.blurb_en}" data-es="${p.blurb_es}">${p.blurb_en}</div>`:''}
      ${chips?`<div class="cf-chips">${chips}</div>`:''}
      <button type="button" class="cf-cta" data-en="${cta_en}" data-es="${cta_es}">${cta_en}</button>
    </div>`;
  c.addEventListener('click',e=>{
    if(dragged) return;
    /* El botón "View project" siempre abre el bottom sheet. */
    if(e.target.closest('.cf-cta')){ openSheet(i); return; }
    /* Si la card no es la central, el click sólo la trae al centro. */
    if(i!==current){ current=i; render(); play(); return; }
    /* Ya es la central: recién ahí el click abre el bottom sheet. */
    openSheet(i);
  });
  stage.appendChild(c);
  const d=document.createElement('button'); d.className='dot'; d.setAttribute('aria-label','go to '+p.title);
  d.addEventListener('click',()=>{ current=i; render(); play(); });
  dotsWrap.appendChild(d);
});
const cards=[...stage.children], dots=[...dotsWrap.children], n=cards.length;

function render(){
  cards.forEach((c,i)=>{
    let o=i-current; if(o>n/2)o-=n; if(o<-n/2)o+=n;
    const abs=Math.abs(o);
    const x=o*(window.innerWidth<640?150:240);
    const rotY=o===0?0:(o<0?42:-42);
    const z=-abs*170, scale=o===0?1:0.82;
    c.style.transform=`translate(-50%,-50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`;
    c.style.opacity=abs>2?0:1;
    c.style.filter=o===0?'none':'brightness(.92) saturate(.9)';
    c.style.zIndex=50-abs; c.style.pointerEvents=abs>2?'none':'auto';
  });
  dots.forEach((d,i)=>d.classList.toggle('active',i===current));
}
/* Autoavanza al entrar en la sección: cada card queda centrada ~1s antes
   de pasar a la siguiente. NO autoavanza mientras el mouse está encima
   del carrusel (hovering) — así podés leer una card sin que se te escape. */
let hovering=false;
function play(){ stop(); if(!sheetOpen && projectsInView && !hovering) timer=setInterval(()=>{ current=(current+1)%n; render(); },1000); }
function stop(){ if(timer){ clearInterval(timer); timer=null; } }
/* Escuchamos en toda la zona del carrusel (flechas incluidas), no sólo en
   el stage, porque las cards se salen de la caja del stage y las mouseenter/
   leave sobre el stage solo se disparaban de forma inconsistente. */
const carouselEl=document.querySelector('.carousel')||stage;
carouselEl.addEventListener('pointerenter',()=>{ hovering=true; stop(); });
carouselEl.addEventListener('pointerleave',()=>{ hovering=false; if(!sheetOpen) play(); });

/* El carrusel sólo autoavanza (y responde a las flechas) cuando
   la sección de proyectos está a la vista. */
const projectsSection=document.getElementById('projects');
new IntersectionObserver(entries=>{
  entries.forEach(e=>{ projectsInView=e.isIntersecting; if(projectsInView) play(); else stop(); });
},{threshold:0.25}).observe(projectsSection);

window.addEventListener('keydown',e=>{
  if(e.key==='Escape'){ closeSheet(); return; }
  if(!projectsInView) return;
  if(e.key==='ArrowLeft'){current=(current-1+n)%n;render();play();}
  if(e.key==='ArrowRight'){current=(current+1)%n;render();play();}
});
/* Flechas laterales: avanzan/retroceden el carrusel al tocarlas. */
const prevBtn=document.getElementById('prev'), nextBtn=document.getElementById('next');
if(prevBtn) prevBtn.addEventListener('click',()=>{ current=(current-1+n)%n; render(); play(); });
if(nextBtn) nextBtn.addEventListener('click',()=>{ current=(current+1)%n; render(); play(); });

stage.addEventListener('pointerdown',e=>{ startX=e.clientX; dragged=false; });
stage.addEventListener('pointermove',e=>{ if(startX!==null && Math.abs(e.clientX-startX)>8) dragged=true; });
window.addEventListener('pointerup',e=>{
  if(startX===null) return;
  const dx=e.clientX-startX;
  if(dx>60){ current=(current-1+n)%n; render(); play(); }
  else if(dx<-60){ current=(current+1)%n; render(); play(); }
  startX=null; setTimeout(()=>{ dragged=false; },0);
});

/* ---------- Hero deck: baraja de cards en abanico (solo desktop) ----------
   Replica el "stack" pedido: 4 cards de tamaño fijo apiladas en el mismo
   centro. Una está al frente (active); las demás asoman corridas a la
   derecha+abajo, escaladas y rotadas como una baraja en abanico. Todo se
   deriva de `deckActive` (0–3): al cambiarlo, sólo cambian los números y
   las transiciones CSS animan el reacomodo. Reusa las mismas cards del
   carrusel (los primeros 4 proyectos de content.js). */
const deckEl=document.getElementById('deck');
if(deckEl){
  const deckInner=deckEl.querySelector('.deck-inner');
  const deckStack=deckEl.querySelector('.deck-stack');
  const deckDotsWrap=deckEl.querySelector('.deck-dots');
  const DN=4;                                   // cantidad de cards del deck
  const reduceMotion=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  const deckData=projects.slice(0,DN);
  let deckActive=0, deckHover=false, deckTimer=null, deckTilt={x:0,y:0};

  /* Arma las 4 cards (mismo markup que el carrusel: portada + scrim +
     eyebrow + título) y un dot por card. */
  const deckCards=deckData.map((p,i)=>{
    const eyebrow_en=p.eyebrow_en||p.role_en, eyebrow_es=p.eyebrow_es||p.role_es;
    const card=document.createElement('div'); card.className='cf-card deck-card';
    card.innerHTML=`<div class="cf-cover"${p.cover?` style="background-image:url('${p.cover}');background-position:${p.coverPos||'top center'};"`:''}></div>
      <div class="cf-scrim"></div>
      <div class="cf-content">
        <div class="cf-eyebrow" data-en="${eyebrow_en}" data-es="${eyebrow_es}">${eyebrow_en}</div>
        <div class="cf-name">${p.title}</div>
      </div>`;
    deckInner.appendChild(card);
    const dot=document.createElement('button'); dot.className='dot'; dot.type='button'; dot.tabIndex=-1;
    dot.addEventListener('click',e=>{ e.stopPropagation(); deckActive=i; renderDeck(); playDeck(); });
    deckDotsWrap.appendChild(dot);
    return card;
  });
  const deckDots=[...deckDotsWrap.children];

  /* Profundidad d desde el frente → transform. Front card (d=0) centrada;
     cada paso hacia atrás: +42px derecha, +8px abajo, −6% escala, +5° giro. */
  function renderDeck(){
    deckCards.forEach((card,i)=>{
      const d=(i-deckActive+DN)%DN;
      card.style.transform=`translate(-50%,-50%) translateX(${d*42}px) translateY(${d*8}px) rotate(${d*5}deg) scale(${1-d*0.06})`;
      card.style.zIndex=String(DN-d);
      card.style.opacity=d>=3?'0':String(1-d*0.16);   // la 4ta (atrás del todo) se esconde
      card.style.pointerEvents=d>=3?'none':'auto';
    });
    deckDots.forEach((dot,i)=>dot.classList.toggle('active',i===deckActive));
  }
  /* Autoavanza cada ~3.2s; se pausa con el mouse encima (deckHover). Con
     "reduce motion" no autoavanza (queda estática). */
  function playDeck(){ stopDeck(); if(reduceMotion) return;
    deckTimer=setInterval(()=>{ if(!deckHover){ deckActive=(deckActive+1)%DN; renderDeck(); } },3200); }
  function stopDeck(){ if(deckTimer){ clearInterval(deckTimer); deckTimer=null; } }

  /* Tilt de parallax con el cursor: va sobre el wrapper (.deck-inner), no
     sobre las cards, para no pelear con la matemática del abanico. */
  function applyTilt(){ deckInner.style.transform=`rotateX(${-deckTilt.y*6}deg) rotateY(${deckTilt.x*9}deg)`; }
  deckStack.addEventListener('mousemove',e=>{
    if(reduceMotion) return;
    const r=deckStack.getBoundingClientRect();
    deckTilt={ x:(e.clientX-r.left)/r.width-0.5, y:(e.clientY-r.top)/r.height-0.5 };
    applyTilt();
  });
  deckStack.addEventListener('mouseenter',()=>{ deckHover=true; });
  deckStack.addEventListener('mouseleave',()=>{ deckHover=false; deckTilt={x:0,y:0}; applyTilt(); });
  /* Click en una card: si es la de adelante, abre su case study (bottom
     sheet). Si es una de atrás (las que asoman), la trae al frente —igual
     que el carrusel. Click fuera de las cards: baraja +1. */
  deckStack.addEventListener('click',e=>{
    const cardEl=e.target.closest('.deck-card');
    const i=cardEl?deckCards.indexOf(cardEl):-1;
    if(i===-1){ deckActive=(deckActive+1)%DN; renderDeck(); playDeck(); return; }
    if(i===deckActive){ openSheet(i); return; }        // la de adelante → abre su bottom sheet
    deckActive=i; renderDeck(); playDeck();             // una de atrás → la trae al frente
  });

  renderDeck();
  playDeck();
}

/* ---------- Bottom sheet (case study de un proyecto) ----------
   El .sheet mide SIEMPRE 100vh — nunca se resizea mientras se scrollea
   adentro (eso rompía el scroll: cambiar `height` en cada evento hacía
   que el navegador recalculara el contenedor scrolleable a mitad de
   gesto y "saltara"). En cambio el efecto peek→fullscreen se logra
   corriendo el .sheet entero con translateY (setSheetY), que no toca el
   layout interno para nada — el scroll de adentro queda intacto.
   A los 80px de scroll queda completamente expandido: pierde el
   border-radius, tapa toda la pantalla, y el ícono de la esquina pasa de
   "cerrar" (X) a "colapsar" (flecha abajo). Tocar ese ícono estando
   expandido colapsa el sheet de nuevo a su tamaño de "peek"; tocarlo ya
   colapsado lo cierra del todo. */
const EXPAND_DIST=80; // px de scroll para llegar a fullscreen
const PEEK_VH=10; // hueco arriba (vh) que deja ver el fondo, en estado "peek"
const sheet=document.getElementById('sheet'), backdrop=document.getElementById('backdrop');
const sheetScroll=document.getElementById('sheetScroll'), closeBtn=document.getElementById('closeSheet');
const scrollHint=document.getElementById('scrollHint');
const csGeneric=document.getElementById('csGeneric');
const csCustomBlocks=[...document.querySelectorAll('.cs-custom')];
let ignoreScroll=false; // true mientras reseteamos scrollTop a mano, para no pisar la animación

/* Proyectos con case study propio (content.js: campo caseStudyEl) muestran
   su bloque a medida en vez de la plantilla genérica de placeholders. */
function renderSheetText(){
  const p=projects[current];
  csCustomBlocks.forEach(el=>{ el.hidden=(el.id!==p.caseStudyEl); });
  csGeneric.hidden=!!p.caseStudyEl;
  if(p.caseStudyEl) return;
  document.getElementById('sheetRole').textContent=lang==='es'?p.role_es:p.role_en;
  document.getElementById('sheetTitle').textContent=p.title;
  document.getElementById('sheetStatement').textContent=lang==='es'?p.desc_es:p.desc_en;
}
function updateCloseLabel(){
  closeBtn.setAttribute('aria-label', lang==='es'?'cerrar':'close');
}
/* animate=true: transición suave (abrir/cerrar/colapsar, gestos discretos,
   clase .animating prende la transición del transform — ver CSS).
   animate=false: sin transición, para que el translateY siga el scroll
   1:1 sin lag. El border-radius nunca se toca acá: lo maneja solo el CSS
   vía la clase .expanded, independiente de esto. */
function setSheetY(vh,animate){
  sheet.classList.toggle('animating',animate);
  /* translate3d (no translateY) para mantener el sheet en su capa de GPU
     propia y que el compositor no lo suelte un frame — ver CSS .sheet. */
  sheet.style.transform=`translate3d(0,${vh}vh,0)`;
}
function resetSheetShape(){
  scrollHint.style.opacity='1';
  sheet.classList.remove('expanded');
}
function resetScrollPosition(){
  ignoreScroll=true;
  sheetScroll.scrollTop=0;
  requestAnimationFrame(()=>{ ignoreScroll=false; });
}
/* El scroll actualiza la posición del sheet a lo sumo una vez por frame
   (requestAnimationFrame), no en cada evento crudo de scroll. El "blur del
   fondo" ya no depende de esto: es estático vía `body.sheet-open .wrap`
   (ver CSS), así que scrollear no recalcula ningún blur. */
let scrollTicking=false;
function onSheetScroll(){
  if(ignoreScroll) return;
  if(scrollTicking) return;
  scrollTicking=true;
  requestAnimationFrame(applyScrollProgress);
}
function applyScrollProgress(){
  scrollTicking=false;
  const p=Math.max(0, Math.min(1, sheetScroll.scrollTop/EXPAND_DIST));
  setSheetY(PEEK_VH*(1-p), false);
  scrollHint.style.opacity=String(1-p);
  const expanded=p>=1;
  if(expanded!==sheet.classList.contains('expanded')){
    sheet.classList.toggle('expanded',expanded);
    updateCloseLabel();
  }
}
function openSheet(i){
  current=i; render();
  renderSheetText();
  sheetOpen=true; stop();
  resetSheetShape();
  resetScrollPosition();
  /* Blureamos el fondo ANTES de deslizar el sheet, así el blur ya está
     aplicado y estático cuando arranca la animación (no compiten). */
  document.body.classList.add('sheet-open'); document.body.style.overflow='hidden';
  setSheetY(PEEK_VH,true);
  backdrop.classList.add('open');
  updateCloseLabel();
}
function closeSheet(){
  if(!sheetOpen) return;
  sheetOpen=false;
  setSheetY(101,true);
  resetSheetShape();
  backdrop.classList.remove('open'); document.body.classList.remove('sheet-open'); document.body.style.overflow=''; play();
}
/* El botón de la esquina SIEMPRE cierra el sheet (esté en peek o
   expandido). */
closeBtn.addEventListener('click',closeSheet);
backdrop.addEventListener('click',closeSheet);
sheetScroll.addEventListener('scroll',onSheetScroll);

/* Pie del case study: volver arriba / siguiente proyecto. */
document.getElementById('footerTopBtn').addEventListener('click',()=>{
  sheetScroll.scrollTo({ top:0, behavior:'smooth' });
});
document.getElementById('footerNextBtn').addEventListener('click',()=>{
  openSheet((current+1)%projects.length);
});

/* ---------- Recommendations (testimonios) ----------
   Construye las tarjetas desde `recommendations` (content.js).
   Cada quote se recorta a 4 líneas por CSS; el botón "Read more"
   sólo aparece cuando el texto realmente se pasa de largo. */
const recosGrid=document.getElementById('recosGrid');
let refreshRecoButtons=()=>{};
if(recosGrid && typeof recommendations!=='undefined'){
  recommendations.forEach(r=>{
    const fig=document.createElement('figure'); fig.className='reco-card';
    fig.innerHTML=`<span class="reco-quote-mark" aria-hidden="true">“</span>
      <blockquote class="reco-quote" data-en="${r.quote_en}" data-es="${r.quote_es}">${r.quote_en}</blockquote>
      <button class="reco-more" type="button"></button>
      <figcaption class="reco-cite">
        <span class="reco-name">${r.name}</span>
        <span class="reco-role" data-en="${r.role_en}" data-es="${r.role_es}">${r.role_en}</span>
      </figcaption>`;
    recosGrid.appendChild(fig);
  });
  const recoCards=[...recosGrid.querySelectorAll('.reco-card')];
  const recoTxt={ more_en:'Read more', more_es:'Leer más', less_en:'Read less', less_es:'Leer menos' };
  refreshRecoButtons=function(){
    recoCards.forEach(card=>{
      const q=card.querySelector('.reco-quote'), btn=card.querySelector('.reco-more');
      const expanded=card.classList.contains('expanded');
      const overflowing=expanded || q.scrollHeight > q.clientHeight+2;
      btn.style.display=overflowing?'':'none';
      btn.textContent=expanded?recoTxt['less_'+lang]:recoTxt['more_'+lang];
    });
  };
  recoCards.forEach(card=>{
    card.querySelector('.reco-more').addEventListener('click',()=>{ card.classList.toggle('expanded'); refreshRecoButtons(); });
  });
  window.addEventListener('resize',refreshRecoButtons);
  refreshRecoButtons();
}

/* ---------- Navegación en la misma página + menú mobile ---------- */
const navLinks=document.getElementById('navLinks');
const navToggle=document.getElementById('navToggle');
function closeMenu(){ navLinks.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); }
navToggle.addEventListener('click',()=>{
  const open=navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open?'true':'false');
});
/* Cualquier anchor interno cierra el menú; el href #seccion hace el
   scroll suave nativo (scroll-behavior:smooth + scroll-margin-top). */
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',closeMenu));
/* Tocar fuera del menú abierto lo cierra. */
document.addEventListener('click',e=>{
  if(!navToggle.contains(e.target) && !navLinks.contains(e.target)) closeMenu();
});

/* ---------- Scrollspy: marca la sección activa en el topbar ---------- */
const sections=['home','journey','projects','recos','contact'].map(id=>document.getElementById(id)).filter(Boolean);
const spy=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const id=e.target.id;
    document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('on', a.dataset.nav===id));
  });
},{rootMargin:'-45% 0px -50% 0px', threshold:0});
sections.forEach(s=>spy.observe(s));

/* ---------- Fondo del nav: sólo aparece al scrollear por debajo de Home ---------- */
const navEl=document.getElementById('top'), journeySection=document.getElementById('journey');
if(navEl && journeySection){
  new IntersectionObserver(entries=>{
    entries.forEach(e=>{ navEl.classList.toggle('solid', e.isIntersecting); });
  },{rootMargin:'0px 0px -100% 0px', threshold:0}).observe(journeySection);
}

/* ---------- Idioma ---------- */
document.querySelectorAll('.lang button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    lang=btn.dataset.lang;
    document.querySelectorAll('.lang button').forEach(b=>b.classList.toggle('active',b===btn));
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-en]').forEach(el=>{ el.innerHTML=el.dataset[lang]; });
    refreshRecoButtons();
    if(sheetOpen){ renderSheetText(); updateCloseLabel(); }
  });
});

window.addEventListener('resize',render);
render();   // prime the carousel (autoplay stays paused until #projects is in view)
