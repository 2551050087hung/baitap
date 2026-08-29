// src/hamburger.js
// Xử lý mở/đóng menu mobile khi bấm nút hamburger
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.hb-toggle');
  const menu = document.getElementById('nav-mobile');
  const overlay = document.querySelector('.hb-overlay');
  const body = document.body;

  if (!toggle || !menu) return; // không tìm thấy phần tử -> thoát an toàn

  function openMenu() {
    toggle.classList.add('is-open');
    menu.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    body.classList.add('hb-no-scroll');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Đóng menu');
  }

  function closeMenu() {
    toggle.classList.remove('is-open');
    menu.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    body.classList.remove('hb-no-scroll');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Mở menu');
  }

  function toggleMenu() {
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Bấm nút hamburger
  toggle.addEventListener('click', toggleMenu);

  // Bấm ra ngoài (overlay) để đóng menu
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Bấm vào 1 link trong menu thì tự đóng menu
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Nhấn phím Esc để đóng menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Nếu resize màn hình lên desktop thì tự đóng menu mobile
  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) closeMenu();
  });
});
