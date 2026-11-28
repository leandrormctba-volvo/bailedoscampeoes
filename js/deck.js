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
    corrida: '<circle cx="14.5" cy="4.5" r="2"/><path d="M8 21l3-6 3 2v5M6 12l3-4 4 1 3 4h3M11 15l-1-5"/>',
    pingpong: '<circle cx="9.5" cy="9.5" r="6"/><path d="M13.7 13.7l5.8 5.8"/><circle cx="19" cy="6" r="1.8" fill="currentColor" stroke="none"/>',
    cartola: '<path d="M7 17V6.5c0-1 2.2-1.8 5-1.8s5 .8 5 1.8V17"/><path d="M3 17.5c0 1.4 4 2.5 9 2.5s9-1.1 9-2.5-4-2.5-9-2.5-9 1.1-9 2.5z"/><path d="M7 13.5c1.5.8 3 1 5 1s3.5-.2 5-1"/>',
    bola8: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="11" r="4.2"/><path d="M12 9.1a.95.95 0 1 1 0 1.9.95.95 0 1 1 0-1.9zM12 11a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 1 1 0-2.2z"/>'
  };
  const icon = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[k] || ''}</svg>`;

  // box 3D com o nome da modalidade (Opção 2: usado no lugar da foto nos slides de premiados)
  const sportIcon = n => /corrida/i.test(n) ? 'corrida' : /mesa/i.test(n) ? 'pingpong' : /tênis/i.test(n) ? 'tenis' : /poker/i.test(n) ? 'poker'
    : /futev/i.test(n) ? 'futevolei' : /vôlei/i.test(n) ? 'volei' : /truco/i.test(n) ? 'truco' : /xadrez/i.test(n) ? 'xadrez'
    : /basquete/i.test(n) ? 'basquete' : /futsal/i.test(n) ? 'futsal' : /fut/i.test(n) ? 'fut7' : '';
  const SBOX = s => `
    <div class="sbox zoomIn" ${d(1)}><div class="sbox-face">
      <div class="sbox-ic">${icon(sportIcon(s.sport))}</div>
      <div class="sbox-t${s.sport.length > 14 ? ' long' : ''}">${esc(s.sport)}</div>
      ${s.stage && !/^\d{4}$/.test(s.stage) ? `<div class="sbox-s">${esc(s.stage)}</div>` : ''}
      <div class="sbox-k">Campeões 2026</div>
    </div></div>`;

  // estrela dourada facetada (efeito metálico 3D, luz vindo do alto à esquerda)
  const STAR = (() => {
    const C = 300, R = 280, r = 112, L = [-0.55, -0.83];
    const P = (a, rad) => [C + rad * Math.cos(a * Math.PI / 180), C + rad * Math.sin(a * Math.PI / 180)];
    const lo = [96, 56, 6], hi = [255, 246, 205];
    const col = t => `rgb(${lo.map((v, i) => Math.round(v + (hi[i] - v) * t)).join(',')})`;
    let facets = '', outline = [];
    for (let k = 0; k < 5; k++) {
      const a = -90 + 72 * k, O = P(a, R), Ia = P(a - 36, r), Ib = P(a + 36, r);
      outline.push(Ia, O);
      for (const I of [Ia, Ib]) {
        // normal da face = perpendicular à aresta externa, apontando para fora
        let nx = -(O[1] - I[1]), ny = O[0] - I[0];
        const mx = (O[0] + I[0]) / 2 - C, my = (O[1] + I[1]) / 2 - C;
        if (nx * mx + ny * my < 0) { nx = -nx; ny = -ny; }
        const n = Math.hypot(nx, ny), t = Math.max(0, Math.min(1, .5 + .55 * ((nx / n) * L[0] + (ny / n) * L[1])));
        facets += `<path d="M${C} ${C}L${I.map(v => v.toFixed(1))}L${O.map(v => v.toFixed(1))}Z" fill="${col(t)}"/>`;
      }
    }
    const pts = outline.map(p => p.map(v => v.toFixed(1)).join(' ')).join(' L');
    return `
    <svg class="star-svg" viewBox="0 0 600 600" aria-label="Estrela dourada">
      <defs>
        <radialGradient id="sg" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/></radialGradient>
        <linearGradient id="shine" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
        <clipPath id="starclip"><path d="M${pts}Z"/></clipPath>
      </defs>
      <g class="starfaces">${facets}</g>
      <path d="M${pts}Z" fill="url(#sg)"/>
      <g clip-path="url(#starclip)"><rect class="shinebar" x="-200" y="-40" width="120" height="700" fill="url(#shine)" transform="skewX(-18)"/></g>
      <path d="M${pts}Z" fill="none" stroke="#ffe9a8" stroke-width="3" stroke-linejoin="round" opacity=".85"/>
    </svg>`;
  })();

  const R = {
    cover: s => `
      <div class="cover">
        <div>
          ${K(s.kicker)}
          <div class="h1 rv" ${d(1)}>${s.title.map(esc).join('<br>')}</div>
          <div class="tag rv" ${d(3)}>${esc(s.tag)}</div>
        </div>
        <div class="trophy-wrap star-wrap zoomIn" ${d(2)}>
          <div class="trophy-rays"></div><div class="trophy-glow"></div>
          <div class="flare h"></div><div class="flare v"></div>
          ${STAR}
          <div class="star-core"></div>
          <i class="spark s1"></i><i class="spark s2"></i><i class="spark s3"></i><i class="spark s4"></i><i class="spark s5"></i>
        </div>
      </div>`,

    numbers: s => `
      ${K(s.kicker)}
      <div class="h2 rv" ${d(1)}>${esc(s.title)}</div>
      <div class="numgrid">${s.items.map((it, i) => `
        <div class="stat rv" ${d(i + 2)}><b class="goldtext" data-count="${it.n}"${it.pre ? ` data-pre="${esc(it.pre)}"` : ''}>0</b>
          <span class="l">${esc(it.label)}</span><span class="s">${esc(it.sub)}</span></div>`).join('')}
      </div>`,

    list: s => {
      const items = s.items.map((it, i) => `
        <div class="item rv${it[0] ? '' : ' plain'}" ${d(i + 2)}>${it[0] && it[0].startsWith('ic:')
          ? `<span class="ic sport">${icon(it[0].slice(3))}</span>`
          : it[0] && it[0].startsWith('img/') ? `<img class="thumb" src="${it[0]}" alt="">`
          : it[0] === '?' ? '<span class="thumb ph">?</span>' : ''}
          <span><span class="t">${esc(it[1])}</span>${it[2] ? `<br><span class="n">${esc(it[2])}</span>` : ''}</span></div>`).join('');
      const head = `${K(s.kicker)}<div class="h2 rv" ${d(1)}>${esc(s.title)}</div>`;
      if (s.variant === 'sports') return `
        <div class="listhead">${`<div>${head}</div>`}${s.cta ? `<button class="cta rv" ${d(4)} data-next><i>▶</i>${esc(s.cta)}</button>` : ''}</div>
        <div class="items sportsgrid${s.items.length > 10 ? ' g3' : ''}">${items}</div>`;
      return `${head}<div class="items ${s.variant === 'grid' ? 'g3' : s.variant === 'dense' ? 'g3 dense' + (s.items.length === 10 ? ' c5' : '') : s.variant === 'photos' ? 'g3 photos' : ''}">${items}</div>`;
    },

    video: s => `
      <div class="videoslide big">
        <div class="vmain big rv" ${d(1)} data-yt="${(s.youtube && s.youtube[0] && s.youtube[0].id) || 'anim'}"><div class="ytbox"><div id="ytplayer"></div></div><div class="player paused" id="player" hidden></div></div>
      </div>`,

    // capa "gala" (Opção 2): estrela + MELHORES DO ANO dourado; fundo e brilhos caindo ficam na tela toda (js/gala.js)
    gala: s => `
      <div class="gala">
        <div class="g-star zoomIn"><div class="g-glow"></div><div class="g-flare"></div>${STAR}</div>
        <div class="g-word rv" ${d(2)}>Melhores</div>
        <div class="g-word rv" ${d(3)}>do ano</div>
        <div class="g-rule rv" ${d(5)}><i></i><b></b><span>AV 2026</span><b></b><i></i></div>
      </div>`,

    // imagem ocupando a tela toda
    image: s => `<img class="fullimg" src="${s.img}" alt="${esc(s.alt || '')}">`,

    // vídeo (arquivo) ocupando a tela toda; toca sozinho ao entrar no slide
    vfile: s => `<video class="vfull" src="${s.src}" preload="none" playsinline title="${esc(s.title || '')}"></video>`,

    photo: s => `
      <div class="photoslide top">
        <div class="h2 rv" ${d(1)}>${esc(s.title)}</div>
        <div class="bigframe zoomIn" ${d(2)}><img src="${pic(s, 1.28)}" alt="${esc(s.title)}"></div>
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
        const silver = p.place === 2, bronze = p.place === 3;
        return `
          <div class="plate2 ${bronze ? 'bronze' : silver ? 'silver' : 'gold'} rv" style="--d:${(0.45 + i * 0.12).toFixed(2)}s">
            <div class="medal"><b>${p.place}º</b><small>LUGAR</small></div>
            <div class="pt"><div class="nm${p.name.includes('\n') ? ' two' : ''}">${esc(p.name).replace(/\n/g, '<br>')}</div><div class="dt">${esc(p.detail)}</div></div>
            <div class="lbl">${bronze ? '3º LUGAR' : silver ? 'VICE' : 'CAMPEÃO'}</div>
          </div>`;
      }).join('');
      if (window.O2_SPORTBOX) return `
      <div class="champs cp sb">${SBOX(s)}<div class="plates n${n}">${plates}</div></div>`;
      return `
      <div class="champs cp">
        <div class="top"><div><div class="h2 rv" ${d(1)}>${esc(s.sport)}</div></div>
          ${s.stage ? `<div class="stagepill rv" ${d(2)}>${esc(s.stage)}</div>` : ''}</div>
        <div class="cpbody">
          <div class="cpphoto zoomIn" ${d(2)}><div class="ring"></div><img src="${s.photo}" alt="${esc(s.sport)}">${String(s.photo).includes('img/videos/') ? '' : '<span class="credit">Foto ilustrativa · Família AV</span>'}</div>
          <div class="plates n${n}">${plates}</div>
        </div>
      </div>`;
    },

    race: s => window.O2_SPORTBOX ? `
      <div class="race sb">${SBOX(s)}
        <div class="racecols">${s.cols.map((c, ci) => `
          <div class="racecol"><h3 class="rv" ${d(3 + ci)}>${esc(c.title)}</h3>
            ${c.rows.map((r, ri) => `<div class="runner rv" ${d(4 + ri + ci * 5)}><span class="md p${r[2] || 1}">${r[2] || 1}º</span><span><b>${esc(r[0])}</b><span>${esc(r[1])}</span></span></div>`).join('')}
          </div>`).join('')}</div>
      </div>` : `
      <div class="race">
        <div><div class="h2 rv" ${d(1)}>${esc(s.sport)}</div>
          <div class="bigframe zoomIn" ${d(2)} style="height:600px"><img src="${pic(s, 1.28)}" alt=""></div></div>
        <div style="padding-top:40px"><div class="stagepill rv" ${d(2)} style="display:inline-block">${esc(s.stage)}</div>
          <div class="racecols">${s.cols.map((c, ci) => `
            <div class="racecol"><h3 class="rv" ${d(3 + ci)}>${esc(c.title)}</h3>
              ${c.rows.map((r, ri) => `<div class="runner rv" ${d(4 + ri + ci * 5)}><span class="md p${r[2] || 1}">${r[2] || 1}º</span><span><b>${esc(r[0])}</b><span>${esc(r[1])}</span></span></div>`).join('')}
            </div>`).join('')}</div></div>
      </div>`,

    team: s => window.O2_SPORTBOX ? `
      <div class="teamslide sb">${SBOX(s)}
        <div class="sbteam">
          <div class="teamlbl rv" ${d(3)}>Equipe campeã</div>
          <div class="teamname goldtext rv ${s.team.length > 12 ? 'sm' : ''}" ${d(4)}>${esc(s.team)}</div>
          ${s.members ? `<div class="members rv" ${d(5)}>${s.members.map(m => `<span>${esc(m)}</span>`).join('')}</div>` : ''}
        </div>
      </div>` : `
      <div class="teamslide">
        <div><div class="h2 rv" ${d(1)}>${esc(s.sport)}</div>
          <div class="teamname goldtext rv ${s.team.length > 12 ? 'sm' : ''}" ${d(3)}>${esc(s.team)}</div>
          ${s.members ? '' : `<div class="teamlbl rv" ${d(4)}>Equipe campeã</div>`}
          ${s.members ? `<div class="members rv" ${d(5)}>${s.members.map(m => `<span>${esc(m)}</span>`).join('')}</div>` : ''}
        </div>
        <div class="teamframe zoomIn" ${d(2)}><div class="ring"></div><img src="${pic(s, 1.15, 1200)}" alt="${esc(s.sport)}">${String(s.img).includes('img/videos/') ? '' : '<span class="credit">Foto ilustrativa · Família AV</span>'}</div>
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
  // celular em pé: palco vertical (1080 de largura, altura conforme a tela) com layout empilhado
  let SW = 1920, SH = 1080;
  function fit() {
    const portrait = innerHeight > innerWidth * 1.1;
    document.documentElement.classList.toggle('portrait', portrait);
    if (portrait) { SW = 1080; SH = Math.round(Math.min(2400, Math.max(1600, 1080 * innerHeight / innerWidth))); }
    else { SW = 1920; SH = 1080; }
    stage.style.width = SW + 'px'; stage.style.height = SH + 'px';
    const k = Math.min(innerWidth / SW, innerHeight / SH);
    stage.style.transform = `translate(-50%, -50%) scale(${k})`;
    stage.style.transformOrigin = 'center center';
    document.documentElement.style.setProperty('--k', k); // tamanho do logo do rodapé acompanha a tela
  }
  addEventListener('resize', fit); fit();

  // contagem animada
  function countUp(el) {
    const to = +el.dataset.count, t0 = performance.now(), dur = 1600;
    (function step(t) {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (el.dataset.pre || '') + Math.round(to * e).toLocaleString('pt-BR');
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  // confete dourado nos slides de campeões
  const cf = document.getElementById('confetti'), cx = cf.getContext('2d');
  let bits = [], cfRun = false;
  function confetti() {
    if (cf.width !== SW || cf.height !== SH) { cf.width = SW; cf.height = SH; }
    const cols = ['#f2b632', '#ffe08a', '#ffffff', '#2f8fe8', '#c98b1c'];
    for (let i = 0; i < 160; i++) bits.push({
      x: SW / 2 + (Math.random() - .5) * 400, y: SH * .35, vx: (Math.random() - .5) * 26, vy: -10 - Math.random() * 18,
      w: 8 + Math.random() * 10, h: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - .5) * .4,
      c: cols[i % cols.length], life: 0
    });
    if (!cfRun) { cfRun = true; requestAnimationFrame(cfStep); }
  }
  function cfStep() {
    cx.clearRect(0, 0, cf.width, cf.height);
    bits = bits.filter(b => b.y < SH + 70 && b.life < 260);
    for (const b of bits) {
      b.life++; b.vy += .45; b.vx *= .985; b.x += b.vx; b.y += b.vy; b.r += b.vr;
      cx.save(); cx.translate(b.x, b.y); cx.rotate(b.r); cx.fillStyle = b.c;
      cx.globalAlpha = Math.max(0, 1 - b.life / 260);
      cx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h * Math.abs(Math.cos(b.life / 8))); cx.restore();
    }
    if (bits.length) requestAnimationFrame(cfStep); else { cfRun = false; cx.clearRect(0, 0, cf.width, cf.height); }
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
    playFile(s);
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
    if (type === 'video' || type === 'vfile') return; // avança quando o vídeo terminar
    const ms = { cover: 7000, numbers: 9000, list: 10000, champs: 9000, race: 12000, team: 8000, divider: 5000, photo: 7000, final: 0 }[type] ?? 8000;
    if (ms && cur < slides.length - 1) autoT = setTimeout(next, ms);
  }
  if (video) video.onEnd = () => { if (auto) next(); };

  /* ---------- vídeos em arquivo (slides "vfile") ---------- */
  // ao entrar: começa do início e toca (com som; se o navegador bloquear, toca sem som);
  // ao sair: pausa. O próximo vídeo já vai sendo carregado.
  const files = [...document.querySelectorAll('video.vfull')];
  files.forEach(v => v.addEventListener('ended', () => { if (auto && slides[cur].contains(v)) next(); }));
  // baixa todos os vídeos em segundo plano, um por vez e na ordem da apresentação,
  // para que estejam inteiros no computador quando chegar a vez de cada um (sem travar)
  (async function baixarVideos() {
    for (const v of files) {
      try {
        const blob = await (await fetch(v.getAttribute('src'))).blob();
        // troca para a cópia baixada (se o vídeo estiver tocando agora, deixa como está)
        if (v.paused) v.src = URL.createObjectURL(blob);
        v.dataset.pronto = '1';
      } catch (e) { /* sem internet: o vídeo carrega normalmente quando o slide abrir */ }
    }
  })();
  function playFile(s) {
    files.forEach(v => { if (!s.contains(v)) v.pause(); });
    const v = s.querySelector('video.vfull');
    const nxt = slides[cur + 1] && slides[cur + 1].querySelector('video.vfull');
    if (nxt) nxt.preload = 'auto';
    if (!v) return;
    // tela cheia de verdade (quando a troca de slide veio de um clique ou tecla)
    if (!document.fullscreenElement && document.documentElement.requestFullscreen)
      document.documentElement.requestFullscreen().catch(() => {});
    v.preload = 'auto'; v.muted = false;
    try { v.currentTime = 0; } catch (e) {}
    const p = v.play();
    // só tenta de novo sem som se o navegador bloqueou o som (e o slide ainda está na tela)
    if (p && p.catch) p.catch(err => { if (err && err.name === 'NotAllowedError' && s.classList.contains('active')) { v.muted = true; v.play().catch(() => {}); } });
  }

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
  // clique no botão "próximo" de um slide, ou em qualquer lugar de um vídeo em tela cheia → próximo slide
  host.addEventListener('click', e => { if (e.target.closest('[data-next]') || e.target.closest('.t-vfile')) next(); });

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
  // window.START_AT_BEGINNING (definido no HTML): ao atualizar a página, sempre volta ao slide 1
  // ?s=N no endereço abre direto no slide N (útil para testar)
  const sQ = parseInt(new URLSearchParams(location.search).get('s'), 10);
  go(sQ ? sQ - 1 : window.START_AT_BEGINNING ? 0 : (parseInt(location.hash.slice(1), 10) || 1) - 1);
  }
})();
