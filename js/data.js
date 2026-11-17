/* =========================================================
   CONTEÚDO DA APRESENTAÇÃO — Melhores do Ano AV 2026
   Para trocar um nome, foto ou número, edite só este arquivo.
   ========================================================= */
// As imagens dos atletas são ILUSTRAÇÕES geradas por código (js/art.js), não fotos reais.
// "art" descreve o cenário (env), a camisa (kit) e os números de cada atleta (n); f: true = mulher.
const team = (nums, f) => nums.map(n => ({ n, f: !!f }));

window.DECK = [
  { type: 'cover',
    kicker: 'Festa dos Campeões',
    title: ['MELHORES', 'DO ANO'],
    tag: 'AV 2026',
    img: 'img/capa-medalha.jpg' },

  { type: 'numbers',
    kicker: 'Retrospectiva',
    title: 'O ano em números',
    items: [
      { n: 10, label: 'modalidades esportivas', sub: 'campeonatos, torneios e rankings' },
      { n: 17, label: 'atividades e eventos', sub: 'bailes, festas, cursos e aulas' },
      { n: 11, label: 'melhorias na estrutura', sub: 'reformas e novos espaços' },
      { n: 15, label: 'modalidades premiadas', sub: '9 individuais/duplas + 6 coletivas' },
      { n: 35, label: 'atletas premiados', sub: 'em modalidades individuais e duplas' },
      { n: 6,  label: 'equipes campeãs', sub: 'basquete, futsal, fut-7 e vôlei' }
    ] },

  { type: 'list', variant: 'sports',
    kicker: 'Esporte o ano inteiro',
    title: 'Modalidades',
    img: 'img/bolas.png',
    items: [
      ['🏐', 'Campeonato de Vôlei'], ['⚽', 'Campeonato de Futsal'], ['🥅', 'Campeonato de Fut-7'],
      ['🏀', 'Torneio de Basquete'], ['♟️', 'Torneios de Xadrez'], ['🎾', 'Torneios de Tênis'],
      ['🃏', 'Ranking de Truco — 1º e 2º turnos'], ['♠️', 'Poker'], ['🏖️', 'Futevôlei'], ['🎱', 'Torneios de Bola Oito']
    ],
    cta: 'Assistir ao vídeo das modalidades' },

  { type: 'video',
    kicker: 'Associação Volvo em movimento',
    title: 'Vídeo das modalidades' },

  { type: 'list',
    kicker: 'Lazer e convivência',
    title: 'Atividades',
    items: [
      ['☀️', 'Colônia de Férias de verão e inverno'], ['🌺', 'Bailes do Hawaii, Gauchesco e Noite do Horror'],
      ['🎤', 'Karaokê (com banda)'], ['🌇', 'Tardezinha'], ['🍳', 'CozinhaFácil'], ['🌽', 'Festa Julina'],
      ['🎈', 'Festa das Crianças'], ['🚗', 'Encontro de Carros Antigos']
    ] },

  { type: 'list',
    kicker: 'E tem mais',
    title: '+ Atividades',
    items: [
      ['🎨', 'Fazendo Arte, Camarim de pintura'], ['🚢', 'Excursões: Cruzeiro Nordeste, Foz do Iguaçu e Beto Carrero'],
      ['🥾', 'Passeios ecológicos: trilhas em Bombinhas, Caverna do Diabo e Morro da Faxina'],
      ['🍷', 'Cursos de Queijos e Vinhos, Harmonização de Cervejas e Bartender'],
      ['⚽', 'Escolinha de Futebol', 'Novidade: turmas em dias de semana'], ['🛼', 'Aula de Patins'],
      ['🩰', 'Aulas de Ballet'], ['💐', 'Dia das Mães, Dia dos Pais e almoço de Páscoa']
    ] },

  { type: 'list', variant: 'grid',
    kicker: 'Nosso clube mais completo',
    title: 'Melhorias',
    items: [
      ['🏛️', 'Reforma do Salão VIP'], ['🛖', 'Reforma do Quiosque'], ['🌳', 'Novo Espaço de Lazer'],
      ['⚽', 'Adequação do Espaço Soccer'], ['🎾', 'Reforma da Quadra de Tênis (saibro)'],
      ['📱', 'Nova divulgação nas redes sociais (Instagram)'], ['🦜', 'Reforma do Viveiro das Aves'],
      ['🐾', 'Espaço Pet'], ['📺', 'Painéis de LED no Centro de Eventos'],
      ['📹', 'Sistema de câmeras em todo o clube'], ['🛝', 'Novo piso e brinquedos no parquinho do Soccer']
    ] },

  { type: 'list', variant: 'grid',
    kicker: 'O que vem por aí',
    title: 'Próximos passos',
    items: [
      ['📲', 'Novo App da Associação'], ['🔥', 'Nova Churrasqueira'], ['🏋️', 'Nova Academia e Administrativo'],
      ['🥋', 'Salas de Lutas'], ['🩰', 'Ballet'], ['🎮', 'Jogos'],
      ['🧳', 'Novas Excursões'], ['🏕️', 'Colônias de Férias'], ['🦸', 'Cosplay — 21/04']
    ] },

  { type: 'photo',
    kicker: 'Quem faz acontecer',
    title: 'Nosso time',
    art: { env: 'club', layout: 'staff', people: [{}, {}, { f: true }, { f: true }, {}, {}, { f: true }, { f: true }, {}, {}, { f: true }].map(p => ({ ...p, n: '' })) } },

  { type: 'divider',
    kicker: 'Premiação dos campeões',
    title: 'Modalidades',
    sub: 'Individuais ou duplas',
    img: 'img/abertura-individuais.jpg' },

  { type: 'champs', group: 'Individuais', sport: 'Bola 8', aspect: '2/3',
    people: [{ art: { env: 'pool', prop: ['cue'], people: [{ n: 8 }] }, name: 'Rodrigo Oliveira “Banana”', detail: '1ª etapa', place: 1 }] },

  { type: 'race', group: 'Individuais', sport: 'Corrida Rústica', stage: 'Etapa Volvo',
    art: { scene: 'CORRIDA RÚSTICA', t: 2.2 },
    cols: [
      { title: '5 km', rows: [
        ['Camile Fagundes Alves', 'Fem · 17 a 30 anos'],
        ['Cristiane Walbach de Assis', 'Fem · 45+'],
        ['Allyf Cihade', 'Masc · 17 a 30 anos'],
        ['Diogo Machado', 'Masc · 31 a 44 anos'],
        ['Basílio Fernandes', 'Masc · 45+'] ] },
      { title: '10 km', rows: [
        ['Isabela Ferreira da Silva', 'Fem · 17 a 24 anos'],
        ['Letícia dos Santos Lima', 'Fem · 31 a 44 anos'],
        ['Gustavo Cezar Rabb', 'Masc · 17 a 24 anos'],
        ['Eliel Sant Ana', 'Masc · 31 a 44 anos'],
        ['Marcos Antônio Stocco', 'Masc · 45+'] ] }
    ] },

  { type: 'champs', group: 'Individuais', sport: 'Tênis', stage: '1ª etapa', aspect: '3/4',
    people: [
      { art: { env: 'clay', prop: ['racket'], people: [{ n: 1 }] }, name: 'Juliano Rocha', detail: 'Classe A', place: 1 },
      { art: { env: 'clay', prop: ['racket'], people: [{ n: 2 }] }, name: 'Maison Grande', detail: 'Classe B', place: 1 },
      { art: { env: 'clay', prop: ['racket'], people: [{ n: 3 }] }, name: 'Edinaldo Martins', detail: 'Classe C', place: 1 },
      { art: { env: 'clay', prop: ['racket'], people: [{ n: 4 }] }, name: 'Wagner Stroparo', detail: 'Classe D', place: 1 },
      { art: { env: 'clay', prop: ['racket'], people: [{ n: 5, medal: 'silver' }] }, name: 'Mauricio Pelini', detail: 'Classe B', place: 2 } ] },

  { type: 'champs', group: 'Individuais', sport: 'Tênis', stage: '2ª etapa', aspect: '3/4',
    people: [
      { art: { env: 'clay', prop: ['racket'], people: [{ n: 7 }] }, name: 'Daniel Zanotto', detail: 'Classe B', place: 1 },
      { art: { env: 'clay', prop: ['racket'], people: [{ n: 9 }] }, name: 'Thiago Rudol', detail: 'Classe D', place: 1 },
      { art: { env: 'clay', prop: ['racket'], people: [{ n: 11, medal: 'silver' }] }, name: 'Lucas Beghini', detail: 'Classe A', place: 2 } ] },

  { type: 'champs', group: 'Individuais', sport: 'Poker', aspect: '3/4',
    people: [
      { art: { env: 'poker', prop: ['cards'], people: [{ n: 21, medal: 'silver' }] }, name: 'Cristiano Schuh', detail: 'Vice-campeão · 1º e 2º semestres', place: 2 },
      { art: { env: 'poker', prop: ['cards'], people: [{ n: 1 }] }, name: 'Ricardo Santos', detail: 'Campeão · 1º semestre', place: 1 } ] },

  { type: 'champs', group: 'Duplas', sport: 'Beach Tennis', aspect: '16/10',
    people: [{ art: { env: 'beach', prop: ['paddle'], people: [{ n: 6, f: true }, { n: 9, f: true }] }, name: 'Caren Alves e Juliana Lima', detail: 'Dupla campeã', place: 1 }] },

  { type: 'champs', group: 'Duplas', sport: 'Futevôlei', aspect: '4/3',
    people: [
      { art: { env: 'beach', people: [{ n: 10 }, { n: 7 }] }, name: 'Christian e Kaue', detail: 'Categoria Ouro', place: 1 },
      { art: { env: 'beach', people: [{ n: 3 }, { n: 8 }] }, name: 'Ander e Alexandre', detail: 'Categoria Prata', place: 1 },
      { art: { env: 'beach', people: [{ n: 11 }, { n: 5, f: true }] }, name: 'Clevinho e Bruna', detail: 'Categoria Mista', place: 1 } ] },

  { type: 'champs', group: 'Duplas', sport: 'Vôlei de Areia', aspect: '4/3',
    people: [{ art: { env: 'beach', people: [{ n: 4 }, { n: 12 }] }, name: 'Lucas Santos e Alfredo Stahnke Jr', detail: 'Dupla campeã', place: 1 }] },

  { type: 'champs', group: 'Duplas', sport: 'Truco', aspect: '4/3',
    people: [{ art: { env: 'cards', prop: ['cards'], people: [{ n: 4 }, { n: 7 }] }, name: 'Sergio Wambier e Genésio Aparecido da Silva', detail: 'Dupla campeã', place: 1 }] },

  { type: 'champs', group: 'Individuais', sport: 'Xadrez', stage: '2ª etapa', aspect: '3/4',
    people: [
      { art: { env: 'chess', people: [{ n: 1 }] }, name: 'Juliano Rocha', detail: 'Campeão · 2ª etapa', place: 1 },
      { art: { env: 'chess', people: [{ n: 2, medal: 'silver' }] }, name: 'Everson Machado', detail: 'Vice-campeão · 2ª etapa', place: 2 } ] },

  { type: 'divider',
    kicker: 'Premiação dos campeões',
    title: 'Modalidades',
    sub: 'Coletivas',
    img: 'img/abertura-coletivas.jpg' },

  { type: 'team', sport: 'Basquete 3x3', team: 'Vaticano',
    art: { env: 'wood', kit: { jersey: '#f3f6fb', text: '#7a5a10', shorts: '#c99a2e', trim: '#c99a2e', sock: '#fff' }, people: team([23, 11, 7, 32]) } },
  { type: 'team', sport: 'Futsal Feminino', team: 'Campeãs',
    art: { env: 'futsal', people: team([10, 7, 9, 5, 1], true) },
    members: ['Aline Dutra', 'Jaqueline Moreira', 'Nathali Veiga', 'Sara Veiga', 'Taiana Santos'] },
  { type: 'team', sport: 'Futsal Masculino', team: 'Powertrain',
    art: { env: 'futsal', kit: { jersey: '#0a4ea3', text: '#fff', shorts: '#071d3f', trim: '#f2b632' }, people: team([10, 8, 5, 1, 9, 12, 7]) } },
  { type: 'team', sport: 'Fut-7', team: 'Alemanha',
    art: { env: 'stadium', kit: { jersey: '#f3f6fb', text: '#111', shorts: '#111', trim: '#d21f2b', sock: '#fff' }, people: team([1, 4, 10, 7, 9, 3, 11, 5, 8]) } },
  { type: 'team', sport: 'Vôlei Feminino', team: 'Haiti',
    art: { env: 'volley', kit: { jersey: '#f07a10', text: '#fff', shorts: '#071d3f', trim: '#071d3f' }, people: team([1, 4, 6, 9, 11, 12, 14, 17, 3], true) } },
  { type: 'team', sport: 'Vôlei Masculino', team: 'Brasil',
    art: { env: 'volley', kit: { jersey: '#f2c200', text: '#0a3a8a', shorts: '#0a3a8a', trim: '#127a3a', sock: '#fff' }, people: team([1, 5, 7, 10, 12, 13, 14, 18, 3]) } },

  { type: 'final',
    title: 'Parabéns',
    sub: 'a todos os campeões!',
    img: 'img/parabens.jpg' }
];
