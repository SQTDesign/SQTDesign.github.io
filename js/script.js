(function () {
  'use strict';

  var STORAGE_KEY = 'underwall-theme';
  var SUN  = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>';
  var MOON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

  var navLinks    = document.getElementById('navLinks');
  var burger      = document.getElementById('burger');
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon   = document.getElementById('themeIcon');

  /* ---------- Тема ---------- */
  function applyTheme(mode) {
    document.documentElement.dataset.theme = mode;
    if (themeIcon) themeIcon.innerHTML = mode === 'dark' ? MOON : SUN;
    try { localStorage.setItem(STORAGE_KEY, mode); } catch (e) {}
  }

  function toggleTheme() {
    applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
  }

  var saved = 'light';
  try { saved = localStorage.getItem(STORAGE_KEY) || 'light'; } catch (e) {}
  applyTheme(saved);

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  /* ---------- Мобильное меню ---------- */
  function closeMenu() {
    if (navLinks) navLinks.classList.remove('is-open');
  }

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      navLinks.classList.toggle('is-open');
    });
  }

  // закрыть меню при переходе по ссылке / клике вне меню / Esc
  document.addEventListener('click', function (e) {
    if (!navLinks || !navLinks.classList.contains('is-open')) return;
    if (!navLinks.contains(e.target) && !(burger && burger.contains(e.target))) closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key == 'Escape') closeMenu();
  });
})();
