/* =========================================================
   ILUSTRAÇÕES DOS CAMPEÕES (no lugar das fotos reais)
   Gera imagens no estilo do vídeo: atletas adultos com a camisa
   "ASSOCIAÇÃO VOLVO", número grande, troféu/medalha e o cenário
   de cada modalidade. Configuração de cada imagem: campo "art" em js/data.js
   ========================================================= */
(function () {
  const A = window.AVArt;
  if (!A) return;
  const { player, sky, banner, crowd, stadium, gym, beach, room, F, BLUE, NAVY, GOLD, SKINS, HAIRS } = A;
  const TAU = Math.PI * 2;

  function hash(s) { let h = 7; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; }

  /* ---------- objetos nas mãos ---------- */
  function trophy(angle, side, skin) {
    return (c, len) => {
      c.save(); c.translate(0, len + 2); c.rotate(side === 'R' ? angle : -angle);
      const g = c.createLinearGradient(-22, 0, 22, 0); g.addColorStop(0, '#a8700f'); g.addColorStop(.45, '#ffe9a0'); g.addColorStop(1, '#c48a1a');
      c.fillStyle = '#5a3a14'; c.fillRect(-12, -4, 24, 9);
      c.fillStyle = g; c.fillRect(-4, -24, 8, 21); c.fillRect(-9, -27, 18, 5);
      c.beginPath(); c.moveTo(-20, -62); c.lineTo(20, -62); c.quadraticCurveTo(20, -30, 0, -27); c.quadraticCurveTo(-20, -30, -20, -62); c.fill();
      c.strokeStyle = g; c.lineWidth = 3.5; c.beginPath(); c.arc(-21, -50, 8, Math.PI * .5, Math.PI * 1.5); c.stroke(); c.beginPath(); c.arc(21, -50, 8, -Math.PI * .5, Math.PI * .5); c.stroke();
      c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(-12, -58, 4, 22);
      c.fillStyle = skin; c.beginPath(); c.arc(0, 2, 7.5, 0, TAU); c.fill();
      c.restore();
    };
  }
  function medal(angle, side, silver, skin) {
    return (c, len) => {
      c.save(); c.translate(0, len + 2); c.rotate(side === 'R' ? angle : -angle);
      c.strokeStyle = BLUE; c.lineWidth = 4; c.beginPath(); c.moveTo(-5, 0); c.lineTo(0, 34); c.lineTo(5, 0); c.stroke();
      const g = c.createRadialGradient(-4, 42, 2, 0, 46, 16);
      g.addColorStop(0, silver ? '#ffffff' : '#fff6cf'); g.addColorStop(.5, silver ? '#c9d3e0' : GOLD); g.addColorStop(1, silver ? '#7c8796' : '#a8700f');
      c.fillStyle = g; c.beginPath(); c.arc(0, 48, 15, 0, TAU); c.fill();
      c.fillStyle = silver ? '#1f2a38' : '#3b2600'; c.font = `900 15px ${F}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(silver ? '2' : '1', 0, 49);
      c.fillStyle = skin; c.beginPath(); c.arc(0, 0, 7.5, 0, TAU); c.fill();
      c.restore();
    };
  }
  const held = {
    racket: () => A.racket('#0a4ea3'),
    paddle: () => A.paddle('#f2b632'),
    cards: () => (c, len) => { for (let i = 0; i < 3; i++) A.card(c, (i - 1) * 9, len + 16, 22, (i - 1) * .3, ['A♠', '7♥', 'K♦'][i], i === 1); },
    cue: () => (c, len) => { c.save(); c.translate(0, len); c.rotate(-.15); c.fillStyle = '#d9b27a'; c.fillRect(-3, -40, 6, 150); c.fillStyle = '#2a1a0a'; c.fillRect(-4, 70, 8, 40); c.restore(); },
    ball: (type) => (c, len) => A.ball(c, 0, len + 14, 15, type)
  };

  /* ---------- cenários ---------- */
  function clay(c) {
    sky(c, '#5aa7e6', '#cfe9ff', 260);
    c.fillStyle = '#1f5d3a'; c.fillRect(0, 150, 1280, 140); banner(c, 250, 34);
    const g = c.createLinearGradient(0, 284, 0, 720); g.addColorStop(0, '#d0703a'); g.addColorStop(1, '#b4572a'); c.fillStyle = g; c.fillRect(0, 284, 1280, 436);
    c.strokeStyle = '#fff'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 360); c.lineTo(1280, 360); c.moveTo(640, 360); c.lineTo(640, 720); c.stroke();
  }
  function hall(c, base, felt) {
    room(c, base); banner(c, 300, 34);
    c.fillStyle = felt; c.fillRect(0, 334, 1280, 386);
    c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(0, 334, 1280, 14);
  }
  function club(c, t) {
    sky(c, '#6f9fd0', '#d9e7f5', 420);
    c.fillStyle = '#e9edf3'; c.fillRect(-20, 170, 820, 170); c.fillStyle = BLUE; c.fillRect(-20, 150, 840, 40);
    c.fillStyle = '#9fb8d6'; c.fillRect(20, 230, 700, 110);
    c.fillStyle = '#fff'; c.font = `900 26px ${F}`; c.textAlign = 'left'; c.fillText('ASSOCIAÇÃO VOLVO', 30, 180);
    for (let i = 0; i < 6; i++) { c.fillStyle = '#2f6b3a'; c.beginPath(); c.arc(860 + i * 90, 300, 70, 0, TAU); c.fill(); }
    const g = c.createLinearGradient(0, 330, 0, 720); g.addColorStop(0, '#5fa04a'); g.addColorStop(1, '#3f7f32'); c.fillStyle = g; c.fillRect(0, 330, 1280, 390);
    void t;
  }
  const ENVS = {
    pool: c => hall(c, '#2a170c', '#1d6fd1'),
    cards: c => hall(c, '#0c1d3e', '#0f6a3a'),
    poker: c => hall(c, '#10081f', '#0f6a3a'),
    chess: c => hall(c, '#0c1d3e', '#3a2614'),
    clay,
    beach: c => beach(c, 1.2),
    stadium: c => stadium(c, 1.2),
    futsal: c => gym(c, '#2a6fc9', '#1b4f9a', 'rgba(255,200,60,.9)', 1.2),
    wood: c => gym(c, '#c98a4f', '#9e6533', 'rgba(255,255,255,.8)', 1.2),
    volley: c => gym(c, '#e9a24c', '#c97a2a', 'rgba(255,255,255,.85)', 1.2),
    club
  };

  /* ---------- composição ---------- */
  function look(seed, f) {
    const h = hash(seed);
    return { skin: SKINS[h % SKINS.length], hair: HAIRS[(h >> 3) % HAIRS.length], female: !!f, bald: !f && (h % 7 === 0) };
  }

  function draw(c, cw, ch, spec) {
    // cenário em "cover" (1280x720)
    const k = Math.max(cw / 1280, ch / 720), tx = (cw - 1280 * k) / 2, ty = (ch - 720 * k) / 2;
    c.save(); c.translate(tx, ty); c.scale(k, k);
    if (spec.scene) {
      const sc = A.scenes.find(s => s.title === spec.scene);
      sc.draw(c, spec.t ?? 2, sc.dur);
      c.restore(); return finish(c, cw, ch);
    }
    (ENVS[spec.env] || ENVS.stadium)(c);
    const vis = { x0: -tx / k, x1: (cw - tx) / k, y0: -ty / k, y1: (ch - ty) / k };
    const vw = vis.x1 - vis.x0, vh = vis.y1 - vis.y0, cx = (vis.x0 + vis.x1) / 2;
    const kit = spec.kit ? Object.assign({}, A.TEAM_A, spec.kit) : A.TEAM_A;
    if (spec.layout === 'staff') { spec.noTrophy = true; Object.assign(kit, { jersey: NAVY, text: '#fff', shorts: '#2b3440', trim: GOLD }); }
    const ppl = spec.people || [];
    const prop = spec.prop && held[spec.prop[0]] ? held[spec.prop[0]](spec.prop[1]) : null;

    if (ppl.length >= 4) {
      // equipe: fila de trás em pé + fila da frente
      const back = ppl.filter((_, i) => i % 2 === 0), front = ppl.filter((_, i) => i % 2 === 1);
      const sB = vh / 345, sF = vh / 300;
      const step = (n, span) => Math.min(vw * span / Math.max(1, n - 1), vw * .2);
      back.forEach((p, i) => {
        const L = look(spec.seed + 'b' + i, p.f);
        const half = back.length === front.length ? step(back.length, .84) / 4 : 0;
        player(c, { x: cx + (i - (back.length - 1) / 2) * step(back.length, .84) - half, y: vis.y0 + vh * .63, s: sB, view: 'front', team: kit, num: p.n, ...L, armL: .45, armR: .45, noShadow: true });
      });
      front.forEach((p, i) => {
        const L = look(spec.seed + 'f' + i, p.f);
        const mid = !spec.noTrophy && i === Math.floor((front.length - 1) / 2);
        // quando as filas têm o mesmo tamanho, desloca meio passo para ninguém ficar escondido
        const half = back.length === front.length ? step(back.length, .84) / 4 : 0;
        const x = cx + (i - (front.length - 1) / 2) * step(front.length, .7) + half;
        player(c, { x, y: vis.y0 + vh * 1.06, s: sF, view: 'front', team: kit, num: p.n, ...L, armL: mid ? .3 : .55, armR: mid ? 2.65 : .55, toolR: mid ? trophy(2.65, 'R', L.skin) : null });
      });
    } else {
      // 1 ou 2 atletas, plano médio, celebrando
      const n = ppl.length, s = vh / (n === 1 ? 212 : 228);
      ppl.forEach((p, i) => {
        const L = look(spec.seed + i, p.f);
        const x = n === 1 ? cx : cx + (i ? 1 : -1) * Math.min(vw * .24, 150 * s / 2.2) * 1.0;
        const raise = 2.6, side = n === 1 || i === 1 ? 'R' : 'L';
        const silver = p.medal === 'silver';
        const tool = p.medal === 'trophy' || (!p.medal && !silver) ? trophy(raise, side, L.skin) : medal(raise, side, silver, L.skin);
        const o = { x, y: vis.y0 + 292 * s, s, view: 'front', team: kit, num: p.n, ...L, noShadow: true };
        if (side === 'R') Object.assign(o, { armR: raise, toolR: tool, armL: prop ? .35 : .2, toolL: prop });
        else Object.assign(o, { armL: raise, toolL: tool, armR: prop ? .35 : .2, toolR: prop });
        player(c, o);
      });
    }
    c.restore();
    finish(c, cw, ch);
  }
  function finish(c, cw, ch) {
    // leve vinheta e brilho para parecer "foto de pódio"
    const v = c.createRadialGradient(cw / 2, ch * .35, Math.min(cw, ch) * .2, cw / 2, ch / 2, Math.max(cw, ch) * .8);
    v.addColorStop(0, 'rgba(255,240,200,.10)'); v.addColorStop(1, 'rgba(0,8,30,.35)');
    c.fillStyle = v; c.fillRect(0, 0, cw, ch);
  }

  // gera a imagem (dataURL) com a proporção pedida
  A.make = function (spec, ratio = 3 / 4, width = 900) {
    const cv = document.createElement('canvas');
    cv.width = Math.round(width); cv.height = Math.round(width / ratio);
    draw(cv.getContext('2d'), cv.width, cv.height, spec);
    return cv.toDataURL('image/jpeg', .9);
  };
})();
