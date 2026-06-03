(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function show(el) { el.classList.add("is-visible"); }

  if (reduceMotion) {
    document.querySelectorAll(".reveal").forEach(show);
    return;
  }

  // Determine "above-fold" container: hero-inner (home) or case-hero (case pages)
  var aboveFold = document.querySelector(".hero-inner, .case-hero");

  // Fire above-fold reveals immediately
  if (aboveFold) aboveFold.querySelectorAll(".reveal").forEach(show);

  // Watch everything else with IntersectionObserver
  var toWatch = [];
  document.querySelectorAll(".reveal").forEach(function (el) {
    if (aboveFold && aboveFold.contains(el)) return;
    toWatch.push(el);
  });

  if (!window.IntersectionObserver) {
    toWatch.forEach(show);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      show(entry.target);
    });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0 });

  toWatch.forEach(function (el) { io.observe(el); });

  // Smooth-scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = this.getAttribute("href").slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Nav background intensity on scroll
  var nav = document.getElementById("nav");
  if (nav) {
    window.addEventListener("scroll", function () {
      nav.style.background = window.scrollY > 40
        ? "rgba(242, 242, 242, 0.95)"
        : "rgba(242, 242, 242, 0.82)";
    }, { passive: true });
  }
})();
