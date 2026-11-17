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
  // texto pequeno amarelo acima do título (só aparece se existir no data.js)
  const K = t => t ? `<div class="kicker rv" ${d(0)}>${esc(t)}</div>` : '';

  // ícones dos esportes (desenho de linha, na cor dourada)
  const ICONS = {
    volei: '<circle cx="12" cy="12" r="9"/><path d="M12 3c-1.5 4-.5 8.5 3 11.5M3.4 9.6c4.2.9 8.6-.3 11.6-3.4M6.6 19.2c2-3.6 6.2-5.6 11.4-5.4"/>',
    futsal: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5l3.4 2.4-1.3 4H9.9l-1.3-4zM12 3v4.5M15.4 9.9l4.2-1.4M14.1 13.9l2.6 3.7M9.9 13.9l-2.6 3.7M8.6 9.9L4.4 8.5"/>',
    fut7: '<path d="M2.5 19V6.5h19V19"/><path d="M2.5 10.5h19M2.5 14.5h19M7.25 6.5V19M12 6.5V19M16.75 6.5V19" opacity=".45"/><circle cx="17.5" cy="18.5" r="2.6" fill="currentColor" stroke="none"/>',
    basquete: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18M5.6 5.6c3.2 3.2 3.2 9.6 0 12.8M18.4 5.6c-3.2 3.2-3.2 9.6 0 12.8"/>',
    xadrez: '<path d="M7 20.5h10.5M8.5 20.5c0-3 1.2-5.2 3.6-7.4-2.6.4-4.6-.6-4.6-2.6L11 5l1.4 1.2C16 7 17.5 10.5 17 14.5l-.6 6"/><circle cx="11.2" cy="8.6" r=".9" fill="currentColor"/>',
    tenis: '<ellipse cx="9.5" cy="9" rx="5.6" ry="6.8" transform="rotate(-38 9.5 9)"/><path d="M13.6 13.3l6.6 6.6M6 6.5l7 5.2M7.3 12.6l5.2-6.8" opacity=".55"/><circle cx="19" cy="5" r="2.2"/>',
    truco: '<rect x="3.5" y="5" width="10" height="14" rx="2" transform="rotate(-12 8.5 12)"/><rect x="10" y="4" width="10" height="14" rx="2" transform="rotate(10 15 11)"/><path d="M15.2 9.2l1 2 -1 2-1-2z" fill="currentColor"/>',
    poker: '<path d="M12 3.2c2.6 3.6 7 5.8 7 9.6a3.9 3.9 0 0 1-6.3 3.1l1.1 4.6H10.2l1.1-4.6A3.9 3.9 0 0 1 5 12.8c0-3.8 4.4-6 7-9.6z"/>',
    futevolei: '<circle cx="12" cy="7.5" r="4"/><path d="M2 20c3-2 5.5-2 8 0s5 2 8 0c1.4-.9 2.6-1.2 4-1"/><path d="M3 15.5h18" stroke-dasharray="2 2"/>',
    bola8: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="11" r="4.2"/><path d="M12 9.1a.95.95 0 1 1 0 1.9.95.95 0 1 1 0-1.9zM12 11a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 1 1 0-2.2z"/>'
  };
  const icon = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[k] || ''}</svg>`;

  // troféu da capa (desenhado em SVG, com o logo da Associação Volvo na base)
  const TROPHY = `
    <svg class="trophy-svg" viewBox="0 0 600 780" aria-label="Troféu Associação Volvo">
      <defs>
        <linearGradient id="tg" x1="0" x2="1"><stop offset="0" stop-color="#7a4c0c"/><stop offset=".22" stop-color="#d99a26"/><stop offset=".45" stop-color="#fff2b8"/><stop offset=".62" stop-color="#f2b632"/><stop offset="1" stop-color="#8a5a10"/></linearGradient>
        <linearGradient id="tg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset="1" stop-color="#b8801c"/></linearGradient>
        <linearGradient id="shine" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
        <clipPath id="cupclip"><path d="M150 118h300c0 205-66 300-150 312-84-12-150-107-150-312z"/></clipPath>
      </defs>
      <path d="M160 150c-95-8-112 150 40 205" fill="none" stroke="url(#tg)" stroke-width="26" stroke-linecap="round"/>
      <path d="M440 150c95-8 112 150-40 205" fill="none" stroke="url(#tg)" stroke-width="26" stroke-linecap="round"/>
      <path d="M150 118h300c0 205-66 300-150 312-84-12-150-107-150-312z" fill="url(#tg)"/>
      <g clip-path="url(#cupclip)"><rect class="shinebar" x="-160" y="80" width="110" height="420" fill="url(#shine)" transform="skewX(-18)"/></g>
      <ellipse cx="300" cy="118" rx="150" ry="24" fill="url(#tg2)"/>
      <ellipse cx="300" cy="118" rx="128" ry="15" fill="#7a4c0c" opacity=".55"/>
      <path d="M300 205l17 35 39 5-28 27 7 38-35-18-35 18 7-38-28-27 39-5z" fill="#fff7d6" opacity=".95"/>
      <path d="M268 428h64l-10 92h-44z" fill="url(#tg)"/>
      <ellipse cx="300" cy="470" rx="34" ry="12" fill="url(#tg2)"/>
      <path d="M205 520h190l34 62H171z" fill="url(#tg)"/>
      <rect x="140" y="582" width="320" height="150" rx="14" fill="#06173d" stroke="url(#tg)" stroke-width="7"/>
      <image href="img/logo-associacao-volvo.png" x="168" y="618" width="264" height="29" preserveAspectRatio="xMidYMid meet"/>
      <text x="300" y="690" text-anchor="middle" fill="#f2b632" font-family="Montserrat, Arial" font-weight="800" font-size="24" letter-spacing="5">MELHORES DO ANO</text>
      <text x="300" y="718" text-anchor="middle" fill="#ffffff" font-family="Montserrat, Arial" font-weight="900" font-size="22" letter-spacing="6">2026</text>
    </svg>`;

  const R = {
    cover: s => `
      <div class="cover">
        <div>
          ${K(s.kicker)}
          <div class="h1 rv" ${d(1)}>${s.title.map(esc).join('<br>')}</div>
          <div class="tag rv" ${d(3)}>${esc(s.tag)}</div>
        </div>
        <div class="trophy-wrap zoomIn" ${d(2)}>
          <div class="trophy-rays"></div><div class="trophy-glow"></div>
          ${TROPHY}
          <i class="spark s1"></i><i class="spark s2"></i><i class="spark s3"></i><i class="spark s4"></i><i class="spark s5"></i>
        </div>
      </div>`,

    numbers: s => `
      ${K(s.kicker)}
      <div class="h2 rv" ${d(1)}>${esc(s.title)}</div>
      <div class="numgrid">${s.items.map((it, i) => `
        <div class="stat rv" ${d(i + 2)}><b class="goldtext" data-count="${it.n}">0</b>
          <span class="l">${esc(it.label)}</span><span class="s">${esc(it.sub)}</span></div>`).join('')}
      </div>`,

    list: s => {
      const items = s.items.map((it, i) => `
        <div class="item rv${it[0] ? '' : ' plain'}" ${d(i + 2)}>${it[0] && it[0].startsWith('ic:')
          ? `<span class="ic sport">${icon(it[0].slice(3))}</span>`
          : it[0] && it[0].startsWith('img/') ? `<img class="thumb" src="${it[0]}" alt="">` : ''}
          <span><span class="t">${esc(it[1])}</span>${it[2] ? `<br><span class="n">${esc(it[2])}</span>` : ''}</span></div>`).join('');
      const head = `${K(s.kicker)}<div class="h2 rv" ${d(1)}>${esc(s.title)}</div>`;
      if (s.variant === 'sports') return `
        <div class="listhead">${`<div>${head}</div>`}${s.cta ? `<button class="cta rv" ${d(4)} data-next><i>▶</i>${esc(s.cta)}</button>` : ''}</div>
        <div class="items sportsgrid">${items}</div>`;
      return `${head}<div class="items ${s.variant === 'grid' ? 'g3' : s.variant === 'dense' ? 'g3 dense' : ''}">${items}</div>`;
    },

    video: s => `
      <div class="videoslide big">
        <div class="vmain big rv" ${d(1)} data-yt="${(s.youtube && s.youtube[0] && s.youtube[0].id) || 'anim'}"><div class="ytbox"><div id="ytplayer"></div></div><div class="player paused" id="player" hidden></div></div>
      </div>`,

    photo: s => `
      <div class="photoslide">
        <div>${K(s.kicker)}<div class="h2 rv" ${d(1)}>${esc(s.title)}</div>
          <div class="lead rv" ${d(2)} style="font-size:34px;color:var(--muted);margin-top:30px;font-weight:600">Obrigado a cada pessoa que fez 2026 acontecer.</div></div>
        <div class="bigframe zoomIn" ${d(2)} style="height:780px"><img src="${pic(s, 1.28)}" alt="${esc(s.title)}"></div>
      </div>`,

    divider: s => `
      <div class="bgimg" style="background-image:url('${s.img}')"></div>
      <div class="txt">
        ${K(s.kicker)}
        <div class="h1 rv" ${d(1)}>${esc(s.title)}</div>
        <div class="sub rv" ${d(2)}>${esc(s.sub)}</div>
        ${s.list ? `<div class="mlist">${s.list.map((x, i) => `<span class="rv" ${d(i + 4)}>${esc(x)}</span>`).join('')}</div>` : ''}
      </div>`,

    champs: s => s.photo ? R.champsPhoto(s) : R.champsArt(s),

    champsArt: s => {
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
        <div class="top"><div><div class="h2 rv" ${d(1)}>${esc(s.sport)}</div></div>
          ${s.stage ? `<div class="stagepill rv" ${d(2)}>${esc(s.stage)}</div>` : ''}</div>
        <div class="podium"><div class="rays"></div>${cards}</div>
      </div>`;
    },

    // campeões: foto real da modalidade (Família AV) + placas com medalha e nome
    champsPhoto: s => {
      const n = s.people.length;
      const plates = s.people.map((p, i) => {
        const silver = p.place === 2;
        return `
          <div class="plate2 ${silver ? 'silver' : 'gold'} rv" style="--d:${(0.45 + i * 0.12).toFixed(2)}s">
            <div class="medal"><b>${p.place}º</b><small>LUGAR</small></div>
            <div class="pt"><div class="nm">${esc(p.name)}</div><div class="dt">${esc(p.detail)}</div></div>
            <div class="lbl">${silver ? 'VICE' : 'CAMPEÃO'}</div>
          </div>`;
      }).join('');
      return `
      <div class="champs cp">
        <div class="top"><div><div class="h2 rv" ${d(1)}>${esc(s.sport)}</div></div>
          ${s.stage ? `<div class="stagepill rv" ${d(2)}>${esc(s.stage)}</div>` : ''}</div>
        <div class="cpbody">
          <div class="cpphoto zoomIn" ${d(2)}><div class="ring"></div><img src="${s.photo}" alt="${esc(s.sport)}"><span class="credit">Foto ilustrativa · Família AV</span></div>
          <div class="plates n${n}">${plates}</div>
        </div>
      </div>`;
    },

    race: s => `
      <div class="race">
        <div><div class="h2 rv" ${d(1)}>${esc(s.sport)}</div>
          <div class="bigframe zoomIn" ${d(2)} style="height:600px"><img src="${pic(s, 1.28)}" alt=""></div></div>
        <div style="padding-top:40px"><div class="stagepill rv" ${d(2)} style="display:inline-block">${esc(s.stage)}</div>
          <div class="racecols">${s.cols.map((c, ci) => `
            <div class="racecol"><h3 class="rv" ${d(3 + ci)}>${esc(c.title)}</h3>
              ${c.rows.map((r, ri) => `<div class="runner rv" ${d(4 + ri + ci * 5)}><span class="md">1º</span><span><b>${esc(r[0])}</b><span>${esc(r[1])}</span></span></div>`).join('')}
            </div>`).join('')}</div></div>
      </div>`,

    team: s => `
      <div class="teamslide">
        <div><div class="h2 rv" ${d(1)}>${esc(s.sport)}</div>
          <div class="teamname goldtext rv ${s.team.length > 12 ? 'sm' : ''}" ${d(3)}>${esc(s.team)}</div>
          ${s.members ? '' : `<div class="teamlbl rv" ${d(4)}>Equipe campeã</div>`}
          ${s.members ? `<div class="members rv" ${d(5)}>${s.members.map(m => `<span>${esc(m)}</span>`).join('')}</div>` : ''}
        </div>
        <div class="teamframe zoomIn" ${d(2)}><div class="ring"></div><img src="${pic(s, 1.15, 1200)}" alt="${esc(s.sport)}"><span class="credit">Foto ilustrativa · Família AV</span></div>
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
    if (type === 'video') playCurrent(); else stopVideos();
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

  /* ---------- vídeos do YouTube (Família AV) ---------- */
  const firstItem = document.querySelector('.vitem.on') || document.querySelector('.vmain[data-yt]');
  let currentVid = firstItem ? firstItem.dataset.yt : 'anim';
  let yt = null, ytLoading = false;
  const ytbox = document.querySelector('.ytbox');
  function loadYT() {
    if (yt || ytLoading) return;
    ytLoading = true;
    const create = () => {
      yt = new YT.Player('ytplayer', {
        host: 'https://www.youtube-nocookie.com', videoId: currentVid,
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1, autoplay: 1 },
        events: {
          onReady: e => { if (slides[cur].dataset.type === 'video' && currentVid !== 'anim') e.target.playVideo(); },
          onStateChange: e => { if (e.data === 0 && auto) next(); }
        }
      });
    };
    if (window.YT && YT.Player) return create();
    window.onYouTubeIframeAPIReady = create;
    const sc = document.createElement('script'); sc.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(sc);
  }
  function showAnim(on) {
    if (playerEl) playerEl.hidden = !on;
    if (ytbox) ytbox.hidden = on;
  }
  function playCurrent() {
    if (currentVid === 'anim') { showAnim(true); if (yt && yt.pauseVideo) yt.pauseVideo(); if (video) video.play(true); return; }
    showAnim(false); if (video) video.pause();
    if (!yt) loadYT();
    else if (yt.getVideoData && yt.getVideoData().video_id !== currentVid) yt.loadVideoById(currentVid);
    else if (yt.playVideo) yt.playVideo();
  }
  function stopVideos() {
    if (video) video.pause();
    if (yt && yt.pauseVideo) yt.pauseVideo();
  }
  document.querySelectorAll('.vitem').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    document.querySelectorAll('.vitem').forEach(x => x.classList.toggle('on', x === b));
    currentVid = b.dataset.yt;
    playCurrent();
  }));

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
