/**
 * Shared motion behaviours: scroll-reveal fade-ins for class="reveal", and
 * count-up animation for [data-count-to]. Fails SAFE — content only ever
 * gets hidden by JS immediately before an observer is attached to the real,
 * final element, never by CSS alone. This page's "x-dc" runtime re-renders
 * the DOM through React after initial parse, so a one-shot DOMContentLoaded
 * pass can attach to elements that get discarded moments later, leaving
 * class="reveal" content invisible forever with nothing left to reveal it.
 * Retrying on load + a couple of delayed passes (and marking each element
 * once armed, via a data attribute) catches the DOM once it's settled
 * without double-processing or fighting the framework.
 */
(function () {
  function armReveal(el) {
    if (el.hasAttribute('data-motion-armed')) return;
    el.setAttribute('data-motion-armed', '1');
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      io.observe(el);
    } else {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
  }

  function animateCount(el) {
    if (el.hasAttribute('data-motion-armed')) return;
    el.setAttribute('data-motion-armed', '1');
    var to = parseFloat(el.getAttribute('data-count-to'));
    var decimals = parseInt(el.getAttribute('data-count-decimals') || '0', 10);
    var suffix = el.getAttribute('data-count-suffix') || '';
    function run() {
      var duration = 1100;
      var start = null;
      function step(ts) {
        if (start === null) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = (to * eased).toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = to.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { run(); io.unobserve(entry.target); }
        });
      }, { threshold: 0.6 });
      io.observe(el);
    } else {
      run();
    }
  }

  function sweep() {
    document.querySelectorAll('.reveal').forEach(armReveal);
    document.querySelectorAll('[data-count-to]').forEach(animateCount);
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // leave elements in their natural (visible) state entirely
  }

  document.addEventListener('DOMContentLoaded', sweep);
  window.addEventListener('load', sweep);
  setTimeout(sweep, 400);
  setTimeout(sweep, 1200);
  setTimeout(sweep, 2500);
})();
