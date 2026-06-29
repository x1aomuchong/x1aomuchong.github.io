/**
 * custom-fancy.js — 现代毛玻璃渐变风交互增强
 *
 * 通过 _config.fluid.yml 的 custom_js 注入,在主题 boot.js 之前加载。
 * 卡片滚动入场动画(IntersectionObserver)。
 *
 * 尊重 prefers-reduced-motion:开启时全部跳过。
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ============ 卡片滚动入场动画 ============
  function setupCardReveal() {
    if (reduceMotion) return; // 无障碍:直接显示,不动画

    var cards = document.querySelectorAll(".index-card");
    if (!cards.length) return;

    // 不支持 IntersectionObserver 的浏览器直接显示全部
    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (c) {
        c.classList.add("in-view");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, idx) {
          if (entry.isIntersecting) {
            // 同一批进入的卡片错位延迟,营造层叠入场感
            var delay = (idx % 4) * 80;
            entry.target.style.transitionDelay = delay + "ms";
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    cards.forEach(function (c) {
      io.observe(c);
    });
  }

  // DOM 就绪后启动(主题 boot.js 会在其后执行,不影响)
  function init() {
    setupCardReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
