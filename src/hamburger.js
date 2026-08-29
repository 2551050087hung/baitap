// src/js/hamburger.js
// Xử lý nút hamburger dùng chung cho tất cả các trang.
// Yêu cầu markup: 1 nút .hb-toggle + 1 menu .hb-menu (+ .hb-overlay tuỳ chọn)

(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var toggle = document.querySelector(".hb-toggle");
    var menu = document.querySelector(".hb-menu");
    var overlay = document.querySelector(".hb-overlay");

    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.classList.toggle("is-open", open);
      menu.classList.toggle("is-open", open);
      if (overlay) overlay.classList.toggle("is-open", open);
      document.body.classList.toggle("hb-no-scroll", open);
      toggle.setAttribute("aria-expanded", String(open));
    }

    toggle.addEventListener("click", function () {
      setOpen(!menu.classList.contains("is-open"));
    });

    if (overlay) {
      overlay.addEventListener("click", function () {
        setOpen(false);
      });
    }

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setOpen(false);
    });
  });
})();