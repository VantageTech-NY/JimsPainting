/* Gallery: before/after sliders + category filter (CSP-safe, served static).
   Site is usable without this: sliders show a static 50/50 split, all items
   visible. Updates the --pos CSS var via CSSOM, not inline style attributes. */
(function () {
  // Before/after sliders — range input drives the reveal position.
  var sliders = document.querySelectorAll(".ba");
  sliders.forEach(function (ba) {
    var range = ba.querySelector(".ba-range");
    if (!range) return;
    var update = function () {
      ba.style.setProperty("--pos", range.value + "%");
    };
    range.addEventListener("input", update);
    update();
  });

  // Category filter.
  var buttons = document.querySelectorAll(".filter-btn");
  var items = document.querySelectorAll(".ba-item");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      items.forEach(function (it) {
        var show = cat === "all" || it.getAttribute("data-cat") === cat;
        it.hidden = !show;
      });
    });
  });

  // One-time "breathe" nudge on first view so the handle reads as draggable.
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  )
    return;
  var io = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-seen");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 },
  );
  sliders.forEach(function (s) {
    io.observe(s);
  });
})();
