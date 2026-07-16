/**
 * motion.js — 动效增强
 *
 * 1. 文章页顶部阅读进度条
 *    仅在存在 article.post-content 时创建;rAF 节流,transform scaleX
 *    不触发 layout,滚动开销极小。
 *
 * 2. 滚动淡入(IntersectionObserver)
 *    首页:   .index-card .index-info(避开 .index-card 自身的
 *            opacity/transform !important 覆盖)
 *    文章页: .markdown-body 的直接子元素
 *    初始隐藏态由 JS 添加(.fx-fade),禁用 JS 时内容始终可见;
 *    prefers-reduced-motion 下完全不启用。
 *
 * 无依赖;PJAX 完成时重新初始化(重复调用安全)。
 */
(function () {
  'use strict';

  var reducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* ---------- 1. 阅读进度条 ---------- */

  function initProgress() {
    // 已存在则只校准一次(页面高度可能因图片加载变化)
    var bar = document.querySelector('.read-progress');
    if (bar) {
      updateProgress(bar);
      return;
    }
    // 仅文章页
    if (!document.querySelector('article.post-content')) return;

    bar = document.createElement('div');
    bar.className = 'read-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        updateProgress(bar);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateProgress(bar);
  }

  function updateProgress(bar) {
    var doc = document.documentElement;
    var total = doc.scrollHeight - window.innerHeight;
    var p = total > 0 ? Math.min(window.scrollY / total, 1) : 1;
    bar.style.transform = 'scaleX(' + p + ')';
  }

  /* ---------- 2. 滚动淡入 ---------- */

  function initFade() {
    if (reducedMotion) return;
    if (!('IntersectionObserver' in window)) return;

    var targets = [];

    // 首页列表
    var cards = document.querySelectorAll('.index-card .index-info');
    for (var i = 0; i < cards.length; i++) targets.push(cards[i]);

    // 文章页正文块
    var body = document.querySelector('.markdown-body');
    if (body) {
      var children = body.children;
      for (var j = 0; j < children.length; j++) targets.push(children[j]);
    }

    // 过滤掉已处理的(PJAX 重进时)
    targets = targets.filter(function (el) {
      return !el.classList.contains('fx-fade');
    });
    if (!targets.length) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('fx-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    targets.forEach(function (el, i) {
      el.classList.add('fx-fade');
      // 克制的阶梯延迟,仅前几项可感知
      el.style.transitionDelay = Math.min(i % 8, 4) * 50 + 'ms';
      io.observe(el);
    });
  }

  function init() {
    initProgress();
    initFade();
  }

  ready(init);
  document.addEventListener('pjax:complete', init);
})();
