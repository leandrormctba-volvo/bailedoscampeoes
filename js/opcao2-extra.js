/* =========================================================
   AJUSTES SÓ DA OPÇÃO 2 (opcao2.html) — carregado depois de js/data.js.
   A apresentação principal (index.html) não usa este arquivo.
   - Capa: Arte 8 (emblema dourado).
   - Slide de vídeo: compilado dos vídeos das modalidades, em tela cheia.
   - Antes dos premiados de cada modalidade: o vídeo daquela modalidade, em tela cheia.
     Clique ou seta → vai para os premiados.
   Vídeos: pasta video/ (feitos a partir de "Videos Esportes 2026/Novo estilo v2").
   ========================================================= */
(function () {
  const D = window.DECK;
  const V = n => 'video/' + n + '.mp4';

  // premiados: box 3D com a modalidade no lugar da foto
  window.O2_SPORTBOX = true;

  // 1) capa = Arte 8
  const ci = D.findIndex(s => s.type === 'cover');
  // (montada ao vivo: fundo na tela toda, brilhos caindo e logo no rodapé)
  if (ci >= 0) D[ci] = { type: 'gala' };

  // 2) vídeo do slide 4 = compilado das modalidades
  const vi = D.findIndex(s => s.type === 'video');
  if (vi >= 0) D[vi] = { type: 'vfile', src: V('compilado'), title: 'Modalidades 2026' };

  // 3) vídeo de cada modalidade antes dos premiados
  //    chave = nome do esporte no data.js (campo sport)
  const VIDEOS = {
    'Corrida Associação Volvo': 'corrida',
    'Poker': 'poker',
    'Truco': 'truco',
    'Xadrez': 'xadrez',
    'Basquete 3x3': 'basquete',
    'Fut-7': 'fut7'
  };
  // vídeos que ainda não têm slide de premiados: entram logo depois do Fut-7
  const EXTRAS_DEPOIS_DO_FUT7 = [
    ['fut7-feminino', 'Copa do Mundo Fut-7 Feminino'],
    ['fut7-master', 'Copa do Mundo Fut-7 Master'],
    ['fut7-interempresas', 'Interempresas Fut-7']
  ];
  const out = [];
  D.forEach(s => {
    const k = s.sport && VIDEOS[s.sport];
    if (k) {
      out.push({ type: 'vfile', src: V(k), title: s.sport });
      // foto dos premiados = um quadro do próprio vídeo (pasta img/videos), no lugar da foto antiga
      s = Object.assign({}, s);
      if (s.type === 'champs') s.photo = 'img/videos/' + k + '.jpg'; else s.img = 'img/videos/' + k + '.jpg';
    }
    out.push(s);
    if (s.type === 'team' && s.sport === 'Fut-7')
      EXTRAS_DEPOIS_DO_FUT7.forEach(([f, t]) => out.push({ type: 'vfile', src: V(f), title: t }));
  });
  window.DECK = out;
})();
