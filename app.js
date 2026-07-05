/* ============================================================
   COMPORTAMIENTO DEL SITIO (carrusel, navegación, idioma)
   ============================================================
   Esto casi nunca se toca. La lógica de cómo funciona el sitio.
   El contenido editable (proyectos) está en content.js.
   Los textos de la home (hero, timeline, contacto) están en
   index.html con atributos data-en / data-es.

   NOTA: este archivo usa la variable `projects`, que se define en
   content.js. Por eso en index.html content.js se carga ANTES que app.js.
   ============================================================ */

let lang='en', current=0, sheetOpen=false, timer=null, dragged=false, startX=null;

const viewHome=document.getElementById('view-home');
const viewProjects=document.getElementById('view-projects');
function showView(v, anchor){
  const onProjects = v==='projects';
  viewProjects.hidden = !onProjects;
  viewHome.hidden = onProjects;
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('on', a.dataset.nav===v));
  if(onProjects){ render(); play(); } else { stop(); }
  if(anchor){ const el=document.getElementById(anchor); if(el){ setTimeout(()=>el.scrollIntoView({behavior:'smooth'}),20); return; } }
  window.scrollTo({top:0, behavior:'auto'});
}
document.querySelectorAll('[data-nav]').forEach(el=>{
  el.addEventListener('click',e=>{
    e.preventDefault();
    const t=el.dataset.nav;
    if(t==='projects') showView('projects');
    else if(t==='journey') showView('home','journey');
    else if(t==='contact') showView('home','contact');
    else showView('home');
  });
});

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
function play(){ stop(); if(!sheetOpen && !viewProjects.hidden) timer=setInterval(()=>{ current=(current+1)%n; render(); },2200); }
function stop(){ if(timer){ clearInterval(timer); timer=null; } }
stage.addEventListener('mouseenter',stop);
stage.addEventListener('mouseleave',()=>{ if(!sheetOpen) play(); });

window.addEventListener('keydown',e=>{
  if(viewProjects.hidden) return;
  if(e.key==='ArrowLeft'){current=(current-1+n)%n;render();play();}
  if(e.key==='ArrowRight'){current=(current+1)%n;render();play();}
  if(e.key==='Escape') closeSheet();
});
stage.addEventListener('pointerdown',e=>{ startX=e.clientX; dragged=false; });
stage.addEventListener('pointermove',e=>{ if(startX!==null && Math.abs(e.clientX-startX)>8) dragged=true; });
window.addEventListener('pointerup',e=>{
  if(startX===null) return;
  const dx=e.clientX-startX;
  if(dx>60){ current=(current-1+n)%n; render(); play(); }
  else if(dx<-60){ current=(current+1)%n; render(); play(); }
  startX=null; setTimeout(()=>{ dragged=false; },0);
});

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
render();   // prime the carousel (stays paused until the projects view is shown)
