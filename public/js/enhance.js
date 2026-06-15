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
