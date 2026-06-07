/**
 * 首页格言随机池
 * 每次访问主页时随机显示其中一句格言
 *
 * 修改方式：直接编辑下方 mottoes 数组，增删改即可
 */
(function () {
  var subtitle = document.getElementById('subtitle');
  if (!subtitle) return;

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
  subtitle.textContent = pick;
})();
