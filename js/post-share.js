/* 文章页分享按钮 — 事件委托，无依赖 */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('.post-share-btn');
      if (!btn) return;
      var kind = btn.getAttribute('data-share');
      if (!kind) return;
      var url = location.href;
      var title = document.title || '';
      if (kind === 'twitter') {
        var u = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url);
        window.open(u, '_blank', 'noopener,noreferrer,width=600,height=420');
      } else if (kind === 'weibo') {
        var w = 'https://service.weibo.com/share/share.php?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
        window.open(w, '_blank', 'noopener,noreferrer,width=600,height=520');
      } else if (kind === 'copy') {
        var done = function () { btn.classList.add('post-share-btn--done'); btn.textContent = '已复制'; setTimeout(resetBtn, 1500, btn); };
        var fail = function () { btn.classList.add('post-share-btn--fail'); btn.textContent = '复制失败'; setTimeout(resetBtn, 1500, btn); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, fail);
        } else {
          try {
            var ta = document.createElement('textarea');
            ta.value = url; ta.style.position = 'fixed'; ta.style.opacity = '0';
            document.body.appendChild(ta); ta.select();
            var ok = document.execCommand && document.execCommand('copy');
            document.body.removeChild(ta);
            ok ? done() : fail();
          } catch (_) { fail(); }
        }
      }
    });
  });

  function resetBtn(btn) {
    if (!btn) return;
    var name = btn.getAttribute('data-share');
    var map = { twitter: 'X', weibo: '微博', copy: '复制链接' };
    btn.textContent = map[name] || '';
    btn.classList.remove('post-share-btn--done', 'post-share-btn--fail');
  }
})();