/**
 * custom-fancy.js — 亮色模式专用头图
 * 暗色头图由 _config.fluid.yml 各页面 banner_img 控制;
 * 亮色模式按 BANNER_LIGHT_MAP 替换 #banner 背景,切回暗色恢复原图。
 * 图片先经预加载探测,不存在则保持原图;监听属性变化即时切换;PJAX 安全。
 */
(function () {
  'use strict';

  /* 亮色头图映射:图片放入 source/img/banner/ */
  var MAP = [
    { re: /^\/(page\/\d+\/?)?$/, src: '/img/banner/home-light.jpg' },
    { re: /^\/archives\//, src: '/img/banner/archives-light.jpg' },
    { re: /^\/tags\//, src: '/img/banner/tags-light.jpg' },
    { re: /^\/aboutme\//, src: '/img/banner/about-light.jpg' }
  ];

  function find(path) {
    for (var i = 0; i < MAP.length; i++) {
      if (MAP[i].re.test(path)) return MAP[i];
    }
    return null;
  }

  function probe(entry, done) {
    if (entry.ok !== undefined) return;
    var img = new Image();
    img.onload = function () { entry.ok = true; done(); };
    img.onerror = function () { entry.ok = false; };
    img.src = entry.src;
  }

  function apply() {
    var el = document.getElementById('banner');
    if (!el) return;
    if (!el.getAttribute('data-fx-orig')) {
      el.setAttribute('data-fx-orig', el.style.backgroundImage || '');
    }
    var scheme = document.documentElement.getAttribute('data-user-color-scheme');
    var entry = find(window.location.pathname);
    var ready = true;
    if (scheme === 'light' && entry) {
      if (entry.ok === true) {
        el.style.backgroundImage = 'url("' + entry.src + '")';
      } else {
        /* 未探测完成时保持隐藏,避免暗图先闪一帧 */
        el.style.backgroundImage = el.getAttribute('data-fx-orig');
        if (entry.ok === undefined) {
          ready = false;
          probe(entry, apply);
        }
      }
    } else {
      el.style.backgroundImage = el.getAttribute('data-fx-orig');
    }
    if (ready) el.setAttribute('data-fx-ready', '');
  }

  function init() {
    var entry = find(window.location.pathname);
    if (entry) probe(entry, apply);
    apply();
    /* 兜底:任何异常也不让头图永久隐藏 */
    setTimeout(function () {
      var el = document.getElementById('banner');
      if (el) el.setAttribute('data-fx-ready', '');
    }, 1500);
  }

  var observer = new MutationObserver(function () { apply(); });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-user-color-scheme']
  });

  /* 脚本在 body 末尾,#banner 与 <html> 属性均已就绪,立即初始化 */
  init();
  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('pjax:complete', init);
})();
