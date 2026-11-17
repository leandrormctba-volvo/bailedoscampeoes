/* Monta os slides a partir de js/data.js e controla a navegação. */
(function () {
  // espera a fonte carregar (para os textos das camisas nas ilustrações) — no máximo 2,5 s
  const fontsReady = document.fonts ? Promise.race([
    Promise.all(['900 20px Montserrat', '800 20px Montserrat', '700 20px Montserrat'].map(f => document.fonts.load(f))),
    new Promise(r => setTimeout(r, 2500))
  ]).catch(() => {}) : Promise.resolve();
  fontsReady.then(init);

  function init() {
  const D = window.DECK;
  const host = document.getElementById('slides');
  // imagem do slide: ilustração gerada (art) ou arquivo (img)
  const pic = (o, ratio, w = 900) => o.art && window.AVArt && window.AVArt.make
    ? window.AVArt.make({ seed: o.name || o.team || o.sport || 'x', ...o.art }, ratio, w) : o.img;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const d = i => `style="--d:${(0.15 + i * 0.09).toFixed(2)}s"`;

  const R = {
    cover: s => `
      <div class="cover">
        <div>
          <div class="kicker rv" ${d(0)}>${esc(s.kicker)}</div>
          <div class="h1 rv" ${d(1)}>${s.title.map(esc).join('<br>')}</div>
          <div class="tag rv" ${d(3)}>${esc(s.tag)}</div>
          <div class="lead rv" ${d(4)}>Celebrando quem fez história no nosso clube</div>
        </div>
        <div class="medal zoomIn" ${d(2)}>
          <div class="orbit"></div><div class="orbit o2"></div>
          <div class="disc"><img src="${s.img}" alt=""></div>
        </div>
      </div>`,

    numbers: s => `
      <div class="kicker rv" ${d(0)}>${esc(s.kicker)}</div>
      <div class="h2 rv" ${d(1)}>${esc(s.title)}</div>
      <div class="numgrid">${s.items.map((it, i) => `
        <div class="stat rv" ${d(i + 2)}><b class="goldtext" data-count="${it.n}">0</b>
          <span class="l">${esc(it.label)}</span><span class="s">${esc(it.sub)}</span></div>`).join('')}
      </div>`,

    list: s => {
      const items = s.items.map((it, i) => `
        <div class="item rv" ${d(i + 2)}><span class="ic">${it[0]}</span>
          <span><span class="t">${esc(it[1])}</span>${it[2] ? `<br><span class="n">${esc(it[2])}</span>` : ''}</span></div>`).join('');
      const head = `<div class="kicker rv" ${d(0)}>${esc(s.kicker)}</div><div class="h2 rv" ${d(1)}>${esc(s.title)}</div>`;
      if (s.variant === 'sports') return `
        <div class="sports"><div>${head}<div class="items">${items}</div></div>
          <div class="art"><img class="zoomIn" ${d(3)} src="${s.img}" alt="">
          <button class="cta rv" ${d(13)} data-next><i>▶</i>${esc(s.cta)}</button></div></div>`;
      return `${head}<div class="items ${s.variant === 'grid' ? 'g3' : ''}">${items}</div>`;
    },

    video: s => `
      <div class="videoslide">
        <div class="head"><div class="kicker rv" ${d(0)}>${esc(s.kicker)}</div><div class="h2 rv" ${d(1)}>${esc(s.title)}</div></div>
        <div class="player paused rv" ${d(2)} id="player"></div>
      </div>`,

    photo: s => `
      <div class="photoslide">
        <div><div class="kicker rv" ${d(0)}>${esc(s.kicker)}</div><div class="h2 rv" ${d(1)}>${esc(s.title)}</div>
          <div class="lead rv" ${d(2)} style="font-size:34px;color:var(--muted);margin-top:30px;font-weight:600">Obrigado a cada pessoa que fez 2026 acontecer.</div></div>
        <div class="bigframe zoomIn" ${d(2)} style="height:780px"><img src="${pic(s, 1.28)}" alt="${esc(s.title)}"></div>
      </div>`,

    divider: s => `
      <div class="bgimg" style="background-image:url('${s.img}')"></div>
      <div class="txt">
        <div class="kicker rv" ${d(0)}>${esc(s.kicker)}</div>
        <div class="h1 rv" ${d(1)}>${esc(s.title)}</div>
        <div class="sub rv" ${d(2)}>${esc(s.sub)}</div>
      </div>`,

    champs: s => {
      const n = s.people.length;
      const [ar1, ar2] = (s.aspect || '3/4').split('/').map(Number);
      const ratio = ar1 / ar2;
      // altura disponível ~ 560px p/ foto; largura conforme quantidade
      const maxH = n === 1 ? 480 : n <= 3 ? 430 : 360;
      const maxW = n === 1 ? 1100 : n === 2 ? 540 : n === 3 ? 470 : 300;
      const w = Math.min(maxW, maxH * ratio);
      const nf = n >= 5 ? 24 : n >= 3 ? 30 : 36;
      const cards = s.people.map((p, i) => {
        const silver = p.place === 2;
        return `
        <div class="champ ${silver ? 'silver' : 'gold'}${n === 1 ? ' solo' : ''}" style="--w:${w}px;--ar:${s.aspect || '3/4'};--d:${(0.35 + i * 0.15).toFixed(2)}s;--nf:${nf}px;--sh:${silver ? 34 : 56}px">
          <span class="badge">${p.place}º<small>LUGAR</small></span><div class="frame"><div class="ring"></div><img src="${pic(p, ratio)}" alt="${esc(p.name)}"></div>
          <div class="plate rv" style="--d:${(0.7 + i * 0.15).toFixed(2)}s"><div class="nm">${esc(p.name)}</div><div class="dt">${esc(p.detail)}</div></div>
          <div class="step rv" style="--d:${(0.8 + i * 0.15).toFixed(2)}s">${silver ? 'VICE' : 'CAMPEÃO'}</div>
        </div>`;
      }).join('');
      return `
      <div class="champs">
        <div class="top"><div><div class="kicker rv" ${d(0)}>Premiação · ${esc(s.group)}</div><div class="h2 rv" ${d(1)}>${esc(s.sport)}</div></div>
          ${s.stage ? `<div class="stagepill rv" ${d(2)}>${esc(s.stage)}</div>` : ''}</div>
        <div class="podium"><div class="rays"></div>${cards}</div>
      </div>`;
    },

    race: s => `
      <div class="race">
        <div><div class="kicker rv" ${d(0)}>Premiação · ${esc(s.group)}</div><div class="h2 rv" ${d(1)}>${esc(s.sport)}</div>
          <div class="bigframe zoomIn" ${d(2)} style="height:600px"><img src="${pic(s, 1.28)}" alt=""></div></div>
        <div style="padding-top:40px"><div class="stagepill rv" ${d(2)} style="display:inline-block">${esc(s.stage)}</div>
          <div class="racecols">${s.cols.map((c, ci) => `
            <div class="racecol"><h3 class="rv" ${d(3 + ci)}>${esc(c.title)}</h3>
              ${c.rows.map((r, ri) => `<div class="runner rv" ${d(4 + ri + ci * 5)}><span class="md">1º</span><span><b>${esc(r[0])}</b><span>${esc(r[1])}</span></span></div>`).join('')}
            </div>`).join('')}</div></div>
      </div>`,

    team: s => `
      <div class="teamslide">
        <div><div class="kicker rv" ${d(0)}>Premiação · Coletivas</div><div class="h2 rv" ${d(1)}>${esc(s.sport)}</div>
          <div class="trophy rv" ${d(2)}>🏆</div>
          <div class="teamname goldtext rv ${s.team.length > 12 ? 'sm' : ''}" ${d(3)}>${esc(s.team)}</div>
          ${s.members ? '' : `<div class="teamlbl rv" ${d(4)}>Equipe campeã</div>`}
          ${s.members ? `<div class="members rv" ${d(5)}>${s.members.map(m => `<span>${esc(m)}</span>`).join('')}</div>` : ''}
        </div>
        <div class="teamframe zoomIn" ${d(2)}><div class="ring"></div><img src="${pic(s, 1.15, 1200)}" alt="${esc(s.sport)}"></div>
      </div>`,

    final: s => `
      <div class="bgimg" style="background-image:url('${s.img}')"></div>
      <div class="txt">
        <div class="h1 goldtext zoomIn" ${d(0)}>${esc(s.title)}</div>
        <div class="sub rv" ${d(2)}>${esc(s.sub)}</div>
        <div class="tag rv" ${d(3)}>MELHORES DO ANO AV 2026</div>
      </div>`
  };

  host.innerHTML = D.map((s, i) =>
    `<section class="slide t-${s.type}" data-i="${i}" data-type="${s.type}">${R[s.type](s)}</section>`).join('');
  const slides = [...host.children];

  // vídeo
  const playerEl = document.getElementById('player');
  const video = playerEl && window.ModalidadesVideo ? window.ModalidadesVideo.mount(playerEl) : null;

  // escala do palco
  const stage = document.getElementById('stage');
  function fit() {
    const k = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transform = `translate(-50%, -50%) scale(${k})`;
    stage.style.transformOrigin = 'center center';
  }
  addEventListener('resize', fit); fit();

  // contagem animada
  function countUp(el) {
    const to = +el.dataset.count, t0 = performance.now(), dur = 1600;
    (function step(t) {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  // confete dourado nos slides de campeões
  const cf = document.getElementById('confetti'), cx = cf.getContext('2d');
  let bits = [], cfRun = false;
  function confetti() {
    const cols = ['#f2b632', '#ffe08a', '#ffffff', '#2f8fe8', '#c98b1c'];
    for (let i = 0; i < 160; i++) bits.push({
      x: 960 + (Math.random() - .5) * 400, y: 380, vx: (Math.random() - .5) * 26, vy: -10 - Math.random() * 18,
      w: 8 + Math.random() * 10, h: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - .5) * .4,
      c: cols[i % cols.length], life: 0
    });
    if (!cfRun) { cfRun = true; requestAnimationFrame(cfStep); }
  }
  function cfStep() {
    cx.clearRect(0, 0, 1920, 1080);
    bits = bits.filter(b => b.y < 1150 && b.life < 260);
    for (const b of bits) {
      b.life++; b.vy += .45; b.vx *= .985; b.x += b.vx; b.y += b.vy; b.r += b.vr;
      cx.save(); cx.translate(b.x, b.y); cx.rotate(b.r); cx.fillStyle = b.c;
      cx.globalAlpha = Math.max(0, 1 - b.life / 260);
      cx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h * Math.abs(Math.cos(b.life / 8))); cx.restore();
    }
    if (bits.length) requestAnimationFrame(cfStep); else { cfRun = false; cx.clearRect(0, 0, 1920, 1080); }
  }

  // navegação
  let cur = -1, auto = false, autoT = null;
  const prog = document.getElementById('progress'), counter = document.getElementById('counter');
  function go(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    if (i === cur) return;
    if (cur >= 0) slides[cur].classList.remove('active');
    cur = i;
    const s = slides[cur];
    s.classList.add('active');
    // reinicia animações
    s.querySelectorAll('.rv,.zoomIn,.frame,.bgimg').forEach(el => { el.style.animation = 'none'; el.offsetWidth; el.style.animation = ''; });
    s.querySelectorAll('[data-count]').forEach(countUp);
    const type = s.dataset.type;
    if (type === 'champs' || type === 'team' || type === 'final' || type === 'race') setTimeout(confetti, 500);
    if (video) { if (type === 'video') video.play(true); else video.pause(); }
    prog.style.width = ((cur + 1) / slides.length * 100) + '%';
    counter.textContent = `${cur + 1} / ${slides.length}`;
    history.replaceState(null, '', '#' + (cur + 1));
    schedule();
  }
  const next = () => go(cur + 1), prev = () => go(cur - 1);

  function schedule() {
    clearTimeout(autoT);
    if (!auto) return;
    const type = slides[cur].dataset.type;
    if (type === 'video') return; // avança quando o vídeo terminar
    const ms = { cover: 7000, numbers: 9000, list: 10000, champs: 9000, race: 12000, team: 8000, divider: 5000, photo: 7000, final: 0 }[type] ?? 8000;
    if (ms && cur < slides.length - 1) autoT = setTimeout(next, ms);
  }
  if (video) video.onEnd = () => { if (auto) next(); };

  const bPlay = document.getElementById('bPlay');
  function toggleAuto() { auto = !auto; bPlay.classList.toggle('on', auto); bPlay.textContent = auto ? '❚❚ Auto' : '▶ Auto'; schedule(); }

  document.getElementById('bNext').onclick = next;
  document.getElementById('bPrev').onclick = prev;
  bPlay.onclick = toggleAuto;
  const full = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
  document.getElementById('bFull').onclick = full;
  host.addEventListener('click', e => { if (e.target.closest('[data-next]')) next(); });

  addEventListener('keydown', e => {
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); prev(); }
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(slides.length - 1);
    else if (e.key === 'f' || e.key === 'F') full();
    else if (e.key === 'p' || e.key === 'P') toggleAuto();
  });

  // toque (celular/tablet)
  let tx = null;
  addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  addEventListener('touchend', e => { if (tx == null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) dx < 0 ? next() : prev(); tx = null; });

  // esconde os controles quando o mouse fica parado
  const hud = document.getElementById('hud'); let hT;
  function wake() { hud.classList.remove('hide'); document.body.style.cursor = ''; clearTimeout(hT); hT = setTimeout(() => { hud.classList.add('hide'); document.body.style.cursor = 'none'; }, 2500); }
  addEventListener('mousemove', wake); wake();

  window.__go = n => go(n - 1);
  go((parseInt(location.hash.slice(1), 10) || 1) - 1);
  }
})();
