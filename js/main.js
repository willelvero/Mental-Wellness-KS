// [BRAND_NAME] — main script.
//
// This file is intentionally minimal — the starter does not ship interactions.
// Add the client's behavior here (mobile nav toggle, carousel, scroll reveal, etc.),
// then run `npm run build` to produce main.min.js (which the footer references).

(function () {
  'use strict';

  // Mobile nav open/close — wire up if the header markup is in use.
  var openBtn = document.getElementById('nav-open');
  var closeBtn = document.getElementById('nav-close');
  var nav = document.getElementById('primary-nav');

  if (openBtn && nav) {
    openBtn.addEventListener('click', function () {
      nav.classList.add('is-open');
      openBtn.setAttribute('aria-expanded', 'true');
    });
  }
  if (closeBtn && nav) {
    closeBtn.addEventListener('click', function () {
      nav.classList.remove('is-open');
      if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    });
  }
})();
