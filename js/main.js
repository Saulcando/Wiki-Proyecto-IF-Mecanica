// ---------- Theme toggle ----------
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
function setTheme(t){
  root.setAttribute('data-theme', t);
  localStorage.setItem && (window.__theme = t);
  themeToggle.textContent = t === 'dark' ? '☀' : '◐';
}
setTheme('light');
themeToggle.addEventListener('click', ()=>{
  const cur = root.getAttribute('data-theme');
  setTheme(cur === 'dark' ? 'light' : 'dark');
});

// ---------- Mobile sidebar ----------
const sidebar = document.getElementById('sidebar');
document.getElementById('menuToggle').addEventListener('click', ()=> sidebar.classList.toggle('open'));
sidebar.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> sidebar.classList.remove('open')));

// ---------- Reading progress ----------
const progress = document.getElementById('progress');
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progress.style.width = scrolled + '%';
  document.getElementById('backTop').classList.toggle('show', h.scrollTop > 500);
});

// ---------- Back to top ----------
document.getElementById('backTop').addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// ---------- Active link on scroll ----------
const sections = document.querySelectorAll('section.module, section.hero');
const navlinks = document.querySelectorAll('#sidebar a.navlink');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      navlinks.forEach(l=> l.classList.remove('active'));
      const id = e.target.id;
      const link = document.querySelector('#sidebar a[href="#'+id+'"]');
      if(link) link.classList.add('active');
    }
  });
}, {rootMargin:'-40% 0px -50% 0px'});
sections.forEach(s=> obs.observe(s));

// ---------- Reveal on scroll ----------
const revealObs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); revealObs.unobserve(e.target);} });
}, {threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=> revealObs.observe(el));

// ---------- Simple search ----------
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e)=>{
  const q = e.target.value.trim().toLowerCase();
  if(!q){ navlinks.forEach(l=> l.style.display='block'); return; }
  navlinks.forEach(l=>{
    const text = l.textContent.toLowerCase();
    l.style.display = text.includes(q) ? 'block' : 'none';
  });
});

// ---------- Doppler hero animation (SVG) ----------
(function(){
  const svg = document.getElementById('dopplerViz');
  const ns = 'http://www.w3.org/2000/svg';
  const W = 800, H = 220, midY = 110;
  svg.setAttribute('viewBox', '0 0 '+W+' '+H);

  const observerX = 700;
  const obsG = document.createElementNS(ns,'g');
  const obsCircle = document.createElementNS(ns,'circle');
  obsCircle.setAttribute('cx', observerX); obsCircle.setAttribute('cy', midY); obsCircle.setAttribute('r', 6);
  obsCircle.setAttribute('fill', 'var(--purple)');
  obsG.appendChild(obsCircle);
  const obsLabel = document.createElementNS(ns,'text');
  obsLabel.setAttribute('x', observerX); obsLabel.setAttribute('y', midY+28);
  obsLabel.setAttribute('text-anchor','middle'); obsLabel.setAttribute('font-size','11');
  obsLabel.setAttribute('fill','var(--gray-mid)'); obsLabel.textContent='observador';
  obsG.appendChild(obsLabel);
  svg.appendChild(obsG);

  const source = document.createElementNS(ns,'circle');
  source.setAttribute('cy', midY); source.setAttribute('r', 7);
  source.setAttribute('fill', 'var(--accent)');
  svg.appendChild(source);
  const srcLabel = document.createElementNS(ns,'text');
  srcLabel.setAttribute('y', midY-16);
  srcLabel.setAttribute('text-anchor','middle'); srcLabel.setAttribute('font-size','11');
  srcLabel.setAttribute('fill','var(--gray-mid)'); srcLabel.textContent='fuente';
  svg.appendChild(srcLabel);

  let waves = [];
  let t = 0;
  const speed = 1.6;
  const sourceSpeed = 0.55;
  let sourceX = 60;

  function spawnWave(x){
    const circle = document.createElementNS(ns,'circle');
    circle.setAttribute('cy', midY);
    circle.setAttribute('r', 2);
    circle.setAttribute('fill','none');
    circle.setAttribute('stroke','var(--blue)');
    circle.setAttribute('stroke-width','1.5');
    circle.setAttribute('opacity','0.55');
    svg.insertBefore(circle, source);
    waves.push({el:circle, x:x, r:2});
  }

  let frame = 0;
  function tick(){
    frame++;
    sourceX += sourceSpeed;
    if(sourceX > observerX - 40) sourceX = 60;
    source.setAttribute('cx', sourceX);
    srcLabel.setAttribute('x', sourceX);

    if(frame % 22 === 0) spawnWave(sourceX);

    waves.forEach(w=>{
      w.r += speed;
      w.el.setAttribute('r', w.r);
      w.el.setAttribute('cx', w.x);
      const opacity = Math.max(0, 0.55 - w.r/260);
      w.el.setAttribute('opacity', opacity);
    });
    waves = waves.filter(w=>{
      if(w.r > 260){ w.el.remove(); return false; }
      return true;
    });
    requestAnimationFrame(tick);
  }
  tick();
})();

