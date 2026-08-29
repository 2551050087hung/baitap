// src/js/nav.js

/* ============================================================
   TÍNH NĂNG 1 — MENU MOBILE
   ============================================================ */

export function initNav() {
  const toggle = document.querySelector(
    '[aria-controls="nav-mobile"]'
  );

  const menu = document.getElementById("nav-mobile");

  if (!toggle || !menu) return;


  function setOpen(open) {

    // Hiện / ẩn menu
    menu.classList.toggle("hidden", !open);

    // Accessibility
    toggle.setAttribute(
      "aria-expanded",
      String(open)
    );

    toggle.setAttribute(
      "aria-label",
      open ? "Đóng menu" : "Mở menu"
    );

    // Không cho body cuộn khi menu đang mở
    document.body.classList.toggle(
      "overflow-hidden",
      open
    );
  }


  const isOpen = () =>
    toggle.getAttribute("aria-expanded") === "true";


  // Bấm hamburger
  toggle.addEventListener("click", () => {
    setOpen(!isOpen());
  });


  // ESC để đóng menu
  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && isOpen()) {

      setOpen(false);

      toggle.focus();
    }

  });


  // Bấm ra ngoài header
  document.addEventListener("click", (event) => {

    if (!isOpen()) return;

    const header = toggle.closest("header");

    if (!header) return;

    if (!event.target.closest("header")) {
      setOpen(false);
    }

  });


  // Khi chuyển sang desktop thì tự đóng menu
  const mediaQuery = window.matchMedia(
    "(min-width: 1024px)"
  );

  const handleMediaChange = (event) => {

    if (event.matches) {
      setOpen(false);
    }

  };

  mediaQuery.addEventListener(
    "change",
    handleMediaChange
  );


  // Khi click link mobile → đóng menu
  menu.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {
      setOpen(false);
    });

  });

}


/* ============================================================
   TÍNH NĂNG 2 — HEADER KHI CUỘN
   ============================================================ */

export function initHeaderOnScroll() {

  const header = document.querySelector("header");

  const sentinel =
    document.getElementById("nav-sentinel");

  if (!header || !sentinel) return;


  const observer = new IntersectionObserver(
    ([entry]) => {

      const scrolled = !entry.isIntersecting;

      header.classList.toggle(
        "shadow-sm",
        scrolled
      );

      header.classList.toggle(
        "is-scrolled",
        scrolled
      );

    }
  );


  observer.observe(sentinel);

}


/* ============================================================
   BÀI KHỞI ĐỘNG — NÚT LÊN ĐẦU
   ============================================================ */

export function initToTop() {

  const btn =
    document.getElementById("nut-len-dau");

  const sentinel =
    document.getElementById("nav-sentinel");

  if (!btn || !sentinel) return;


  const observer = new IntersectionObserver(
    ([entry]) => {

      btn.classList.toggle(
        "is-visible",
        !entry.isIntersecting
      );

    },
    {
      rootMargin: "400px 0px 0px 0px"
    }
  );


  observer.observe(sentinel);


  btn.addEventListener("click", () => {

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    window.scrollTo({
      top: 0,
      behavior: reduceMotion
        ? "auto"
        : "smooth"
    });


    btn.blur();

  });

}