/* Clínica Urgenterap – comportamiento de las páginas */
(function () {
  'use strict';

  // Menú móvil accesible
  document.querySelectorAll('.nav-toggle').forEach(function (toggle) {
    var menu = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!menu) return;
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  });

  // Carrusel de profesionales: botones, desplazamiento automático y pausa
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var section = root.closest('section') || document;
    var track = root.querySelector('.carousel__track');
    var prev = section.querySelector('[data-carousel-prev]');
    var next = section.querySelector('[data-carousel-next]');
    var toggle = section.querySelector('[data-carousel-toggle]');
    if (!track || !prev || !next) return;

    var AUTO_MS = 4500;     // tiempo entre desplazamientos
    var RESUME_MS = 8000;   // espera tras una interacción del usuario
    var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var userPaused = reduce; // con "reducir movimiento" arranca en pausa
    var hovering = false, focused = false, inView = true, quietUntil = 0;

    var step = function () {
      var item = track.querySelector('.carousel__item');
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return item ? item.getBoundingClientRect().width + gap : track.clientWidth;
    };
    var update = function () {
      var max = track.scrollWidth - track.clientWidth - 1;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max;
    };
    var move = function (dir) {
      var visible = Math.max(1, Math.floor(track.clientWidth / step()));
      track.scrollBy({ left: dir * step() * visible, behavior: 'smooth' });
    };
    var touched = function () { quietUntil = Date.now() + RESUME_MS; };
    var render = function () {
      if (!toggle) return;
      toggle.setAttribute('data-playing', String(!userPaused));
      toggle.setAttribute('aria-label', userPaused ? 'Reanudar desplazamiento automático' : 'Pausar desplazamiento automático');
    };

    prev.addEventListener('click', function () { touched(); move(-1); });
    next.addEventListener('click', function () { touched(); move(1); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    if (toggle) {
      toggle.addEventListener('click', function () { userPaused = !userPaused; render(); });
    }
    render();
    section.addEventListener('mouseenter', function () { hovering = true; });
    section.addEventListener('mouseleave', function () { hovering = false; });
    section.addEventListener('focusin', function (e) {
      focused = !!(e.target.matches && e.target.matches(':focus-visible'));
    });
    section.addEventListener('focusout', function () { focused = false; });
    ['touchstart', 'wheel', 'keydown'].forEach(function (type) {
      root.addEventListener(type, touched, { passive: true });
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
      }, { threshold: 0.3 }).observe(root);
    }
    window.setInterval(function () {
      if (userPaused || hovering || focused || !inView || document.hidden || Date.now() < quietUntil) return;
      var max = track.scrollWidth - track.clientWidth - 1;
      if (track.scrollLeft >= max) track.scrollTo({ left: 0, behavior: 'smooth' });
      else track.scrollBy({ left: step(), behavior: 'smooth' });
    }, AUTO_MS);
  });

  // Año vigente en el pie
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Índice de páginas legales: marca la sección visible
  var tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = byId[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }
})();
