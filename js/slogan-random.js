/**
 * 首页格言随机池
 * 每次访问主页时随机显示其中一句格言
 *
 * 修改方式：直接编辑下方 mottoes 数组，增删改即可
 */
(function () {
  var mottoes = [
    'Hypotheses non fingo',
    'Amor est vitae essentia',
    'Qui non proficit deficit',
    'Esto quod audes',
    'Homo plus est quam humanitas',
    'Ipsa scientia potestas est',
    'Veritas vos liberabit',
    'Vox populi, vox Dei',
  ];

  var pick = mottoes[Math.floor(Math.random() * mottoes.length)];

  // 首页杂志封面刊头:写入待打字文案,由 motion.js 的打字机消费
  var mag = document.getElementById('mag-slogan-text');
  if (mag) {
    mag.setAttribute('data-text', pick);
    mag.textContent = pick; // motion.js 未执行时的静态兜底
  }

  // 其他页面的 banner 副标题(仅当未启用打字机时才有意义)
  var subtitle = document.getElementById('subtitle');
  if (subtitle && !subtitle.getAttribute('data-typed-text')) {
    subtitle.textContent = pick;
  }
})();
