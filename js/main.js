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
      closeAllDropdowns();
    });
  }

  // Mobile dropdown accordion — capture-phase delegated handler so nothing
  // else can intercept the click. On any viewport, tap toggles; on desktop,
  // hover via CSS still works (clicking just pins the panel open).
  function isMobileViewport() { return window.innerWidth <= 900; }
  function closeAllDropdowns() {
    document.querySelectorAll('.nav-has-dropdown').forEach(function (parent) {
      parent.removeAttribute('data-open');
      var t = parent.querySelector('.nav-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  function handleTriggerClick(e) {
    var path = e.composedPath ? e.composedPath() : [];
    var trigger = null;
    if (e.target && e.target.closest) trigger = e.target.closest('.nav-trigger');
    if (!trigger) {
      for (var i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains('nav-trigger')) {
          trigger = path[i]; break;
        }
      }
    }
    if (!trigger) return;
    if (!isMobileViewport()) return; // desktop: let the link navigate normally
    e.preventDefault();
    e.stopPropagation();
    var parent = trigger.closest('.nav-has-dropdown');
    if (!parent) return;
    var isOpen = parent.getAttribute('data-open') === 'true';
    if (!isOpen) {
      document.querySelectorAll('.nav-has-dropdown[data-open="true"]').forEach(function (p) {
        if (p !== parent) {
          p.removeAttribute('data-open');
          var t = p.querySelector('.nav-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
    }
    parent.setAttribute('data-open', String(!isOpen));
    trigger.setAttribute('aria-expanded', String(!isOpen));
  }

  // Capture-phase so we run before any other click listener, on both touch + click events.
  document.addEventListener('click', handleTriggerClick, true);

  // Reset on resize from mobile → desktop so the menu doesn't get stuck open.
  window.addEventListener('resize', function () {
    if (!isMobileViewport()) closeAllDropdowns();
  });

  // Founder photo carousel — fade between slides, autoplay 3s.
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var slides = root.querySelectorAll('.founder-carousel__slide');
    var dots = root.querySelectorAll('.founder-carousel__dot');
    var prev = root.querySelector('.founder-carousel__nav--prev');
    var next = root.querySelector('.founder-carousel__nav--next');
    if (!slides.length) return;

    var index = 0;
    var timer = null;
    var INTERVAL = 3000;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (slide, n) {
        var active = n === index;
        slide.classList.toggle('is-active', active);
        if (n === 0) return;
        if (active) { slide.removeAttribute('aria-hidden'); }
        else { slide.setAttribute('aria-hidden', 'true'); }
      });
      dots.forEach(function (dot, n) {
        var active = n === index;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-selected', active ? 'true' : 'false');
      });
    }

    function start() {
      if (reduceMotion || timer) return;
      timer = setInterval(function () { show(index + 1); }, INTERVAL);
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function restart() { stop(); start(); }

    if (prev) prev.addEventListener('click', function () { show(index - 1); restart(); });
    if (next) next.addEventListener('click', function () { show(index + 1); restart(); });
    dots.forEach(function (dot, n) {
      dot.addEventListener('click', function () { show(n); restart(); });
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    start();
  });
})();
