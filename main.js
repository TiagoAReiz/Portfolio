/* ============================================================
   TIAGO REIZ — PORTFOLIO SCRIPTS
   ============================================================ */

/* ===== SCROLL PROGRESS ===== */
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrolled  = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${(scrolled / maxScroll) * 100}%`;
}, { passive: true });

/* ===== CUSTOM CURSOR ===== */
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
}, { passive: true });

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

document.addEventListener('mouseleave', () => {
  cursor.style.opacity         = '0';
  cursorFollower.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity         = '1';
  cursorFollower.style.opacity = '0.4';
});

// Expand cursor on interactive elements
document.querySelectorAll('a, button, .skill-chip, .soft-chip, .badge, .tec').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-expand');
    cursorFollower.classList.add('follower-expand');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-expand');
    cursorFollower.classList.remove('follower-expand');
  });
});

/* ===== HEADER SCROLL ===== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ===== ACTIVE NAV LINK ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ===== MOBILE MENU ===== */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu    = document.getElementById('mobile-menu');
const mobileClose   = document.getElementById('mobile-close');
const mobileOverlay = document.getElementById('mobile-overlay');

function openMenu() {
  mobileMenu.classList.add('active');
  mobileOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('active');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // fire once
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ===== LANGUAGE BARS ===== */
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.lang-bar').forEach(bar => {
        setTimeout(() => {
          bar.style.width = bar.getAttribute('data-level') + '%';
        }, 300);
      });
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const curriculoEl = document.getElementById('curriculo');
if (curriculoEl) langObserver.observe(curriculoEl);

/* ===== HERO ANIMATION ON LOAD ===== */
window.addEventListener('load', () => {
  const heroItems = document.querySelectorAll('#hero-content .reveal-up');
  heroItems.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 140 + 200);
  });
});

/* ===== SMOOTH HOVER TILT ON PROJECT CARDS ===== */
document.querySelectorAll('.projeto').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -5;
    const rotateY = ((x - cx) / cx) * 5;
    card.style.transform = `translateY(-10px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
