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
  c.innerHTML=`<div class="cover"><span data-en="cover →" data-es="portada →">cover →</span></div>
    <div class="cbody"><div class="ctitle">${p.title}</div><div class="crole" data-en="${p.role_en}" data-es="${p.role_es}">${p.role_en}</div></div>`;
  c.addEventListener('click',()=>{ if(!dragged) openSheet(i); });
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
/* Autoavanza al entrar en la sección: cada card queda centrada ~1s
   antes de pasar a la siguiente. */
function play(){ stop(); if(!sheetOpen && projectsInView) timer=setInterval(()=>{ current=(current+1)%n; render(); },1000); }
function stop(){ if(timer){ clearInterval(timer); timer=null; } }
stage.addEventListener('mouseenter',stop);
stage.addEventListener('mouseleave',()=>{ if(!sheetOpen) play(); });

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

/* ---------- Bottom sheet (detalle de proyecto) ---------- */
const sheet=document.getElementById('sheet'), backdrop=document.getElementById('backdrop');
function openSheet(i){
  current=i; render();
  const p=projects[i];
  document.getElementById('sheetRole').textContent=lang==='es'?p.role_es:p.role_en;
  document.getElementById('sheetTitle').textContent=p.title;
  document.getElementById('sheetDesc').textContent=lang==='es'?p.desc_es:p.desc_en;
  const ph=document.getElementById('sheetPhotos'); ph.innerHTML='';
  for(let k=0;k<4;k++){ const d=document.createElement('div'); d.className='photo'; d.textContent=lang==='es'?'foto':'photo'; ph.appendChild(d); }
  sheetOpen=true; stop();
  sheet.classList.add('open'); backdrop.classList.add('open'); document.body.style.overflow='hidden';
}
function closeSheet(){
  if(!sheetOpen) return;
  sheetOpen=false; sheet.classList.remove('open'); backdrop.classList.remove('open'); document.body.style.overflow=''; play();
}
document.getElementById('closeSheet').addEventListener('click',closeSheet);
backdrop.addEventListener('click',closeSheet);

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
const sections=['home','journey','projects','contact'].map(id=>document.getElementById(id)).filter(Boolean);
const spy=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const id=e.target.id;
    document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('on', a.dataset.nav===id));
  });
},{rootMargin:'-45% 0px -50% 0px', threshold:0});
sections.forEach(s=>spy.observe(s));

/* ---------- Idioma ---------- */
document.querySelectorAll('.lang button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    lang=btn.dataset.lang;
    document.querySelectorAll('.lang button').forEach(b=>b.classList.toggle('active',b===btn));
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-en]').forEach(el=>{ el.innerHTML=el.dataset[lang]; });
    if(sheetOpen) openSheet(current);
  });
});

window.addEventListener('resize',render);
render();   // prime the carousel (autoplay stays paused until #projects is in view)
