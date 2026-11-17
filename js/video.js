/* =========================================================
   VÍDEO DAS MODALIDADES (~1min30) — animação desenhada em canvas.
   Atletas adultos com camisa "ASSOCIAÇÃO VOLVO" + número grande.
   Pode ser exportado como arquivo de vídeo (.webm) pelo botão "Baixar vídeo".
   ========================================================= */
(function () {
  const W = 1280, H = 720;
  const BLUE = '#0a4ea3', NAVY = '#071d3f', GOLD = '#f2b632', WHITE = '#f3f6fb';
  const SKINS = ['#f1c7a3', '#d9a37c', '#b97a52', '#8a5636', '#e8b896', '#6b4128', '#c98e66'];
  const HAIRS = ['#2b1d14', '#141414', '#5a3a22', '#b8863b', '#3d2a1e', '#0d0d0d', '#7a4b26'];
  const F = 'Montserrat, "Segoe UI", Arial, sans-serif';
  const TAU = Math.PI * 2;
  const logo = new Image(); logo.src = 'img/logo-associacao-volvo.png';

  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  function rnd(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

  /* ---------- times (todas as camisas são da Associação Volvo) ---------- */
  const TEAM_A = { jersey: BLUE, text: '#ffffff', shorts: NAVY, sock: '#ffffff', trim: GOLD };
  const TEAM_B = { jersey: WHITE, text: '#0a2a5c', shorts: '#0a2a5c', sock: '#0a2a5c', trim: BLUE };
  const TEAM_C = { jersey: GOLD, text: '#071d3f', shorts: NAVY, sock: GOLD, trim: NAVY };

  /* ---------- atleta ---------- */
  function shadow(c, x, y, s) {
    c.save(); c.fillStyle = 'rgba(0,0,0,.28)'; c.beginPath(); c.ellipse(x, y, 30 * s, 7 * s, 0, 0, TAU); c.fill(); c.restore();
  }
  function limb(c, x, y, rot, len, w, col1, len1, col2, end) {
    c.save(); c.translate(x, y); c.rotate(rot);
    c.fillStyle = col2; c.beginPath(); c.roundRect(-w / 2, 0, w, len, w / 2); c.fill();
    if (len1) { c.fillStyle = col1; c.beginPath(); c.roundRect(-w / 2 - 1.5, -3, w + 3, len1 + 3, 5); c.fill(); }
    if (end) end(c, len);
    c.restore();
  }
  function player(c, o) {
    const s = o.s || 1, view = o.view || 'back', team = o.team || TEAM_A;
    const skin = o.skin || SKINS[0], hair = o.hair || HAIRS[0];
    const p = o.run;
    const sw = p != null ? Math.sin(p) : 0;
    const bob = p != null ? Math.abs(Math.cos(p)) * 4 : 0;
    const jump = o.jump || 0;
    if (!o.noShadow) shadow(c, o.x, o.y, s * (1 - Math.min(.5, jump / 200)));
    c.save();
    c.translate(o.x, o.y - (bob + jump) * s);
    c.scale(s, s);
    if (o.lean) c.rotate(o.lean);

    // pernas
    const legL = o.legL ?? (.07 + sw * .1), legR = o.legR ?? (.07 - sw * .1);
    const lenL = 1 - (p != null ? .16 * Math.max(0, sw) : 0), lenR = 1 - (p != null ? .16 * Math.max(0, -sw) : 0);
    const shoe = (col) => (cc, len) => { cc.fillStyle = team.sock; cc.fillRect(-8.5, len - 26, 17, 18); cc.fillStyle = col; cc.beginPath(); cc.ellipse(0, len - 3, 10, 6, 0, 0, TAU); cc.fill(); };
    const shoeCol = o.barefoot ? skin : '#151515';
    if (o.barefoot) { team._sock = team.sock; }
    limb(c, -12, -82, legL, 80 * lenL, 16, null, 0, skin, o.barefoot ? null : shoe(shoeCol));
    limb(c, 12, -82, -legR, 80 * lenR, 16, null, 0, skin, o.barefoot ? null : shoe(shoeCol));

    // calção
    c.fillStyle = team.shorts;
    c.beginPath(); c.moveTo(-28, -90); c.lineTo(28, -90); c.lineTo(31, -54); c.lineTo(3, -54); c.lineTo(0, -64); c.lineTo(-3, -54); c.lineTo(-31, -54); c.closePath(); c.fill();
    c.fillStyle = team.trim; c.fillRect(-31, -66, 4, 12); c.fillRect(27, -66, 4, 12);

    // rabo de cavalo (atrás, vista de frente)
    if (o.female && view === 'front') { c.fillStyle = hair; c.beginPath(); c.roundRect(-19, -182, 38, 44, 12); c.fill(); }

    // tronco (camisa)
    c.fillStyle = team.jersey;
    c.beginPath(); c.moveTo(-31, -153); c.quadraticCurveTo(0, -158, 31, -153); c.lineTo(28, -86); c.lineTo(-28, -86); c.closePath(); c.fill();
    c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(-28, -96, 56, 10);
    // gola
    c.strokeStyle = team.trim; c.lineWidth = 3;
    c.beginPath();
    if (view === 'back') c.arc(0, -160, 9, .25 * Math.PI, .75 * Math.PI);
    else { c.moveTo(-9, -154); c.lineTo(0, -143); c.lineTo(9, -154); }
    c.stroke();

    // texto da camisa: ASSOCIAÇÃO VOLVO + número grande
    c.fillStyle = team.text; c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    if (view === 'back') {
      c.font = `800 7.4px ${F}`; c.fillText('ASSOCIAÇÃO', 0, -139);
      c.font = `900 10px ${F}`; c.fillText('VOLVO', 0, -129);
      c.font = `900 ${o.num > 9 ? 34 : 38}px ${F}`; c.fillText(String(o.num ?? 10), 0, -95);
    } else {
      c.font = `800 5.6px ${F}`; c.fillText('ASSOCIAÇÃO', 0, -135);
      c.font = `900 7.4px ${F}`; c.fillText('VOLVO', 0, -127);
      c.font = `900 ${o.num > 9 ? 26 : 30}px ${F}`; c.fillText(String(o.num ?? 10), 0, -98);
    }

    // braços
    const armL = o.armL ?? (.18 + (p != null ? -sw * .35 : 0)), armR = o.armR ?? (.18 + (p != null ? sw * .35 : 0));
    const hand = (tool) => (cc, len) => {
      cc.fillStyle = skin; cc.beginPath(); cc.arc(0, len + 2, 7, 0, TAU); cc.fill();
      if (tool) tool(cc, len);
    };
    limb(c, -30, -148, armL, 62, 13, team.jersey, 22, skin, hand(o.toolL));
    limb(c, 30, -148, -armR, 62, 13, team.jersey, 22, skin, hand(o.toolR));

    // pescoço e cabeça
    c.fillStyle = skin; c.fillRect(-6, -166, 12, 12);
    if (view === 'back') {
      c.fillStyle = skin; c.beginPath(); c.arc(-16, -172, 4.5, 0, TAU); c.arc(16, -172, 4.5, 0, TAU); c.fill();
      c.fillStyle = hair; c.beginPath(); c.arc(0, -175, 17, 0, TAU); c.fill();
      if (o.female) { c.beginPath(); c.ellipse(0, -152, 7, 15, 0, 0, TAU); c.fill(); c.fillStyle = GOLD; c.fillRect(-5, -166, 10, 3); }
      if (o.bald) { c.fillStyle = skin; c.beginPath(); c.arc(0, -178, 13, Math.PI * 1.05, Math.PI * 1.95); c.fill(); }
    } else {
      c.fillStyle = skin; c.beginPath(); c.arc(0, -174, 16, 0, TAU); c.fill();
      c.fillStyle = hair; c.beginPath(); c.arc(0, -176, 17, Math.PI * 1.05, Math.PI * 1.95); c.fill();
      if (o.female) { c.fillRect(-17, -178, 6, 22); c.fillRect(11, -178, 6, 22); }
      c.fillStyle = '#1b1b1b'; c.beginPath(); c.arc(-5.5, -173, 1.9, 0, TAU); c.arc(5.5, -173, 1.9, 0, TAU); c.fill();
      c.strokeStyle = '#7a3b2a'; c.lineWidth = 1.6; c.beginPath(); c.arc(0, -167, 5, .15 * Math.PI, .85 * Math.PI); c.stroke();
    }
    c.restore();
  }

  /* ---------- objetos ---------- */
  function ball(c, x, y, r, type, rot = 0) {
    c.save(); c.translate(x, y); c.rotate(rot);
    if (type === 'soccer') {
      c.fillStyle = '#fff'; c.beginPath(); c.arc(0, 0, r, 0, TAU); c.fill();
      c.fillStyle = '#1a1a1a'; poly(c, 0, 0, r * .38, 5);
      for (let i = 0; i < 5; i++) { const a = i / 5 * TAU - Math.PI / 2; poly(c, Math.cos(a) * r * .85, Math.sin(a) * r * .85, r * .26, 5); }
      c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 1; c.beginPath(); c.arc(0, 0, r, 0, TAU); c.stroke();
    } else if (type === 'volley') {
      c.fillStyle = '#fff'; c.beginPath(); c.arc(0, 0, r, 0, TAU); c.fill();
      c.save(); c.clip();
      c.strokeStyle = BLUE; c.lineWidth = r * .35; c.beginPath(); c.arc(-r * .9, -r * .2, r * 1.1, -.6, .9); c.stroke();
      c.strokeStyle = GOLD; c.beginPath(); c.arc(r * .9, r * .3, r * 1.1, 2.4, 3.9); c.stroke();
      c.restore();
    } else if (type === 'basket') {
      c.fillStyle = '#e06a1b'; c.beginPath(); c.arc(0, 0, r, 0, TAU); c.fill();
      c.strokeStyle = '#3a1a06'; c.lineWidth = Math.max(1, r * .08);
      c.beginPath(); c.moveTo(-r, 0); c.lineTo(r, 0); c.moveTo(0, -r); c.lineTo(0, r); c.stroke();
      c.beginPath(); c.arc(-r * 1.25, 0, r * .9, -.8, .8); c.stroke(); c.beginPath(); c.arc(r * 1.25, 0, r * .9, Math.PI - .8, Math.PI + .8); c.stroke();
    } else if (type === 'tennis') {
      c.fillStyle = '#d7f03a'; c.beginPath(); c.arc(0, 0, r, 0, TAU); c.fill();
      c.strokeStyle = '#fff'; c.lineWidth = Math.max(1, r * .15); c.beginPath(); c.arc(-r * 1.1, 0, r * .9, -.9, .9); c.stroke(); c.beginPath(); c.arc(r * 1.1, 0, r * .9, Math.PI - .9, Math.PI + .9); c.stroke();
    } else if (type === 'ping') {
      c.fillStyle = '#ff8a1e'; c.beginPath(); c.arc(0, 0, r, 0, TAU); c.fill();
    }
    c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.arc(-r * .35, -r * .35, r * .3, 0, TAU); c.fill();
    c.restore();
  }
  function poly(c, x, y, r, n) { c.beginPath(); for (let i = 0; i < n; i++) { const a = i / n * TAU - Math.PI / 2; c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } c.closePath(); c.fill(); }
  const racket = (col) => (c, len) => {
    c.save(); c.translate(0, len + 4); c.fillStyle = '#222'; c.fillRect(-2.5, 0, 5, 26);
    c.strokeStyle = col; c.lineWidth = 4; c.fillStyle = 'rgba(255,255,255,.25)'; c.beginPath(); c.ellipse(0, 46, 15, 21, 0, 0, TAU); c.fill(); c.stroke(); c.restore();
  };
  const paddle = (col) => (c, len) => {
    c.save(); c.translate(0, len + 4); c.fillStyle = '#5a3a1a'; c.fillRect(-3, 0, 6, 12);
    c.fillStyle = col; c.beginPath(); c.ellipse(0, 26, 15, 17, 0, 0, TAU); c.fill(); c.restore();
  };
  function card(c, x, y, w, rot, label, red, back) {
    c.save(); c.translate(x, y); c.rotate(rot);
    const h = w * 1.4;
    c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.roundRect(-w / 2 + 3, -h / 2 + 4, w, h, w * .1); c.fill();
    c.fillStyle = back ? BLUE : '#fff'; c.beginPath(); c.roundRect(-w / 2, -h / 2, w, h, w * .1); c.fill();
    if (back) { c.strokeStyle = GOLD; c.lineWidth = 2; c.strokeRect(-w / 2 + 5, -h / 2 + 5, w - 10, h - 10); c.fillStyle = '#fff'; c.font = `900 ${w * .2}px ${F}`; c.textAlign = 'center'; c.fillText('AV', 0, w * .08); }
    else { c.fillStyle = red ? '#d21f2b' : '#111'; c.font = `900 ${w * .42}px ${F}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(label, 0, 0); }
    c.restore();
  }
  function chips(c, x, y, n, col) {
    for (let i = 0; i < n; i++) {
      c.fillStyle = col; c.beginPath(); c.ellipse(x, y - i * 5, 16, 7, 0, 0, TAU); c.fill();
      c.strokeStyle = '#fff'; c.setLineDash([4, 4]); c.lineWidth = 2; c.stroke(); c.setLineDash([]);
    }
  }

  /* ---------- cenários ---------- */
  function sky(c, top, bot, h = 300) { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, top); g.addColorStop(1, bot); c.fillStyle = g; c.fillRect(0, 0, W, h); }
  function crowd(c, y, h, t, seed = 3) {
    const r = rnd(seed); c.fillStyle = '#0b1838'; c.fillRect(0, y, W, h);
    for (let i = 0; i < 420; i++) {
      const x = r() * W, yy = y + 6 + r() * (h - 10), cc = ['#2f5fb0', '#f2b632', '#ffffff', '#8fb6ff', '#1d3f7a'][i % 5];
      c.fillStyle = cc; c.globalAlpha = .55; c.beginPath(); c.arc(x, yy + Math.sin(t * 6 + i) * 1.5, 3.2, 0, TAU); c.fill();
    }
    c.globalAlpha = 1;
  }
  function stadium(c, t) {
    sky(c, '#06132e', '#123a78', 260);
    for (const lx of [160, 1120]) { const g = c.createRadialGradient(lx, 60, 0, lx, 60, 260); g.addColorStop(0, 'rgba(255,255,230,.55)'); g.addColorStop(1, 'rgba(255,255,230,0)'); c.fillStyle = g; c.fillRect(0, 0, W, 360); c.fillStyle = '#fff'; c.fillRect(lx - 30, 50, 60, 18); }
    crowd(c, 170, 110, t);
    banner(c, 280, 30);
    for (let i = 0; i < 10; i++) { const y0 = 310 + Math.pow(i / 10, 1.6) * 410, y1 = 310 + Math.pow((i + 1) / 10, 1.6) * 410; c.fillStyle = i % 2 ? '#2f8a3a' : '#38994a'; c.fillRect(0, y0, W, y1 - y0 + 1); }
    c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, 322); c.lineTo(W, 322); c.stroke();
    c.beginPath(); c.ellipse(640, 470, 210, 55, 0, 0, TAU); c.stroke();
    c.beginPath(); c.moveTo(640, 322); c.lineTo(640, 720); c.stroke();
  }
  function banner(c, y, h) {
    const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, BLUE); g.addColorStop(1, '#073477'); c.fillStyle = g; c.fillRect(0, y, W, h);
    c.font = `900 ${h * .55}px ${F}`; c.fillStyle = 'rgba(255,255,255,.9)'; c.textAlign = 'center'; c.textBaseline = 'middle';
    for (let i = 0; i < 4; i++) c.fillText('ASSOCIAÇÃO VOLVO', 160 + i * 320, y + h / 2 + 1);
    c.textBaseline = 'alphabetic';
  }
  function gym(c, floorA, floorB, lines, t) {
    sky(c, '#0a1d44', '#16407f', 300);
    for (let i = 0; i < 6; i++) { c.fillStyle = 'rgba(255,255,255,.06)'; c.fillRect(i * 230 + 20, 40, 160, 90); }
    crowd(c, 150, 110, t, 7);
    banner(c, 260, 34);
    const g = c.createLinearGradient(0, 294, 0, 720); g.addColorStop(0, floorA); g.addColorStop(1, floorB); c.fillStyle = g; c.fillRect(0, 294, W, 426);
    if (lines) {
      c.strokeStyle = lines; c.lineWidth = 3;
      c.beginPath(); c.moveTo(140, 330); c.lineTo(1140, 330); c.lineTo(1280, 720); c.moveTo(140, 330); c.lineTo(0, 720); c.stroke();
      c.beginPath(); c.moveTo(70, 520); c.lineTo(1210, 520); c.stroke();
    }
    const sh = c.createLinearGradient(0, 294, 0, 400); sh.addColorStop(0, 'rgba(255,255,255,.18)'); sh.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = sh; c.fillRect(0, 294, W, 106);
  }
  function beach(c, t) {
    sky(c, '#3f9be6', '#bfe4ff', 300);
    c.fillStyle = 'rgba(255,240,180,.9)'; c.beginPath(); c.arc(1080, 90, 48, 0, TAU); c.fill();
    c.fillStyle = 'rgba(255,255,255,.8)'; for (const [x, y] of [[200, 80], [520, 120], [820, 60]]) { c.beginPath(); c.ellipse(x + Math.sin(t * .3) * 20, y, 70, 18, 0, 0, TAU); c.fill(); }
    const s = c.createLinearGradient(0, 250, 0, 310); s.addColorStop(0, '#1e7fc6'); s.addColorStop(1, '#55b6e8'); c.fillStyle = s; c.fillRect(0, 250, W, 60);
    c.strokeStyle = 'rgba(255,255,255,.6)'; c.lineWidth = 2; for (let i = 0; i < 8; i++) { c.beginPath(); c.moveTo(i * 170 + (t * 30) % 170, 280 + (i % 3) * 8); c.lineTo(i * 170 + 60 + (t * 30) % 170, 280 + (i % 3) * 8); c.stroke(); }
    const g = c.createLinearGradient(0, 300, 0, 720); g.addColorStop(0, '#f4dca4'); g.addColorStop(1, '#e2bd78'); c.fillStyle = g; c.fillRect(0, 300, W, 420);
    const r = rnd(11); c.fillStyle = 'rgba(160,120,60,.18)'; for (let i = 0; i < 260; i++) { c.beginPath(); c.arc(r() * W, 300 + r() * 420, 1.5 + r() * 2, 0, TAU); c.fill(); }
    c.strokeStyle = BLUE; c.lineWidth = 5; c.beginPath(); c.moveTo(150, 340); c.lineTo(1130, 340); c.lineTo(1280, 700); c.moveTo(150, 340); c.lineTo(0, 700); c.stroke();
  }
  function net(c, x0, x1, top, bot, col = '#111') {
    c.fillStyle = '#ccc'; c.fillRect(x0 - 8, top - 30, 10, bot - top + 140); c.fillRect(x1 - 2, top - 30, 10, bot - top + 140);
    c.strokeStyle = 'rgba(20,20,20,.55)'; c.lineWidth = 1.2;
    for (let x = x0; x <= x1; x += 14) { c.beginPath(); c.moveTo(x, top); c.lineTo(x, bot); c.stroke(); }
    for (let y = top; y <= bot; y += 14) { c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y); c.stroke(); }
    c.fillStyle = '#fff'; c.fillRect(x0, top - 6, x1 - x0, 9); c.fillStyle = col; c.fillRect(x0, bot - 2, x1 - x0, 4);
  }
  function room(c, base = '#0a1a3a') {
    c.fillStyle = base; c.fillRect(0, 0, W, H);
    const g = c.createRadialGradient(640, 330, 40, 640, 330, 720); g.addColorStop(0, 'rgba(255,230,170,.32)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    c.fillStyle = 'rgba(255,255,255,.04)'; for (let i = 0; i < 7; i++) c.fillRect(i * 200, 0, 90, 260);
    c.fillStyle = '#1a1208'; c.fillRect(600, 0, 80, 40); c.fillStyle = 'rgba(255,240,200,.9)'; c.beginPath(); c.ellipse(640, 52, 90, 16, 0, 0, TAU); c.fill();
  }

  /* ---------- cenas ---------- */
  const S = [];
  const scene = (dur, kind, title, sub, draw) => S.push({ dur, kind, title, sub, draw });

  // abertura
  scene(7, null, null, null, (c, t) => {
    c.fillStyle = '#04122e'; c.fillRect(0, 0, W, H);
    const g = c.createRadialGradient(640, 360, 0, 640, 360, 700); g.addColorStop(0, 'rgba(47,143,232,.45)'); g.addColorStop(1, 'rgba(4,18,46,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    const icons = ['⚽', '🏐', '🏀', '🎾', '🏓', '🎱', '♟️', '🃏', '♠️', '🏃', '🏖️', '🥅'];
    c.font = `44px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    icons.forEach((ic, i) => { const a = i / icons.length * TAU + t * .35, R = 300 + Math.sin(t + i) * 10; c.globalAlpha = clamp(t * 1.2 - i * .08) * .9; c.fillText(ic, 640 + Math.cos(a) * R * 1.35, 360 + Math.sin(a) * R * .72); });
    c.globalAlpha = 1;
    const a1 = easeOut(clamp(t / 1.2)), a2 = easeOut(clamp((t - 1) / 1.2)), a3 = easeOut(clamp((t - 2) / 1.2));
    if (logo.complete && logo.naturalWidth) { c.globalAlpha = a1; const lw = 520, lh = lw * logo.naturalHeight / logo.naturalWidth; c.drawImage(logo, 640 - lw / 2, 230 - lh / 2 + (1 - a1) * 30, lw, lh); c.globalAlpha = 1; }
    else { c.fillStyle = `rgba(255,255,255,${a1})`; c.font = `900 54px ${F}`; c.fillText('Associação Volvo', 640, 230); }
    c.fillStyle = `rgba(255,255,255,${a2})`; c.font = `800 42px ${F}`;
    c.fillText('promove diversas modalidades', 640, 330 + (1 - a2) * 30);
    c.fillText('esportivas durante todo o ano', 640, 384 + (1 - a2) * 30);
    c.fillStyle = `rgba(242,182,50,${a3})`; c.font = `900 30px ${F}`; c.fillText('COLETIVAS  ·  INDIVIDUAIS  ·  DE MESA', 640, 470);
    c.textBaseline = 'alphabetic';
  });

  // futebol
  const runField = (female, numHero) => (c, t) => {
    stadium(c, t);
    const r = rnd(female ? 21 : 5);
    const crowdP = [];
    for (let i = 0; i < 7; i++) crowdP.push({ x: 120 + i * 170 + r() * 60, y: 360 + r() * 120, team: i % 2 ? TEAM_B : TEAM_A, n: [3, 8, 5, 11, 4, 9, 6][i], dir: i % 2 ? -1 : 1, sk: SKINS[i % 7], hr: HAIRS[i % 7] });
    crowdP.sort((a, b) => a.y - b.y).forEach((p, i) => {
      const s = .35 + (p.y - 340) / 300 * .45;
      player(c, { x: p.x + p.dir * t * 30, y: p.y, s, run: t * 9 + i, view: p.team === TEAM_B ? 'front' : 'back', team: p.team, num: p.n, skin: p.sk, hair: p.hr, female });
    });
    // gol
    c.strokeStyle = '#fff'; c.lineWidth = 4; c.strokeRect(1000, 262, 190, 62); c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 1;
    for (let x = 1000; x < 1190; x += 10) { c.beginPath(); c.moveTo(x, 262); c.lineTo(x + 6, 324); c.stroke(); }
    const hx = 380 + t * 40;
    const bx = hx + 120 + Math.sin(t * 3) * 20, by = 690 - Math.abs(Math.sin(t * 4.5)) * 30;
    player(c, { x: hx, y: 815, s: 2.2, run: t * 9, view: 'back', team: TEAM_A, num: numHero, female, skin: female ? SKINS[1] : SKINS[2], hair: HAIRS[female ? 3 : 1] });
    ball(c, bx, by, 24, 'soccer', t * 6);
  };
  scene(6, 'Esporte coletivo', 'FUTEBOL', 'Campeonato de Fut-7', runField(false, 10));
  scene(6, 'Esporte coletivo', 'FUTEBOL FEMININO', 'Garra e talento em campo', runField(true, 7));

  // futsal
  scene(5, 'Esporte coletivo', 'FUTSAL', 'Masculino e feminino', (c, t) => {
    gym(c, '#2a6fc9', '#1b4f9a', 'rgba(255,200,60,.9)', t);
    c.strokeStyle = '#fff'; c.lineWidth = 4; c.strokeRect(560, 250, 160, 70);
    [[300, 420, TEAM_B, 4, 'front'], [900, 400, TEAM_B, 8, 'front'], [620, 380, TEAM_B, 1, 'front'], [1000, 500, TEAM_A, 5, 'back']].forEach(([x, y, tm, n, v], i) =>
      player(c, { x: x + Math.sin(t * 2 + i) * 40, y, s: .5 + (y - 340) / 300 * .45, run: t * 9 + i, team: tm, num: n, view: v, skin: SKINS[i + 1], hair: HAIRS[i] }));
    const hx = 520 + Math.sin(t * 1.2) * 60;
    player(c, { x: hx, y: 815, s: 2.2, run: t * 10, view: 'back', team: TEAM_A, num: 9, skin: SKINS[4], hair: HAIRS[2] });
    ball(c, hx + 110, 700 - Math.abs(Math.sin(t * 5)) * 22, 20, 'soccer', t * 8);
  });

  // vôlei / jogos de rede
  const netGame = (o) => (c, t) => {
    o.env(c, t);
    const top = o.netTop || 250, bot = top + 90;
    (o.opp || []).forEach((p, i) => player(c, { x: p.x + Math.sin(t * 2 + i) * 25, y: p.y || 380, s: p.s || .8, view: 'front', team: o.oppTeam || TEAM_B, num: p.n, female: o.female, skin: SKINS[(i + 3) % 7], hair: HAIRS[(i + 2) % 7], jump: p.j ? Math.max(0, Math.sin(t * 2.4 + i)) * 50 : 0, armL: p.j ? 2.8 : .3, armR: p.j ? 2.9 : .3, toolR: o.oppTool, barefoot: o.barefoot }));
    net(c, o.netX0 || 120, o.netX1 || 1160, top, bot);
    const cyc = o.cycle || 2.4, u = (t % cyc) / cyc, dir = Math.floor(t / cyc) % 2 ? -1 : 1;
    const bx = 640 + dir * (u - .5) * (o.spread || 520) + (o.ballX || 0), by = (o.ballY || 330) - Math.sin(u * Math.PI) * (o.arc || 230);
    const s = o.heroS || 2.1;
    const jump = o.heroJump ? Math.max(0, Math.sin(t * TAU / cyc)) * 60 : 0;
    (o.mates || []).forEach((m, i) => player(c, { x: m.x, y: m.y, s: m.s, view: 'back', team: o.team || TEAM_A, num: m.n, female: o.female, skin: SKINS[(i + 5) % 7], hair: HAIRS[(i + 4) % 7], run: o.barefoot ? null : t * 3 + i, barefoot: o.barefoot, toolR: o.heroTool }));
    if (o.ballFirst) ball(c, bx, by, o.ballR || 18, o.ball, t * 4);
    player(c, { x: (o.heroX || 640) + Math.sin(t * .8) * 40, y: o.heroY || 840, s, view: 'back', team: o.team || TEAM_A, num: o.heroN || 12, female: o.female, skin: o.heroSkin || SKINS[1], hair: o.heroHair || HAIRS[0], jump, armL: o.armL ?? (o.heroJump ? 2.9 : .5), armR: o.armR ?? (o.heroJump ? 2.7 : .9), legR: o.kick ? (Math.sin(t * 2.6) > .3 ? -1.1 : .1) : undefined, toolR: o.heroTool, barefoot: o.barefoot });
    if (!o.ballFirst) ball(c, bx, by, o.ballR || 18, o.ball, t * 4);
  };
  scene(6, 'Esporte coletivo', 'VÔLEI', 'Masculino e feminino', netGame({
    env: (c, t) => gym(c, '#e9a24c', '#c97a2a', 'rgba(255,255,255,.85)', t), ball: 'volley', heroJump: true, heroN: 14,
    opp: [{ x: 340, n: 5, j: 0 }, { x: 640, n: 9, j: 1 }, { x: 940, n: 2, j: 0 }],
    mates: [{ x: 250, y: 600, s: 1.2, n: 3 }, { x: 1040, y: 610, s: 1.25, n: 18 }]
  }));

  // basquete
  scene(6, 'Esporte coletivo', 'BASQUETE 3x3', 'Torneio de Basquete', (c, t) => {
    gym(c, '#c98a4f', '#9e6533', 'rgba(255,255,255,.8)', t);
    // tabela e aro
    c.fillStyle = '#eee'; c.fillRect(856, 90, 150, 100); c.strokeStyle = '#d21f2b'; c.lineWidth = 4; c.strokeRect(906, 130, 50, 40); c.strokeRect(856, 90, 150, 100);
    c.fillStyle = '#666'; c.fillRect(925, 190, 12, 120);
    c.strokeStyle = '#ff5a1f'; c.lineWidth = 5; c.beginPath(); c.ellipse(931, 182, 30, 8, 0, 0, TAU); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 1.5; for (let i = -3; i <= 3; i++) { c.beginPath(); c.moveTo(931 + i * 9, 184); c.lineTo(931 + i * 6, 220); c.stroke(); }
    [[700, 420, 4], [1080, 440, 7]].forEach(([x, y, n], i) => player(c, { x: x + Math.sin(t * 2 + i) * 30, y, s: .85, view: 'front', team: TEAM_B, num: n, skin: SKINS[i + 2], hair: HAIRS[i + 3], armL: 2.6, armR: 2.6, jump: Math.max(0, Math.sin(t * 2.5 + i)) * 30 }));
    player(c, { x: 360, y: 520, s: 1.1, view: 'back', team: TEAM_A, num: 23, skin: SKINS[0], hair: HAIRS[1], run: t * 8 });
    const cyc = 3, u = (t % cyc) / cyc;
    const jump = Math.max(0, Math.sin(u * Math.PI)) * 70;
    const hx = 600;
    player(c, { x: hx, y: 840, s: 2.1, view: 'back', team: TEAM_A, num: 11, skin: SKINS[3], hair: HAIRS[1], jump, armL: 2.9, armR: 2.75 });
    const shotU = clamp((u - .45) / .5);
    const sx = hx + 20, sy = 840 - (jump + 230) * 2.1;
    const bx = u < .45 ? sx : lerp(sx, 931, shotU), by = u < .45 ? sy - 10 : lerp(sy, 172, shotU) - Math.sin(shotU * Math.PI) * 200;
    ball(c, bx, by, u < .45 ? 30 : lerp(30, 16, shotU), 'basket', t * 3);
    if (shotU > .95) { c.fillStyle = GOLD; c.font = `900 40px ${F}`; c.textAlign = 'center'; c.fillText('+2', 990, 140); }
  });

  // vôlei de areia
  scene(5, 'Esporte de dupla', 'VÔLEI DE AREIA', 'Na areia, em dupla', netGame({
    env: beach, ball: 'volley', heroJump: true, heroN: 4, female: true, barefoot: true, heroSkin: SKINS[4], heroHair: HAIRS[3], netTop: 230,
    opp: [{ x: 460, n: 1, j: 1, y: 370 }, { x: 820, n: 2, j: 0, y: 380 }], mates: [{ x: 1000, y: 620, s: 1.3, n: 3 }]
  }));

  // futevôlei
  scene(5, 'Esporte de dupla', 'FUTEVÔLEI', 'Categorias Ouro, Prata e Mista', netGame({
    env: beach, ball: 'soccer', kick: true, heroN: 21, barefoot: true, armL: .7, armR: .7, heroSkin: SKINS[5], heroHair: HAIRS[5], netTop: 260, arc: 260,
    opp: [{ x: 420, n: 7, y: 380 }, { x: 860, n: 10, y: 390 }], mates: [{ x: 260, y: 630, s: 1.3, n: 8 }]
  }));

  // beach tennis
  scene(5, 'Esporte de dupla', 'BEACH TENNIS', 'Diversão na areia', netGame({
    env: beach, ball: 'tennis', heroN: 6, barefoot: true, female: true, heroTool: paddle('#0a4ea3'), oppTool: paddle('#f2b632'), armR: 2.2, heroSkin: SKINS[0], heroHair: HAIRS[2], netTop: 260, ballR: 12, cycle: 1.8,
    opp: [{ x: 480, n: 3, y: 380 }, { x: 820, n: 9, y: 390 }], mates: [{ x: 1020, y: 620, s: 1.3, n: 5 }]
  }));

  // tênis (saibro)
  scene(5, 'Esporte individual', 'TÊNIS', 'Quadra de saibro renovada', netGame({
    env: (c, t) => {
      sky(c, '#5aa7e6', '#cfe9ff', 200);
      c.fillStyle = '#1f5d3a'; c.fillRect(0, 150, W, 140); banner(c, 240, 30);
      const g = c.createLinearGradient(0, 270, 0, 720); g.addColorStop(0, '#d0703a'); g.addColorStop(1, '#b4572a'); c.fillStyle = g; c.fillRect(0, 270, W, 450);
      c.strokeStyle = '#fff'; c.lineWidth = 4; c.beginPath(); c.moveTo(330, 300); c.lineTo(950, 300); c.lineTo(1180, 720); c.moveTo(330, 300); c.lineTo(100, 720); c.stroke();
      c.beginPath(); c.moveTo(250, 450); c.lineTo(1030, 450); c.moveTo(640, 450); c.lineTo(640, 720); c.stroke();
    },
    ball: 'tennis', heroN: 1, heroTool: racket('#0a4ea3'), oppTool: racket('#f2b632'), armR: 1.8, heroSkin: SKINS[6], heroHair: HAIRS[0], netTop: 330, netX0: 210, netX1: 1070, ballR: 11, cycle: 1.6, arc: 180, ballY: 380,
    opp: [{ x: 640, n: 2, y: 320, s: .65 }]
  }));

  // tênis de mesa
  scene(5, 'Esporte individual', 'TÊNIS DE MESA', 'Reflexo e precisão', (c, t) => {
    room(c, '#0b1e45'); banner(c, 250, 30);
    c.fillStyle = '#0d2a5c'; c.fillRect(0, 280, W, 440);
    player(c, { x: 640 + Math.sin(t * 3) * 50, y: 520, s: 1.15, view: 'front', team: TEAM_B, num: 8, skin: SKINS[2], hair: HAIRS[4], armR: 1.2 + Math.sin(t * 5) * .4, toolR: paddle('#d21f2b') });
    // mesa
    c.fillStyle = '#0f4fb0'; c.beginPath(); c.moveTo(420, 420); c.lineTo(860, 420); c.lineTo(1000, 600); c.lineTo(280, 600); c.closePath(); c.fill();
    c.strokeStyle = '#fff'; c.lineWidth = 3; c.stroke(); c.beginPath(); c.moveTo(640, 420); c.lineTo(640, 600); c.stroke();
    c.fillStyle = '#082f6b'; c.fillRect(280, 600, 720, 18);
    c.fillStyle = '#333'; c.fillRect(350, 495, 580, 4); c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect(350, 478, 580, 18);
    const cyc = 1.1, u = (t % cyc) / cyc, dir = Math.floor(t / cyc) % 2;
    const y0 = dir ? 560 : 440, y1 = dir ? 440 : 560;
    ball(c, 640 + Math.sin(t * 2.3) * 160, lerp(y0, y1, u) - Math.sin(u * Math.PI) * 70, 9, 'ping');
    player(c, { x: 560 + Math.sin(t * 2) * 40, y: 890, s: 2.3, view: 'back', team: TEAM_A, num: 17, skin: SKINS[0], hair: HAIRS[1], armR: 1.4 + Math.cos(t * 5) * .4, toolR: paddle('#111') });
  });

  // corrida
  scene(5, 'Esporte individual', 'CORRIDA RÚSTICA', 'Etapa Volvo · 5 km e 10 km', (c, t) => {
    sky(c, '#4f9de0', '#d3ecff', 300);
    c.fillStyle = '#2e7d3c'; c.fillRect(0, 230, W, 80);
    for (let i = 0; i < 9; i++) { c.fillStyle = '#1f5f2c'; c.beginPath(); c.arc(i * 160 + 40, 235, 60, Math.PI, 0); c.fill(); }
    c.fillStyle = '#4a4f59'; c.beginPath(); c.moveTo(520, 300); c.lineTo(760, 300); c.lineTo(1280, 720); c.lineTo(0, 720); c.closePath(); c.fill();
    c.strokeStyle = '#fff'; c.lineWidth = 5; c.setLineDash([30, 30]); c.lineDashOffset = -t * 200; c.beginPath(); c.moveTo(640, 300); c.lineTo(640, 720); c.stroke(); c.setLineDash([]);
    // pórtico de chegada
    c.fillStyle = BLUE; c.fillRect(500, 150, 20, 160); c.fillRect(760, 150, 20, 160); c.fillRect(500, 150, 280, 46);
    c.fillStyle = '#fff'; c.font = `900 26px ${F}`; c.textAlign = 'center'; c.fillText('CHEGADA', 640, 182);
    const rr = rnd(9);
    const run = Array.from({ length: 9 }, (_, i) => ({ x: 380 + rr() * 520, d: (rr() + t * .12 + i * .11) % 1, n: 100 + Math.floor(rr() * 800), f: i % 3 === 0 }));
    run.sort((a, b) => a.d - b.d).forEach((p, i) => {
      const y = lerp(310, 560, 1 - p.d), s = lerp(.35, 1.05, 1 - p.d);
      player(c, { x: 640 + (p.x - 640) * lerp(.35, 1, 1 - p.d), y, s, view: 'back', team: i % 2 ? TEAM_C : TEAM_A, num: p.n, run: t * 11 + i, female: p.f, skin: SKINS[i % 7], hair: HAIRS[(i + 2) % 7] });
    });
    player(c, { x: 560, y: 850, s: 2.2, view: 'back', team: TEAM_A, num: 26, run: t * 11, female: true, skin: SKINS[1], hair: HAIRS[2] });
  });

  // bola 8
  scene(5, 'Jogo de mesa', 'BOLA 8', 'Torneios de Bola Oito', (c, t) => {
    room(c, '#2a170c');
    c.fillStyle = '#3b230f'; c.fillRect(0, 300, W, 420);
    player(c, { x: 1000, y: 480, s: 1.0, view: 'front', team: TEAM_B, num: 15, skin: SKINS[3], hair: HAIRS[0], armL: .3, armR: .9 });
    // mesa (perspectiva)
    c.fillStyle = '#5a3417'; c.beginPath(); c.moveTo(300, 330); c.lineTo(980, 330); c.lineTo(1150, 640); c.lineTo(130, 640); c.closePath(); c.fill();
    c.fillStyle = '#1d6fd1'; c.beginPath(); c.moveTo(330, 350); c.lineTo(950, 350); c.lineTo(1100, 615); c.lineTo(180, 615); c.closePath(); c.fill();
    c.fillStyle = '#111'; for (const [x, y] of [[335, 352], [640, 348], [945, 352], [185, 612], [640, 618], [1095, 612]]) { c.beginPath(); c.ellipse(x, y, 16, 9, 0, 0, TAU); c.fill(); }
    // bolas espalhando após a tacada
    const cols = ['#f2c200', '#1a46c4', '#d21f2b', '#6a2bb3', '#f07a10', '#127a3a', '#7a1414', '#111', '#f2c200', '#1a46c4', '#d21f2b'];
    const hit = clamp((t - .8) / 1.6), e = easeOut(hit);
    const rr = rnd(4);
    cols.forEach((col, i) => {
      const row = Math.floor((Math.sqrt(8 * i + 1) - 1) / 2), k = i - row * (row + 1) / 2;
      const rx = 640 + (k - row / 2) * 24, ry = 430 - row * 18;
      const a = rr() * TAU, dist = 80 + rr() * 220;
      const x = clamp(rx + Math.cos(a) * dist * e, 360, 920), y = clamp(ry + Math.sin(a) * dist * .5 * e, 372, 596);
      ball(c, x, y, 12, null); c.fillStyle = col; c.beginPath(); c.arc(x, y, 12, 0, TAU); c.fill();
      c.fillStyle = '#fff'; c.beginPath(); c.arc(x, y, 5, 0, TAU); c.fill(); c.fillStyle = '#111'; c.font = `800 6px ${F}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(i === 7 ? 8 : i + 1), x, y + .5);
      c.textBaseline = 'alphabetic';
    });
    const cueX = lerp(640, 640, e), cueY = hit > 0 ? lerp(520, 470, e) : 560 + Math.sin(t * 6) * 10;
    c.fillStyle = '#fff'; c.beginPath(); c.arc(cueX, cueY, 12, 0, TAU); c.fill();
    // jogador com taco
    const pull = hit > 0 ? 0 : Math.sin(t * 6) * 14;
    c.strokeStyle = '#d9b27a'; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(640, 590 + pull); c.lineTo(600, 760 + pull); c.stroke(); c.lineCap = 'butt';
    player(c, { x: 560, y: 920, s: 2.3, view: 'back', team: TEAM_A, num: 8, skin: SKINS[2], hair: HAIRS[1], lean: .12, armL: .9, armR: -.2 });
  });

  // xadrez
  scene(5, 'Jogo de mesa', 'XADREZ', 'Estratégia em cada lance', (c, t) => {
    room(c, '#0c1d3e');
    player(c, { x: 640, y: 560, s: 1.25, view: 'front', team: TEAM_B, num: 64, skin: SKINS[4], hair: HAIRS[6], armL: .5, armR: .5, bald: true });
    c.fillStyle = '#3a2614'; c.fillRect(150, 470, 980, 250);
    // tabuleiro em perspectiva
    const bx0 = 450, bx1 = 830, by0 = 440, by1 = 640, wb = 230, wf = 380;
    for (let r = 0; r < 8; r++) for (let k = 0; k < 8; k++) {
      const y0 = lerp(by0, by1, r / 8), y1 = lerp(by0, by1, (r + 1) / 8);
      const w0 = lerp(wb, wf, r / 8), w1 = lerp(wb, wf, (r + 1) / 8);
      const xa = 640 - w0 + k * w0 * 2 / 8, xb = 640 - w0 + (k + 1) * w0 * 2 / 8, xc = 640 - w1 + (k + 1) * w1 * 2 / 8, xd = 640 - w1 + k * w1 * 2 / 8;
      c.fillStyle = (r + k) % 2 ? '#2a5ca8' : '#e8eef8'; c.beginPath(); c.moveTo(xa, y0); c.lineTo(xb, y0); c.lineTo(xc, y1); c.lineTo(xd, y1); c.closePath(); c.fill();
    }
    void bx0; void bx1;
    const sq = (k, r) => { const y = lerp(by0, by1, (r + .5) / 8), w = lerp(wb, wf, (r + .5) / 8); return [640 - w + (k + .5) * w * 2 / 8, y, lerp(.8, 1.15, r / 8)]; };
    c.textAlign = 'center'; c.textBaseline = 'alphabetic';
    const pieces = [['♜', 0, 0, 0], ['♞', 1, 0, 0], ['♝', 2, 0, 0], ['♛', 3, 0, 0], ['♚', 4, 0, 0], ['♟', 3, 1, 0], ['♟', 5, 1, 0], ['♙', 4, 6, 1], ['♙', 2, 6, 1], ['♖', 7, 7, 1], ['♔', 4, 7, 1], ['♕', 3, 7, 1]];
    const m = ease(clamp((t - 1.5) / 1.2));
    pieces.forEach(([g, k, r, wht], i) => {
      let [x, y, s] = sq(k, r);
      if (i === 11) { const [x2, y2, s2] = sq(6, 3); x = lerp(x, x2, m); y = lerp(y, y2, m) - Math.sin(m * Math.PI) * 40; s = lerp(s, s2, m); }
      c.font = `${42 * s}px "Segoe UI Symbol", "DejaVu Sans", serif`;
      c.fillStyle = wht ? '#fff' : '#111'; c.strokeStyle = wht ? '#111' : '#fff'; c.lineWidth = 1.2;
      c.fillText(g, x, y + 10 * s); c.strokeText(g, x, y + 10 * s);
    });
    if (m >= 1) { c.fillStyle = GOLD; c.font = `900 44px ${F}`; c.fillText('XEQUE!', 1000, 420); }
    // relógio
    c.fillStyle = '#222'; c.fillRect(940, 500, 130, 60); c.fillStyle = '#9ef07a'; c.font = `800 22px ${F}`; c.fillText(`0${4 - Math.floor(t / 2)}:${String(59 - Math.floor(t * 9) % 60).padStart(2, '0')}`, 1005, 538);
    player(c, { x: 520, y: 940, s: 2.3, view: 'back', team: TEAM_A, num: 32, skin: SKINS[0], hair: HAIRS[0], armL: .5, armR: .6 + Math.sin(t) * .1 });
  });

  // truco e poker (mesa de cartas)
  const cardTable = (poker) => (c, t) => {
    room(c, poker ? '#10081f' : '#0c1d3e');
    [[420, 560, 3], [860, 560, 10]].forEach(([x, y, n], i) => player(c, { x, y, s: 1.15, view: 'front', team: poker ? TEAM_C : TEAM_B, num: n, skin: SKINS[i + 3], hair: HAIRS[i + 4], armL: .6, armR: .6, female: !poker && i === 1 }));
    const g = c.createRadialGradient(640, 560, 40, 640, 560, 520); g.addColorStop(0, poker ? '#0f7a3c' : '#147a4a'); g.addColorStop(1, '#0a4a2c');
    c.fillStyle = '#4a2a10'; c.beginPath(); c.ellipse(640, 590, 560, 170, 0, 0, TAU); c.fill();
    c.fillStyle = g; c.beginPath(); c.ellipse(640, 585, 520, 145, 0, 0, TAU); c.fill();
    c.fillStyle = 'rgba(255,255,255,.12)'; c.font = `900 34px ${F}`; c.textAlign = 'center'; c.fillText('ASSOCIAÇÃO VOLVO', 640, 600);
    if (poker) {
      chips(c, 470, 600, 5, '#d21f2b'); chips(c, 520, 610, 3, '#1a46c4'); chips(c, 780, 605, 6, '#111'); chips(c, 830, 598, 4, '#d21f2b');
      const flop = [['A', '♠', 0], ['K', '♥', 1], ['Q', '♦', 1], ['J', '♣', 0], ['10', '♠', 0]];
      flop.forEach((f, i) => { const a = clamp((t - .3 - i * .35) / .4); if (a > 0) card(c, 520 + i * 60, 560 - (1 - easeOut(a)) * 80, 46, 0, f[0] + f[1], f[2], a < .5); });
      if (t > 3) { const k = easeOut(clamp((t - 3) / .4)); c.save(); c.translate(640, 300); c.scale(k, k); c.fillStyle = GOLD; c.font = `900 70px ${F}`; c.fillText('ALL IN!', 0, 0); c.restore(); }
    } else {
      const thrown = [['4', '♣', 0], ['7', '♥', 1], ['A', '♠', 0], ['7', '♦', 1]];
      thrown.forEach((f, i) => { const a = clamp((t - .4 - i * .5) / .45), e2 = easeOut(a); if (a > 0) card(c, lerp([640, 960, 640, 320][i], 560 + i * 50, e2), lerp([780, 560, 420, 560][i], 570, e2), 54, (i - 1.5) * .25 * e2, f[0] + f[1], f[2]); });
      if (t > 2.6) { const k = easeOut(clamp((t - 2.6) / .35)); c.save(); c.translate(980, 300); c.rotate(-.08); c.scale(k, k);
        c.fillStyle = '#fff'; c.beginPath(); c.roundRect(-150, -60, 300, 100, 30); c.fill(); c.beginPath(); c.moveTo(-60, 30); c.lineTo(-100, 80); c.lineTo(-10, 38); c.fill();
        c.fillStyle = '#d21f2b'; c.font = `900 60px ${F}`; c.fillText('TRUCO!', 0, 10); c.restore(); }
    }
    // jogadores de costas (frente da mesa) segurando cartas
    const hold = (cc, len) => { for (let i = 0; i < 3; i++) card(cc, (i - 1) * 10, len + 18, 26, (i - 1) * .25, '', false, true); };
    player(c, { x: 340, y: 905, s: 2.0, view: 'back', team: TEAM_A, num: 4, skin: SKINS[1], hair: HAIRS[1], armL: .4, armR: 1.1, toolR: hold });
    player(c, { x: 940, y: 905, s: 2.0, view: 'back', team: TEAM_A, num: 7, skin: SKINS[5], hair: HAIRS[0], armL: 1.1, armR: .4, toolL: hold, female: poker });
  };
  scene(5, 'Jogo de mesa', 'TRUCO', 'Ranking de Truco · 1º e 2º turnos', cardTable(false));
  scene(5, 'Jogo de mesa', 'POKER', 'Ranking de Poker', cardTable(true));

  // encerramento
  scene(8, null, null, null, (c, t) => {
    c.fillStyle = '#04122e'; c.fillRect(0, 0, W, H);
    const g = c.createRadialGradient(640, 330, 0, 640, 330, 700); g.addColorStop(0, 'rgba(242,182,50,.25)'); g.addColorStop(1, 'rgba(4,18,46,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    const tags = ['Vôlei', 'Futebol', 'Futebol Feminino', 'Futsal', 'Fut-7', 'Basquete 3x3', 'Vôlei de Areia', 'Futevôlei', 'Beach Tennis', 'Tênis', 'Tênis de Mesa', 'Corrida', 'Bola 8', 'Xadrez', 'Truco', 'Poker'];
    c.font = `800 22px ${F}`; c.textAlign = 'center'; c.textBaseline = 'middle';
    let x = 0, row = 0; const rows = [[]];
    tags.forEach(tg => { const w = c.measureText(tg).width + 44; if (x + w > 1100) { rows.push([]); x = 0; row++; } rows[row].push([tg, w]); x += w + 14; });
    rows.forEach((r, ri) => {
      const tw = r.reduce((a, [, w]) => a + w + 14, -14); let xx = 640 - tw / 2;
      r.forEach(([tg, w], i) => {
        const a = easeOut(clamp((t - .3 - (ri * 6 + i) * .08) / .5));
        c.globalAlpha = a; c.fillStyle = 'rgba(255,255,255,.1)'; c.beginPath(); c.roundRect(xx, 430 + ri * 56 + (1 - a) * 20, w, 42, 21); c.fill();
        c.strokeStyle = 'rgba(242,182,50,.6)'; c.lineWidth = 1.5; c.stroke();
        c.fillStyle = '#fff'; c.fillText(tg, xx + w / 2, 451 + ri * 56 + (1 - a) * 20); xx += w + 14;
      });
    });
    c.globalAlpha = 1;
    const a = easeOut(clamp(t / 1));
    c.fillStyle = `rgba(255,255,255,${a})`; c.font = `900 60px ${F}`; c.fillText('Esporte, saúde e integração', 640, 170);
    c.fillStyle = `rgba(242,182,50,${a})`; c.font = `800 30px ${F}`; c.fillText('o ano inteiro para os associados', 640, 230);
    if (logo.complete && logo.naturalWidth) { const lw = 440, lh = lw * logo.naturalHeight / logo.naturalWidth; c.globalAlpha = easeOut(clamp((t - 1.5) / 1)); c.drawImage(logo, 640 - lw / 2, 320 - lh / 2, lw, lh); c.globalAlpha = 1; }
    c.textBaseline = 'alphabetic';
  });

  const TOTAL = S.reduce((a, s) => a + s.dur, 0);

  // ferramentas de desenho reaproveitadas pelas ilustrações dos slides (js/art.js)
  window.AVArt = { W, H, F, BLUE, NAVY, GOLD, WHITE, SKINS, HAIRS, TEAM_A, TEAM_B, TEAM_C,
    player, ball, card, chips, racket, paddle, sky, banner, crowd, stadium, gym, beach, room, net, scenes: S };

  /* ---------- legenda e marca ---------- */
  function overlay(c, sc, t) {
    if (!sc.title) return;
    const a = easeOut(clamp(t / .7)), out = clamp((sc.dur - t) / .4);
    const k = Math.min(a, out);
    c.save(); c.globalAlpha = k; c.translate((1 - a) * -60, 0);
    c.fillStyle = 'rgba(4,18,46,.78)'; c.beginPath(); c.roundRect(40, 84, 540, 120, 18); c.fill();
    c.fillStyle = GOLD; c.fillRect(40, 84, 8, 120);
    c.textAlign = 'left'; c.fillStyle = GOLD; c.font = `800 17px ${F}`; c.fillText(sc.kind.toUpperCase(), 68, 116);
    c.fillStyle = '#fff'; c.font = `900 ${sc.title.length > 14 ? 38 : 46}px ${F}`; c.fillText(sc.title, 66, 160);
    c.fillStyle = 'rgba(220,232,255,.85)'; c.font = `700 19px ${F}`; c.fillText(sc.sub, 68, 190);
    c.restore();
  }
  function watermark(c) {
    if (logo.complete && logo.naturalWidth) { const lw = 220, lh = lw * logo.naturalHeight / logo.naturalWidth; c.globalAlpha = .85; c.drawImage(logo, 40, 30, lw, lh); c.globalAlpha = 1; }
    c.textAlign = 'right'; c.fillStyle = 'rgba(255,255,255,.85)'; c.font = `800 16px ${F}`; c.fillText('MELHORES DO ANO AV 2026', W - 40, 50);
  }

  function render(c, time) {
    let t = time, i = 0;
    while (i < S.length - 1 && t >= S[i].dur) { t -= S[i].dur; i++; }
    const sc = S[i];
    c.save();
    c.clearRect(0, 0, W, H);
    // leve zoom de câmera
    const z = 1 + t / sc.dur * .04; c.translate(W / 2, H / 2); c.scale(z, z); c.translate(-W / 2, -H / 2);
    sc.draw(c, t, sc.dur);
    c.restore();
    overlay(c, sc, t);
    if (sc.title) watermark(c);
    // transição (fade)
    const f = Math.max(clamp(1 - t / .45), clamp(1 - (sc.dur - t) / .35));
    if (f > 0) { c.fillStyle = `rgba(4,18,46,${f})`; c.fillRect(0, 0, W, H); }
  }

  /* ---------- player ---------- */
  window.ModalidadesVideo = {
    TOTAL,
    mount(el) {
      el.innerHTML = `<canvas width="${W}" height="${H}"></canvas>
        <div class="vctrl"><button data-a="play">▶</button><button data-a="restart">↺</button>
        <div class="seek"><i></i></div><span class="time">0:00 / ${fmt(TOTAL)}</span>
        <button data-a="rec" title="Gera um arquivo de vídeo (.webm) — leva o tempo do vídeo">⬇ Baixar vídeo</button></div>`;
      const cv = el.querySelector('canvas'), c = cv.getContext('2d');
      const bar = el.querySelector('.seek i'), tm = el.querySelector('.time'), bPlay = el.querySelector('[data-a=play]'), bRec = el.querySelector('[data-a=rec]');
      let time = 0, playing = false, last = 0, rec = null;
      const api = { onEnd: null };
      function draw() {
        render(c, Math.min(time, TOTAL - .001));
        bar.style.width = (time / TOTAL * 100) + '%';
        tm.textContent = `${fmt(time)} / ${fmt(TOTAL)}`;
      }
      function loop(now) {
        if (!playing) return;
        time += (now - last) / 1000; last = now;
        if (time >= TOTAL) { time = TOTAL; draw(); stop(true); return; }
        draw(); requestAnimationFrame(loop);
      }
      function start() { if (playing) return; if (time >= TOTAL) time = 0; playing = true; el.classList.remove('paused'); bPlay.textContent = '❚❚'; last = performance.now(); requestAnimationFrame(loop); }
      function stop(ended) {
        playing = false; el.classList.add('paused'); bPlay.textContent = '▶';
        if (ended) { if (rec) rec.stop(); if (api.onEnd) api.onEnd(); if (window.ModalidadesVideo.onEnd) window.ModalidadesVideo.onEnd(); }
      }
      api.play = (fromStart) => { if (fromStart) time = 0; start(); };
      api.pause = () => stop(false);
      api.seek = (s) => { time = s; draw(); };
      window.__video = api;
      el.querySelector('.vctrl').addEventListener('click', e => {
        e.stopPropagation();
        const a = e.target.closest('button')?.dataset.a;
        if (a === 'play') playing ? stop(false) : start();
        if (a === 'restart') { time = 0; draw(); start(); }
        if (a === 'rec') record();
      });
      cv.addEventListener('click', () => playing ? stop(false) : start());
      el.querySelector('.seek').addEventListener('click', e => { const r = e.currentTarget.getBoundingClientRect(); time = clamp((e.clientX - r.left) / r.width) * TOTAL; draw(); });
      function record() {
        if (rec || !cv.captureStream || !window.MediaRecorder) { alert('Seu navegador não permite gravar o vídeo. Use o Chrome ou o Edge.'); return; }
        const type = ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'].find(t => MediaRecorder.isTypeSupported(t));
        const chunks = []; rec = new MediaRecorder(cv.captureStream(30), { mimeType: type, videoBitsPerSecond: 8e6 });
        rec.ondataavailable = e => e.data.size && chunks.push(e.data);
        rec.onstop = () => {
          const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(chunks, { type: 'video/webm' }));
          a.download = 'video-modalidades-AV-2026.webm'; a.click(); rec = null; bRec.textContent = '⬇ Baixar vídeo';
        };
        bRec.textContent = '● Gravando…'; time = 0; rec.start(); start();
      }
      draw();
      document.fonts && document.fonts.ready.then(draw);
      logo.onload = draw;
      return api;
    }
  };
  function fmt(s) { s = Math.floor(s); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }
})();
