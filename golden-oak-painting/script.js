/* ─── SCROLL PROGRESS BAR ─── */
const progressBar = document.getElementById('progressBar');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';

  if (scrollTop) {
    scrollTop.classList.toggle('visible', scrolled > 400);
  }
});

/* ─── HERO SLIDESHOW ─── */
const heroSlides = document.getElementById('heroSlides');
const slideImages = [
  'https://github.com/user-attachments/assets/9448c781-0e2a-4d36-890d-22407d05c403',
  'https://github.com/user-attachments/assets/d16e6cbf-762d-46e4-8ebe-38a9ed447080',
  'https://github.com/user-attachments/assets/ff16b922-01e4-4437-a306-063b3b084278',
  'https://github.com/user-attachments/assets/ce7e3dfd-44c2-42c7-9e99-6e33efa50797',
];

if (heroSlides) {
  const overlay = document.createElement('div');
  overlay.className = 'hero-overlay';

  slideImages.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
    slide.style.backgroundImage = `url(${src})`;
    heroSlides.appendChild(slide);
  });

  heroSlides.parentElement.insertBefore(overlay, heroSlides.nextSibling);

  let current = 0;
  setInterval(() => {
    const slides = heroSlides.querySelectorAll('.hero-slide');
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000);
}

/* ─── TYPEWRITER ─── */
const twText = document.getElementById('twText');
const phrases = [
  'Painting.',
  'A Fresh Start.',
  'Color Done Right.',
  'Lasting Results.',
  'The Careful Touch.',
];

if (twText) {
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let paused = false;

  function typeWriter() {
    const phrase = phrases[phraseIdx];
    if (paused) { paused = false; setTimeout(typeWriter, 1200); return; }

    if (!deleting) {
      twText.textContent = phrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) { deleting = true; paused = true; }
      setTimeout(typeWriter, 85);
    } else {
      twText.textContent = phrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        paused = true;
      }
      setTimeout(typeWriter, 45);
    }
  }

  typeWriter();
}

/* ─── REVEAL ON SCROLL ─── */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

/* ─── QUICKSTART CARD HOVER ─── */
document.querySelectorAll('.qs-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    document.querySelectorAll('.qs-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

/* ─── FAQ TOGGLE ─── */
function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ─── LIGHTBOX ─── */
function openLightbox(src, caption) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  const cap = document.getElementById('lbCap');
  if (!lb || !img) return;
  img.src = src;
  img.alt = caption || '';
  if (cap) cap.textContent = caption || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
