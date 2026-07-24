/* ============================================================
   TIAGO REIZ — PORTFOLIO
   Apple-inspired interactions · Vanilla JS
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

if (finePointer) document.documentElement.classList.add('fine-pointer');

/* ===== HERO LOAD ===== */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
// Fallback: garante que o hero aparece mesmo se 'load' demorar (fontes lentas)
setTimeout(() => document.body.classList.add('loaded'), 1200);

/* ===== SCROLL PROGRESS + HEADER (rAF-throttled) ===== */
const scrollProgress = document.getElementById('scroll-progress');
const header = document.getElementById('header');
let ticking = false;

function onScroll() {
  const scrolled = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.transform = `scaleX(${maxScroll > 0 ? scrolled / maxScroll : 0})`;
  header.classList.toggle('scrolled', scrolled > 24);
  updateStatement();
  updateParallax(scrolled);
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(onScroll);
  }
}, { passive: true });

/* ===== HERO PARALLAX (auroras) ===== */
const auroras = document.querySelectorAll('#inicio .aurora');
const heroContent = document.getElementById('hero-content');

function updateParallax(scrolled) {
  if (prefersReducedMotion) return;
  if (scrolled > window.innerHeight * 1.2) return;
  auroras.forEach((el, i) => {
    const speed = 0.12 + i * 0.07;
    el.style.translate = `0 ${scrolled * speed}px`;
  });
  if (heroContent) {
    heroContent.style.translate = `0 ${scrolled * 0.18}px`;
    heroContent.style.opacity = Math.max(0, 1 - scrolled / (window.innerHeight * 0.75));
  }
}

/* ===== CUSTOM CURSOR ===== */
if (finePointer && !prefersReducedMotion) {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mx = -100, my = -100, fx = -100, fy = -100;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  }, { passive: true });

  (function follow() {
    fx += (mx - fx) * 0.13;
    fy += (my - fy) * 0.13;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(follow);
  })();

  document.addEventListener('mouseover', (e) => {
    const interactive = e.target.closest('a, button, .chip, .tag');
    cursor.classList.toggle('expand', !!interactive);
    follower.classList.toggle('expand', !!interactive);
  }, { passive: true });
}

/* ===== ROTATING ROLE (blur crossfade) ===== */
const roles = [
  'Backend Engineer',
  'IA Generativa & RAG',
  'Java & Spring Boot',
  'Python & NestJS',
  'Sistemas Distribuídos',
  'Cloud & Kubernetes'
];
const roleEl = document.getElementById('role-rotator');
let roleIdx = 0;

if (roleEl && !prefersReducedMotion) {
  setInterval(() => {
    roleEl.classList.add('switching');
    setTimeout(() => {
      roleIdx = (roleIdx + 1) % roles.length;
      roleEl.textContent = roles[roleIdx];
      roleEl.classList.remove('switching');
    }, 420);
  }, 3000);
}

/* ===== ACTIVE NAV LINK ===== */
const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

document.querySelectorAll('section[id], footer[id]').forEach((s) => sectionObserver.observe(s));

/* ===== MOBILE MENU ===== */
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMenu(open) {
  menuBtn.classList.toggle('open', open);
  mobileMenu.classList.toggle('active', open);
  menuBtn.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
}

menuBtn.addEventListener('click', () => toggleMenu(!mobileMenu.classList.contains('active')));
document.querySelectorAll('.mobile-link').forEach((l) => l.addEventListener('click', () => toggleMenu(false)));

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ===== STATEMENT — scroll-lit words (efeito Apple) ===== */
const statementEl = document.getElementById('statement-text');
let stWords = [];

if (statementEl) {
  // Divide o texto em palavras preservando os destaques <em>
  const frag = document.createDocumentFragment();
  statementEl.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(' '));
        } else if (part) {
          const span = document.createElement('span');
          span.className = 'st-word';
          span.textContent = part;
          frag.appendChild(span);
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const span = document.createElement('span');
      span.className = 'st-word hl';
      span.textContent = node.textContent;
      frag.appendChild(span);
    }
  });
  statementEl.textContent = '';
  statementEl.appendChild(frag);
  stWords = statementEl.querySelectorAll('.st-word');
}

function updateStatement() {
  if (!stWords.length || prefersReducedMotion) return;
  const rect = statementEl.getBoundingClientRect();
  const vh = window.innerHeight;
  // progresso: 0 quando o texto entra, 1 quando chega a 35% do topo
  const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.55)));
  const litCount = Math.floor(progress * stWords.length);
  stWords.forEach((w, i) => w.classList.toggle('lit', i < litCount));
}

/* ===== COUNT-UP STATS ===== */
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const start = performance.now();

  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
    el.textContent = Math.round(eased * target).toLocaleString('pt-BR');
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (prefersReducedMotion) {
        entry.target.textContent = parseInt(entry.target.dataset.target, 10).toLocaleString('pt-BR');
      } else {
        animateCount(entry.target);
      }
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count').forEach((el) => countObserver.observe(el));

/* ===== LANGUAGE BARS ===== */
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.lang-bar').forEach((bar) => {
        bar.style.width = bar.dataset.level + '%';
      });
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.lang-rows').forEach((el) => langObserver.observe(el));

/* ===== SPOTLIGHT (mouse-tracking highlight) ===== */
if (finePointer) {
  document.querySelectorAll('.spotlight').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }, { passive: true });
  });
}

/* ===== 3D TILT ===== */
if (finePointer && !prefersReducedMotion) {
  document.querySelectorAll('.tilt').forEach((card) => {
    let raf = null;

    card.addEventListener('mousemove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          `perspective(900px) rotateX(${py * -4.5}deg) rotateY(${px * 4.5}deg) translateY(-6px)`;
        raf = null;
      });
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ===== MAGNETIC BUTTONS ===== */
if (finePointer && !prefersReducedMotion) {
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.34;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ===== INIT ===== */
onScroll();
