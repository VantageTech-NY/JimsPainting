/* Progressive enhancement — served as a static file so it stays external
   (CSP script-src 'self', no inline script, no build-time hash to maintain).
   The site is fully usable with this script absent. Loaded with `defer`. */
(function () {
  var root = document.documentElement;
  root.classList.add("js");

  // Mobile nav toggle
  var burger = document.querySelector(".nav-burger");
  var header = document.querySelector(".site-header");
  if (burger && header) {
    burger.addEventListener("click", function () {
      var open = header.toggleAttribute("data-open");
      burger.setAttribute("aria-expanded", String(open));
    });
  }

  // Home: transparent header while at the very top of the hero, solid once
  // scrolled (so the nav stays readable over the lighter content below).
  if (header && document.body.classList.contains("hero-page")) {
    var ticking = false;
    var sync = function () {
      header.classList.toggle("at-top", window.scrollY < 24);
      ticking = false;
    };
    sync();
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(sync);
        }
      },
      { passive: true },
    );
  }

  // Scroll reveal (skips work entirely when reduced motion is requested)
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = Array.prototype.slice.call(
    document.querySelectorAll("[data-reveal]"),
  );
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("is-in");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );
  items.forEach(function (el) {
    io.observe(el);
  });
})();
