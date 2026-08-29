// src/main.js
// Lưu ý: nút hamburger được xử lý riêng bởi ./js/hamburger.js
import { initHeaderOnScroll, initToTop } from "./nav.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeaderOnScroll();
  initToTop();
});