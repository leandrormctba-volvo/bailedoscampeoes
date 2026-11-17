/* Fundo animado discreto ("proteção de tela"): manchas de luz azul em movimento lento,
   ondas finas e partículas suaves. Fica atrás do conteúdo sem chamar atenção. */
(function () {
  const cv = document.getElementById('bg');
  const ctx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W, H, parts = [];

  const blobs = [
    { c: [10, 78, 163], r: .55, x: .25, y: .35, sx: .00011, sy: .00007, p: 0 },
    { c: [47, 143, 232], r: .45, x: .75, y: .65, sx: .00008, sy: .00012, p: 2 },
    { c: [6, 40, 110], r: .6, x: .6, y: .2, sx: .00006, sy: .00009, p: 4 },
    { c: [32, 110, 200], r: .35, x: .15, y: .85, sx: .0001, sy: .00006, p: 1 },
    { c: [242, 182, 50], r: .22, x: .9, y: .1, sx: .00005, sy: .00008, p: 3, a: .07 }
  ];

  function resize() {
    W = cv.width = Math.round(innerWidth * Math.min(devicePixelRatio || 1, 1.5));
    H = cv.height = Math.round(innerHeight * Math.min(devicePixelRatio || 1, 1.5));
    parts = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: .6 + Math.random() * 1.8,
      vy: -(.08 + Math.random() * .25), vx: (Math.random() - .5) * .1, a: .15 + Math.random() * .35, tw: Math.random() * 6
    }));
  }

  function frame(t) {
    ctx.globalCompositeOperation = 'source-over';
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#030c22'); g.addColorStop(.5, '#06194a'); g.addColorStop(1, '#020a1d');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    ctx.globalCompositeOperation = 'lighter';
    const m = Math.max(W, H);
    for (const b of blobs) {
      const x = (b.x + Math.sin(t * b.sx + b.p) * .18) * W;
      const y = (b.y + Math.cos(t * b.sy + b.p) * .16) * H;
      const r = b.r * m * (1 + Math.sin(t * .0002 + b.p) * .08);
      const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
      const a = b.a || .32;
      rg.addColorStop(0, `rgba(${b.c},${a})`); rg.addColorStop(1, `rgba(${b.c},0)`);
      ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
    }

    // ondas finas
    ctx.lineWidth = Math.max(1, W / 1600);
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      const base = H * (.55 + i * .07), amp = H * (.05 + i * .012), ph = t * .00012 * (1 + i * .2) + i;
      for (let x = 0; x <= W; x += 16) {
        const y = base + Math.sin(x / W * Math.PI * 2 + ph) * amp + Math.sin(x / W * 7 + ph * 1.7) * amp * .25;
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = `rgba(120,180,255,${.05 + i * .012})`;
      ctx.stroke();
    }

    // partículas
    for (const p of parts) {
      p.y += p.vy; p.x += p.vx;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
      const a = p.a * (.6 + .4 * Math.sin(t * .002 + p.tw));
      ctx.fillStyle = `rgba(190,220,255,${a})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (W / 1600), 0, 7); ctx.fill();
    }

    // vinheta para manter o foco no conteúdo
    ctx.globalCompositeOperation = 'source-over';
    const v = ctx.createRadialGradient(W / 2, H / 2, m * .25, W / 2, H / 2, m * .75);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,4,14,.55)');
    ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);

    if (!reduce) requestAnimationFrame(frame);
  }

  addEventListener('resize', resize);
  resize();
  requestAnimationFrame(frame);
})();
