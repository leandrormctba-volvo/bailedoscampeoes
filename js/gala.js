/* =========================================================
   CAPA "GALA" DA OPÇÃO 2 — brilhos dourados caindo do alto, na tela toda.
   Só anima enquanto a capa está na tela (economiza o computador nos outros slides).
   ========================================================= */
(function () {
  const cv = document.getElementById('glitter');
  if (!cv) return;
  const cx = cv.getContext('2d');
  let W = 0, H = 0, R = 1, parts = [], on = false, last = 0;

  function size() {
    R = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * R); cv.height = Math.round(H * R);
    cx.setTransform(R, 0, 0, R, 0, 0);
    const n = Math.round(Math.min(420, Math.max(160, W * H / 5200)));
    while (parts.length < n) parts.push(make(true));
    parts.length = n;
  }
  // cada brilho: tamanho variado (alguns grandes e desfocados, como luz fora de foco), cai devagar balançando e pisca
  function make(anyY) {
    const big = Math.random() < .12;
    const r = big ? 3 + Math.random() * 5 : .6 + Math.pow(Math.random(), 2.2) * 2.6;
    return {
      x: Math.random() * W, y: anyY ? Math.random() * H : -20 - Math.random() * 80,
      r, big, vy: (big ? .25 : .35) + Math.random() * (big ? .5 : 1.25),
      sw: .4 + Math.random() * 1.2, sf: .3 + Math.random() * 1.2, ph: Math.random() * 6.28,
      tw: 1.5 + Math.random() * 4, hue: 38 + Math.random() * 12, lit: 58 + Math.random() * 25
    };
  }
  function frame(t) {
    if (!on) return;
    const dt = Math.min(50, t - (last || t)) / 16.7; last = t;
    cx.clearRect(0, 0, W, H);
    cx.globalCompositeOperation = 'lighter';
    for (const p of parts) {
      p.y += p.vy * dt; p.x += Math.sin(t / 1000 * p.sf + p.ph) * p.sw * .35 * dt;
      if (p.y > H + 20) Object.assign(p, make(false), { x: Math.random() * W });
      const tw = .45 + .55 * Math.max(0, Math.sin(t / 1000 * p.tw + p.ph)); // piscar
      const a = (p.big ? .28 : .9) * tw;
      if (p.big) {
        const g = cx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        g.addColorStop(0, `hsla(${p.hue},95%,${p.lit}%,${a})`); g.addColorStop(1, `hsla(${p.hue},95%,${p.lit}%,0)`);
        cx.fillStyle = g; cx.beginPath(); cx.arc(p.x, p.y, p.r * 3, 0, 6.283); cx.fill();
      } else {
        cx.fillStyle = `hsla(${p.hue},100%,${p.lit}%,${a})`;
        cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.283); cx.fill();
        // os mais brilhantes ganham uma cruz de luz
        if (p.r > 1.9 && tw > .85) {
          const L = p.r * 5 * tw; cx.strokeStyle = `hsla(${p.hue},100%,85%,${a * .7})`; cx.lineWidth = .8;
          cx.beginPath(); cx.moveTo(p.x - L, p.y); cx.lineTo(p.x + L, p.y); cx.moveTo(p.x, p.y - L); cx.lineTo(p.x, p.y + L); cx.stroke();
        }
      }
    }
    cx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(frame);
  }
  function check() {
    const act = !!document.querySelector('.slide.active.t-gala');
    if (act && !on) { on = true; last = 0; requestAnimationFrame(frame); }
    if (!act && on) { on = false; cx.clearRect(0, 0, W, H); }
  }
  addEventListener('resize', size); size();
  // acompanha a troca de slide
  new MutationObserver(check).observe(document.getElementById('slides'), { subtree: true, attributes: true, attributeFilter: ['class'] });
  check();
})();
