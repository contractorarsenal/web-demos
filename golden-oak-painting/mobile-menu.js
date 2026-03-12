function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  if (!menu) return;
  const isOpen = menu.classList.contains('open');
  menu.classList.toggle('open', !isOpen);
  if (btn) {
    const spans = btn.querySelectorAll('span');
    if (!isOpen) {
      spans[0].style.cssText = 'transform: rotate(45deg) translate(5px, 5px)';
      spans[1].style.cssText = 'opacity: 0';
      spans[2].style.cssText = 'transform: rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  }
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  if (menu) menu.classList.remove('open');
  if (btn) btn.querySelectorAll('span').forEach(s => s.style.cssText = '');
}

// Close on outside click
document.addEventListener('click', e => {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  if (menu && menu.classList.contains('open')) {
    if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      closeMobileMenu();
    }
  }
});
