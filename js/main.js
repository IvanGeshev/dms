/* ============================================================
   DMS — interactions + motion
   Reveal-safety: content is visible by default. Entrance states are
   applied only when this script confirms GSAP is present and the user
   has not requested reduced motion. Any failure path reveals everything.
   ============================================================ */
window.__dmsInit = true;

(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";

  /* ---------- Hero background video (play only when motion is welcome) ---------- */
  var video = document.getElementById("hero-video");
  if (video) {
    if (reduce) {
      video.removeAttribute("autoplay");
      try { video.pause(); } catch (e) {}
    } else {
      var p = video.play();
      if (p && typeof p.catch === "function") p.catch(function () {/* autoplay blocked; poster stays */});
    }
  }

  /* ---------- Header scrolled state ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("header--scrolled");
    else header.classList.remove("header--scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Scrollspy (aria-current on nav links) ---------- */
  var spyMap = {};
  document.querySelectorAll(".nav__link").forEach(function (a) {
    var id = a.getAttribute("href");
    if (id && id.charAt(0) === "#") spyMap[id.slice(1)] = a;
  });
  var spyTargets = ["services", "about"].map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if ("IntersectionObserver" in window && spyTargets.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = spyMap[en.target.id];
        if (!link) return;
        if (en.isIntersecting) {
          Object.keys(spyMap).forEach(function (k) { spyMap[k].removeAttribute("aria-current"); });
          link.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    spyTargets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("mobile-menu");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (toggle) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    if (menu) {
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      if (open) { var f = menu.querySelector("a"); if (f) f.focus(); }
    }
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () { setMenu(!document.body.classList.contains("menu-open")); });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        setMenu(false);
        if (toggle) toggle.focus();
      }
    });
  }

  /* ---------- Interactive Georgia map ---------- */
  var SITES = {
    atlanta: {
      city: "Atlanta", type: "Headquarters · Mechanical & Electrical",
      desc: "Our home base and 24 HR dispatch. Central Georgia coverage with crews staged for rapid response to any facility in the metro and beyond.",
      s1v: "1.5 hr", s1l: "Avg response", s2v: "24/7", s2l: "Dispatch"
    },
    rome: {
      city: "Rome", type: "Emergency Response",
      desc: "An after-hours line-down call in the northwest corridor, answered in under 90 minutes and back online before the first shift arrived.",
      s1v: "90 min", s1l: "On-site", s2v: "0", s2l: "Shifts lost"
    },
    augusta: {
      city: "Augusta", type: "Electrical + Controls",
      desc: "Switchgear replacement and a controls upgrade for a life-sciences facility on the Savannah River, sequenced around a live production schedule.",
      s1v: "3", s1l: "Week install", s2v: "100%", s2l: "Uptime kept"
    },
    macon: {
      city: "Macon", type: "Mechanical",
      desc: "A central-plant chiller and pump overhaul keeping a distribution hub cool through peak season, planned to avoid a single hour of downtime.",
      s1v: "2", s1l: "Chillers", s2v: "0", s2l: "Downtime hrs"
    },
    columbus: {
      city: "Columbus", type: "Fabrication",
      desc: "Custom skid fabrication and structural supports for an automated production line, built in-house and installed ready to run.",
      s1v: "12", s1l: "Skids built", s2v: "1", s2l: "Accountable crew"
    },
    savannah: {
      city: "Savannah", type: "Process Piping",
      desc: "A high-purity process piping retrofit for a coastal manufacturing plant on the water, delivered without a full shutdown.",
      s1v: "1,400 ft", s1l: "Piping run", s2v: "0", s2l: "Leaks"
    }
  };
  var siteButtons = Array.prototype.slice.call(document.querySelectorAll("[data-site]"));
  var panel = {};
  document.querySelectorAll("[data-panel]").forEach(function (el) { panel[el.getAttribute("data-panel")] = el; });

  function selectSite(key, focusPanel) {
    var d = SITES[key];
    if (!d) return;
    siteButtons.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-site") === key ? "true" : "false");
    });
    var apply = function () {
      if (panel.city) panel.city.textContent = d.city;
      if (panel.type) panel.type.textContent = d.type;
      if (panel.desc) panel.desc.textContent = d.desc;
      if (panel.s1v) panel.s1v.textContent = d.s1v;
      if (panel.s1l) panel.s1l.textContent = d.s1l;
      if (panel.s2v) panel.s2v.textContent = d.s2v;
      if (panel.s2l) panel.s2l.textContent = d.s2l;
    };
    if (hasGSAP && !reduce && panel.city) {
      var box = panel.city.closest(".map-panel");
      gsap.fromTo(box, { opacity: 0.35, y: 6 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", onStart: apply });
    } else {
      apply();
    }
    // reflect in URL (shareable, back-button friendly, no history spam)
    try {
      var u = new URL(window.location.href);
      u.searchParams.set("site", key);
      window.history.replaceState(null, "", u);
    } catch (e) {}
  }
  siteButtons.forEach(function (b) {
    b.addEventListener("click", function () { selectSite(b.getAttribute("data-site")); });
  });
  // initial site from URL (default atlanta already rendered in markup)
  (function () {
    var init = "atlanta";
    try {
      var q = new URL(window.location.href).searchParams.get("site");
      if (q && SITES[q]) init = q;
    } catch (e) {}
    if (init !== "atlanta") selectSite(init);
  })();

  /* ---------- Video-placeholder buttons (testimonials, coming soon) ---------- */
  var live = document.createElement("div");
  live.setAttribute("aria-live", "polite");
  live.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap";
  document.body.appendChild(live);
  document.querySelectorAll("[data-video-ph]").forEach(function (b) {
    b.addEventListener("click", function () {
      live.textContent = "";
      window.setTimeout(function () { live.textContent = "Video testimonials are coming soon."; }, 60);
      if (hasGSAP && !reduce) gsap.fromTo(b, { x: -3 }, { x: 0, duration: 0.4, ease: "elastic.out(1,0.4)" });
    });
  });

  /* ============================================================
     MOTION
     ============================================================ */
  if (!hasGSAP) {
    root.classList.add("reveal-all"); // nothing stranded hidden
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  if (reduce) {
    // reduced motion: no entrance choreography; CSS already reveals content.
    return;
  }

  var EASE = "expo.out";

  /* Hero: headline word assembly + supporting lines */
  var heroWords = document.querySelectorAll(".hero h1 .w");
  var heroTl = gsap.timeline({ delay: 0.15 });
  heroTl
    .from(".hero__flag", { y: 16, opacity: 0, duration: 0.6, ease: EASE })
    .to(heroWords, { y: 0, opacity: 1, duration: 0.85, stagger: 0.055, ease: EASE }, "-=0.3")
    .from(".hero__sub", { y: 18, opacity: 0, duration: 0.7, ease: EASE }, "-=0.5")
    .from(".hero__actions > *", { y: 18, opacity: 0, duration: 0.6, stagger: 0.1, ease: EASE }, "-=0.45")
    .from(".hero__scroll", { opacity: 0, duration: 0.6, ease: "power1.out" }, "-=0.3");

  /* Text rises (reveal-y). Per-element triggers with a small group stagger:
     reliable on fast scroll (batch can skip elements), still lively. */
  gsap.utils.toArray(".reveal-y").forEach(function (el) {
    gsap.set(el, { opacity: 0, y: 28 });
    var sibs, idx = 0;
    if (el.parentElement) { sibs = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains("reveal-y"); }); idx = sibs.indexOf(el); }
    ScrollTrigger.create({
      trigger: el, start: "top 90%", once: true,
      onEnter: function () { gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: Math.min(idx, 5) * 0.07, ease: EASE }); }
    });
  });

  /* Media settles (reveal) — a distinct entrance from the text rise */
  gsap.utils.toArray(".reveal").forEach(function (el) {
    gsap.set(el, { opacity: 0, scale: 1.045, transformOrigin: "center" });
    ScrollTrigger.create({
      trigger: el, start: "top 88%", once: true,
      onEnter: function () { gsap.to(el, { opacity: 1, scale: 1, duration: 1.05, ease: EASE }); }
    });
  });

  /* Count-ups for stats */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: "top 90%", once: true,
      onEnter: function () {
        gsap.to(obj, {
          v: target, duration: 1.3, ease: "power2.out",
          onUpdate: function () { el.textContent = obj.v.toFixed(dec) + suffix; }
        });
      }
    });
  });

  /* Map: hotspots pop in + gentle ring pulse */
  var hots = document.querySelectorAll(".hot");
  if (hots.length) {
    gsap.set(hots, { scale: 0, transformOrigin: "center" });
    ScrollTrigger.create({
      trigger: ".map-stage", start: "top 75%", once: true,
      onEnter: function () {
        gsap.to(hots, { scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(2)" });
      }
    });
    gsap.to(".hot__ring", {
      scale: 2.1, opacity: 0, duration: 2.2, ease: "power1.out",
      repeat: -1, stagger: { each: 0.35, repeat: -1 }
    });
  }

  /* Keep triggers honest after fonts/images settle */
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
