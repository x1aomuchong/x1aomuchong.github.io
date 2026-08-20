/**
 * motion.js — 动效增强
 *
 * 1. 文章页顶部阅读进度条
 *    仅在存在 article.post-content 时创建;rAF 节流,transform scaleX
 *    不触发 layout,滚动开销极小。
 *
 * 2. 滚动淡入(IntersectionObserver)
 *    首页:   .index-card .index-info 与杂志区块
 *            (.mag-feature-item / .mag-index-row / .mag-side-card)
 *    文章页: .markdown-body 的直接子元素
 *    初始隐藏态由 JS 添加(.fx-fade),禁用 JS 时内容始终可见;
 *    prefers-reduced-motion 下完全不启用。
 *
 * 3. 首页杂志封面
 *    打字机 slogan(配置读取 Fluid 的 FluidConfig.typing,速度与其一致)
 *    + 刊头载入渐入(.mag-in)。
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

    // 首页经典列表
    var cards = document.querySelectorAll('.index-card .index-info');
    for (var i = 0; i < cards.length; i++) targets.push(cards[i]);

    // 首页杂志区块
    var mags = document.querySelectorAll(
      '.mag-feature-item, .mag-index-row, .mag-side-card'
    );
    for (var m = 0; m < mags.length; m++) targets.push(mags[m]);

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

  /* ---------- 3. 首页杂志封面 ---------- */

  var magTimer = null;

  function typeText(el, text, speed) {
    var idx = 0;
    el.textContent = '';
    magTimer = setInterval(function () {
      el.textContent = text.substring(0, ++idx);
      if (idx >= text.length) {
        clearInterval(magTimer);
        magTimer = null;
        // 打完后游标持续闪烁(CSS 动画已接管)
      }
    }, speed);
  }

  function initMagCover() {
    var cover = document.getElementById('mag-cover');
    if (!cover) return;

    // 刊头载入渐入(下一帧再加,确保初始态先渲染一帧)
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        cover.classList.add('mag-in');
      });
    });

    if (magTimer) {
      clearInterval(magTimer);
      magTimer = null;
    }
    var el = document.getElementById('mag-slogan-text');
    if (!el) return;

    // slogan 与 Fluid 副标题共用同一文案(来自配置注入)
    var text = el.getAttribute('data-text') || '';
    if (!text) return;

    if (reducedMotion) {
      el.textContent = text;
      return;
    }

    // 速度与 Fluid typing 配置保持一致(默认 70ms/字)
    var speed = 70;
    try {
      if (window.CONFIG && window.CONFIG.typing && window.CONFIG.typing.typeSpeed) {
        speed = window.CONFIG.typing.typeSpeed;
      }
    } catch (e) {
      /* 保持默认速度 */
    }
    typeText(el, text, speed);
  }

  function init() {
    initProgress();
    initFade();
    initMagCover();
  }

  ready(init);
  document.addEventListener('pjax:complete', init);
})();
