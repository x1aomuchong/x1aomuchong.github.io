/* Architecture illustration only. No model inference, predicted recipe, or synthetic result image. */
(() => {
  'use strict';
  const root = document.getElementById('architecture-story');
  if (!root) return;
  const duration = 38;
  const boundaries = [0, 5, 12, 18, 25, 32];
  const scene = root.querySelector('.story-stage');
  const art = root.querySelector('.story-art');
  const title = root.querySelector('.story-caption h4');
  const caption = root.querySelector('.story-caption p');
  const counter = root.querySelector('.story-counter');
  const play = root.querySelector('.story-play');
  const seek = root.querySelector('.story-seek');
  const clock = root.querySelector('.story-time');
  const steps = [...root.querySelectorAll('[data-story-step]')];
  let elapsed = 0, running = false, frame = null, previous = null, current = -1;
  const photo = (x, y, w, h) => `<rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 8}" rx="3" fill="#181818" stroke="#736347"/><svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 200 150"><image href="assets/hero_before.jpg" width="200" height="150" preserveAspectRatio="xMidYMid slice"/></svg>`;
  const label = (x, y, t, cls = 'story-svg-small') => `<text x="${x}" y="${y}" class="${cls}">${t}</text>`;
  const line = (d, animated = true) => `<path d="${d}" class="${animated ? 'story-flow' : 'story-stroke'}"/>`;
  const box = (x, y, w, h, stroke = '#454139') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#1a1917" stroke="${stroke}"/>`;
  const card = (x, y, n, text, selected = false) => `${box(x, y, 126, 64, selected ? '#e2a23b' : '#454139')}${label(x + 12, y + 22, n, 'story-svg-small story-amber')}${label(x + 12, y + 45, text, 'story-svg-small')}`;
  const scenes = [
    {
      title: '起点是一张真实照片',
      text: 'JPEG 已经带有相机或手机的色彩处理。我们希望提供几种值得选择的修法，同时始终保留原图。',
      svg: `${photo(165, 36, 224, 168)}<rect x="155" y="26" width="244" height="188" rx="5" stroke="#e2a23b" fill="none" opacity=".3" class="story-pulse"/>${label(166, 244, 'ONE JPEG · ONE UNCHANGED SOURCE', 'story-svg-small story-amber')}${line('M60 121 H136', false)}${line('M418 121 H496', false)}<circle cx="61" cy="121" r="3" fill="#e2a23b"/><circle cx="496" cy="121" r="3" fill="#e2a23b"/>`
    },
    {
      title: '先提出风格，再落实要求',
      text: '最终由规划器观察照片，自主提出完整、开放的风格意图，不依赖固定预设菜单。当前开发由人工提供这些意图。',
      svg: `${photo(25, 99, 112, 84)}${line('M146 141 H203')}${box(209, 31, 320, 217)}${label(230, 60, 'PLANNER · 完整意图示例', 'story-svg-small story-amber')}${label(230, 94, '带冷蓝阴影的电影感，', 'story-svg-title')}${label(230, 120, '同时保持自然肤色与可读暗部。', 'story-svg-title')}<path d="M230 143 H508" class="story-stroke"/>${label(230, 170, '先去色，再加入温暖的棕色调。', 'story-svg-title')}${label(230, 211, '开放描述 ≠ 固定风格编号', 'story-svg-small')}${label(27, 210, '同一张原图')}`
    },
    {
      title: '让执行器同时理解两件事',
      text: '图像说明“从哪里开始”，完整意图说明“最后应当怎样”。顺序、否定与保留条件，都要落实到颜色和影调。',
      svg: `${photo(23, 32, 100, 75)}${box(18, 175, 127, 61)}${label(31, 200, '完整风格意图', 'story-svg-small story-amber')}${label(31, 219, '含顺序与约束')}${line('M132 71 H173 Q193 71 193 94 V144 H222')}${line('M145 205 H173 Q193 205 193 184 V144 H222')}${box(228, 83, 181, 123, '#e2a23b')}${label(249, 115, 'IMAGE + INTENT', 'story-svg-small story-amber')}${label(255, 151, '风格理解执行器', 'story-svg-title')}${label(249, 181, '预测可回放的调色配方')}${line('M416 144 H501')}<circle cx="510" cy="144" r="9" fill="#e2a23b" class="story-pulse"/>`
    },
    {
      title: '可解释控制，补足颜色表达',
      text: '40 个滑块表达曝光、白平衡、曲线与混色；可选的小型有界残差 LUT 补充颜色映射。配方可以记录、调整和回放。',
      svg: `${box(18, 29, 279, 234)}${label(36, 56, '40 CONTROLS', 'story-svg-small story-amber')}${Array.from({length:40}, (_, i) => {const x=36+(i%5)*50,y=80+Math.floor(i/5)*17; return `<line x1="${x}" y1="${y}" x2="${x+33}" y2="${y}" stroke="#575044"/><circle cx="${x+16.5}" cy="${y}" r="2" fill="#c4ae86"/>`;}).join('')}${label(36, 240, '控制器示意 · 非预测参数')}${line('M308 145 H340', false)}${box(351, 29, 190, 234)}${label(369, 56, 'OPTIONAL · LUT', 'story-svg-small story-amber')}<g class="story-glow"><path d="M382 116 L432 89 L486 117 L436 147 Z M382 116 V177 L436 207 L486 179 V117 M436 147 V207" fill="none" stroke="#e2a23b" stroke-width="1.5"/><path d="M399 107 L452 137 V198 M415 98 L470 127 V189 M382 137 L436 168 L486 139 M382 157 L436 187 L486 159" class="story-stroke"/></g>${label(370, 241, '有界的残差颜色映射')}`
    },
    {
      title: '每个候选，都从原图出发',
      text: '三个候选分别把自己的配方应用到同一张原图，不把上一张成片继续叠加修改。全分辨率渲染保留原图坐标。',
      svg: `${photo(25, 105, 125, 94)}${label(25, 228, '同一原图', 'story-svg-small story-amber')}${line('M159 152 H225 V57 H355')}${line('M225 152 H355')}${line('M225 152 V246 H355')}<circle cx="225" cy="152" r="4" fill="#e2a23b"/>${card(363, 25, 'RECIPE 01', '原图 → 候选 01')}${card(363, 120, 'RECIPE 02', '原图 → 候选 02')}${card(363, 214, 'RECIPE 03', '原图 → 候选 03')}${label(170, 278, '各自独立渲染 · 没有候选之间的叠加')}`
    },
    {
      title: '最后的选择，交还给用户',
      text: '比较多个候选，也可以选择不修改。质量、风格差异和用户偏好分别验证；参数可回放，并不等于成片已经好看。',
      svg: `${photo(25, 78, 107, 80)}${label(31, 189, '保留原图', 'story-svg-small story-amber')}${card(158, 91, 'CANDIDATE 01', '候选 01')}${card(299, 91, 'CANDIDATE 02', '候选 02', true)}${card(440, 91, 'CANDIDATE 03', '候选 03')}<path d="M318 177 L326 185 L341 167" stroke="#e2a23b" stroke-width="2" fill="none"/>${label(350, 180, '选择示意', 'story-svg-small story-amber')}${label(84, 243, '原图 + 多个候选 · 让偏好决定，而非只看一个分数')}`
    }
  ];
  // Mobile diagrams use fewer annotations at a readable size; the adjacent prose retains every claim.
  const mobileArt = [
    `${photo(84, 10, 160, 120)}${label(77, 163, 'ONE JPEG · 原图始终保留', 'story-svg-small story-amber')}${line('M30 74 H69', false)}${line('M260 74 H302', false)}`,
    `${photo(5, 60, 67, 51)}${line('M79 87 H97')}${box(105, 14, 219, 146)}${label(117, 39, '完整意图示例', 'story-svg-small story-amber')}${label(117, 68, '冷蓝阴影的电影感，')}${label(117, 89, '保持自然肤色与可读暗部。')}${line('M118 105 H310', false)}${label(117, 132, '开放描述，不是预设编号')}${label(13, 186, '当前开发：人工提供意图', 'story-svg-small story-amber')}`,
    `${photo(9, 8, 77, 58)}${box(5, 129, 89, 46)}${label(15, 155, '完整意图')}${line('M93 36 H116 V93 H144')}${line('M101 152 H116 V93 H144')}${box(151, 44, 170, 101, '#e2a23b')}${label(165, 71, 'IMAGE + INTENT', 'story-svg-small story-amber')}${label(165, 97, '风格理解执行器', 'story-svg-title')}${label(165, 122, '颜色 + 影调 + 约束')}`,
    `${box(4, 9, 173, 171)}${label(15, 31, '40 个可解释滑块', 'story-svg-small story-amber')}${Array.from({length:40}, (_,i)=>{const x=16+(i%5)*31,y=49+Math.floor(i/5)*13;return `<line x1="${x}" y1="${y}" x2="${x+20}" y2="${y}" stroke="#575044"/><circle cx="${x+10}" cy="${y}" r="1.8" fill="#c4ae86"/>`;}).join('')}${label(16, 167, '示意，非预测参数')}${box(192, 9, 132, 171)}${label(203, 31, '可选残差 LUT', 'story-svg-small story-amber')}<path d="M213 76 L255 54 L302 79 L259 103 Z M213 76 V127 L259 151 L302 128 V79 M259 103 V151" stroke="#e2a23b" fill="none"/>${label(219, 168, '有界颜色映射')}`,
    `${photo(5, 68, 69, 52)}${label(5, 151, '同一原图', 'story-svg-small story-amber')}${line('M83 94 H111 V29 H166')}${line('M111 94 H166')}${line('M111 94 V159 H166')}${[0,1,2].map(i=>`${box(173, 8+i*65, 148, 43)}${label(184, 34+i*65, `独立渲染 → 候选 0${i+1}`)}`).join('')}`,
    `${photo(20, 8, 61, 46)}${label(95, 37, '保留原图', 'story-svg-small story-amber')}${card(183, 0, 'CANDIDATE 01', '候选 01')}${card(14, 97, 'CANDIDATE 02', '候选 02', true)}${card(183, 97, 'CANDIDATE 03', '候选 03')}${label(22, 187, '原图 + 三个候选 · 用户决定', 'story-svg-small story-amber')}`
  ];
  const mobile = window.matchMedia('(max-width:600px)');
  function render() {
    const index = boundaries.reduce((chosen, start, i) => elapsed >= start ? i : chosen, 0);
    if (index !== current) {
      current = index;
      scene.dataset.scene = String(index);
      title.textContent = scenes[index].title;
      caption.textContent = scenes[index].text;
      counter.textContent = `0${index+1} / 06`;
      art.innerHTML = `<svg viewBox="${mobile.matches ? '0 0 330 200' : '0 0 580 300'}" xmlns="http://www.w3.org/2000/svg"><g class="story-rise">${mobile.matches ? mobileArt[index] : scenes[index].svg}</g></svg>`;
      steps.forEach((button, i) => { if (i === index) button.setAttribute('aria-current', 'step'); else button.removeAttribute('aria-current'); });
    }
    seek.value = String(elapsed);
    seek.setAttribute('aria-valuetext', `${Math.floor(elapsed)} 秒，共 38 秒；${scenes[index].title}`);
    clock.value = `00:${String(Math.floor(elapsed)).padStart(2, '0')} / 00:38`;
    root.dataset.elapsed = elapsed.toFixed(2);
  }
  function pause() {
    running = false; previous = null;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    root.classList.remove('is-playing');
    play.textContent = elapsed >= duration ? '重播' : '播放';
    play.setAttribute('aria-label', elapsed >= duration ? '重新播放架构讲解' : '播放架构讲解');
  }
  function tick(now) {
    if (!running) return;
    if (previous !== null) elapsed = Math.min(duration, elapsed + (now-previous)/1000);
    previous = now; render();
    if (elapsed >= duration) pause();
    else frame = requestAnimationFrame(tick);
  }
  function start() {
    if (elapsed >= duration) elapsed = 0;
    running = true; previous = null;
    root.classList.add('is-playing');
    play.textContent = '暂停'; play.setAttribute('aria-label', '暂停架构讲解');
    render(); frame = requestAnimationFrame(tick);
  }
  play.addEventListener('click', () => running ? pause() : start());
  root.querySelector('.story-restart').addEventListener('click', () => { pause(); elapsed=0; start(); });
  seek.addEventListener('input', () => { elapsed=Number(seek.value); previous=null; render(); if (elapsed>=duration) pause(); });
  steps.forEach((button, i) => button.addEventListener('click', () => { pause(); elapsed=boundaries[i]; render(); }));
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  mobile.addEventListener('change', () => { current=-1; render(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { if (!entries[0].isIntersecting && running) pause(); }, {threshold:0}).observe(root);
  const videoPanel = document.getElementById('architecture-video');
  const formatButtons = [...document.querySelectorAll('[data-story-view]')];
  function setFormat(format) {
    const interactive = format === 'interactive';
    root.hidden = !interactive;
    if (videoPanel) {
      videoPanel.hidden = interactive;
      if (interactive) videoPanel.querySelector('video').pause();
    }
    if (!interactive) pause();
    formatButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.storyView === format)));
  }
  formatButtons.forEach(button => button.addEventListener('click', () => setFormat(button.dataset.storyView)));
  if (location.hash === '#architecture-story') setFormat('interactive');
  render();
})();