// ---------- Doppler detail diagram (static illustrative) ----------
(function(){
  const svg = document.getElementById('dopplerDetail');
  const ns = 'http://www.w3.org/2000/svg';
  svg.setAttribute('viewBox','0 0 760 200');
  const midY = 100;
  const cx = 300;
  const radii = [20,45,70,95,120];
  radii.forEach((r,i)=>{
    const c = document.createElementNS(ns,'circle');
    c.setAttribute('cx', cx - i*14);
    c.setAttribute('cy', midY);
    c.setAttribute('r', r);
    c.setAttribute('fill','none');
    c.setAttribute('stroke','var(--accent)');
    c.setAttribute('stroke-width','1.5');
    c.setAttribute('opacity', 0.75 - i*0.12);
    svg.appendChild(c);
  });
  const src = document.createElementNS(ns,'circle');
  src.setAttribute('cx', cx); src.setAttribute('cy', midY); src.setAttribute('r', 6);
  src.setAttribute('fill','var(--purple)');
  svg.appendChild(src);

  const arrow = document.createElementNS(ns,'line');
  arrow.setAttribute('x1', cx); arrow.setAttribute('y1', midY);
  arrow.setAttribute('x2', cx+70); arrow.setAttribute('y2', midY);
  arrow.setAttribute('stroke','var(--purple)'); arrow.setAttribute('stroke-width','2');
  arrow.setAttribute('marker-end','url(#arrowhead)');
  svg.appendChild(arrow);

  const defs = document.createElementNS(ns,'defs');
  defs.innerHTML = '<marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="var(--purple)"/></marker>';
  svg.insertBefore(defs, svg.firstChild);

  const labelLeft = document.createElementNS(ns,'text');
  labelLeft.setAttribute('x', cx-140); labelLeft.setAttribute('y', midY-100);
  labelLeft.setAttribute('font-size','12'); labelLeft.setAttribute('fill','var(--gray-mid)');
  labelLeft.textContent = 'ondas comprimidas (f\' > f)';
  svg.appendChild(labelLeft);

  const labelRight = document.createElementNS(ns,'text');
  labelRight.setAttribute('x', cx+30); labelRight.setAttribute('y', midY-100);
  labelRight.setAttribute('font-size','12'); labelRight.setAttribute('fill','var(--gray-mid)');
  labelRight.textContent = 'ondas espaciadas (f\' < f)';
  svg.appendChild(labelRight);
})();
// ---------- Efecto Máquina de Escribir ----------
const text = "Universidad Nacional de Chimborazo";
const typingText = document.getElementById("typing-text");

let index = 0;

function typeWriter() {

    if(index < text.length){
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 80);
    }

}

typeWriter();