/* =========================================================
   CONTEÚDO DA APRESENTAÇÃO — Melhores do Ano AV 2026
   Para trocar um nome, foto ou número, edite só este arquivo.
   ========================================================= */
// Fotos reais: pasta img/fav (fotos publicadas no site Família AV — familia-av.com).
// Nas listas, o 1º campo de cada item é a foto (ou '' para mostrar só o número).
const F = n => 'img/fav/' + n + '.jpg';

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
    mosaic: [F('volei'), F('futevolei'), F('tenis3'), F('bola8')],
    items: [
      [F('volei'), 'Campeonato de Vôlei'], [F('futfem'), 'Campeonato de Futsal'], [F('futmasc'), 'Campeonato de Fut-7'],
      [F('basquete'), 'Torneio de Basquete'], [F('xadrez2'), 'Torneios de Xadrez'], [F('tenis2'), 'Torneios de Tênis'],
      [F('truco2'), 'Ranking de Truco — 1º e 2º turnos'], [F('poker'), 'Poker'], [F('futevoleif'), 'Futevôlei'], [F('bola8'), 'Torneios de Bola Oito']
    ],
    cta: 'Assistir ao vídeo das modalidades' },

  { type: 'video',
    kicker: 'Associação Volvo em movimento',
    title: 'Vídeo das modalidades',
    // vídeos do canal da Família AV no YouTube (o primeiro abre automaticamente)
    youtube: [
      { id: 'UACFpmUD5jg', title: 'Retrospectiva da Oliviking 2025' },
      { id: 'Ph90xqEM2cE', title: 'Oliviking 2025 termina em grande estilo' },
      { id: 'BiCF80YDWfw', title: 'Números da Oliviking 2025' },
      { id: 'wNnm4eMn3X4', title: 'Beach tennis encerra a Oliviking' },
      { id: 'hs2CwEHQtek', title: 'África do Sul conquista o prêmio da Oliviking' }
    ] },

  { type: 'list',
    kicker: 'Lazer e convivência',
    title: 'Atividades',
    items: [
      [F('colonia'), 'Colônia de Férias de verão e inverno'], [F('havai'), 'Bailes do Hawaii, Gauchesco e Noite do Horror'],
      ['', 'Karaokê (com banda)'], [F('tardezinha'), 'Tardezinha'], ['', 'CozinhaFácil'], [F('julina'), 'Festa Julina'],
      [F('criancas'), 'Festa das Crianças'], [F('carros'), 'Encontro de Carros Antigos']
    ] },

  { type: 'list',
    kicker: 'E tem mais',
    title: '+ Atividades',
    items: [
      ['', 'Fazendo Arte, Camarim de pintura'], ['', 'Excursões: Cruzeiro Nordeste, Foz do Iguaçu e Beto Carrero'],
      [F('trilhas'), 'Passeios ecológicos: trilhas em Bombinhas, Caverna do Diabo e Morro da Faxina'],
      ['', 'Cursos de Queijos e Vinhos, Harmonização de Cervejas e Bartender'],
      ['', 'Escolinha de Futebol', 'Novidade: turmas em dias de semana'], ['', 'Aula de Patins'],
      [F('ballet'), 'Aulas de Ballet'], ['', 'Dia das Mães, Dia dos Pais e almoço de Páscoa']
    ] },

  { type: 'list', variant: 'grid',
    kicker: 'Nosso clube mais completo',
    title: 'Melhorias',
    items: [
      ['', 'Reforma do Salão VIP'], ['', 'Reforma do Quiosque'], ['', 'Novo Espaço de Lazer'],
      ['', 'Adequação do Espaço Soccer'], [F('tenis4'), 'Reforma da Quadra de Tênis (saibro)'],
      ['', 'Nova divulgação nas redes sociais (Instagram)'], ['', 'Reforma do Viveiro das Aves'],
      ['', 'Espaço Pet'], ['', 'Painéis de LED no Centro de Eventos'],
      [F('infra'), 'Sistema de câmeras em todo o clube'], [F('kids'), 'Novo piso e brinquedos no parquinho do Soccer']
    ] },

  { type: 'list', variant: 'grid',
    kicker: 'O que vem por aí',
    title: 'Próximos passos',
    items: [
      [F('app'), 'Novo App da Associação'], ['', 'Nova Churrasqueira'], ['', 'Nova Academia e Administrativo'],
      ['', 'Salas de Lutas'], [F('ballet'), 'Ballet'], ['', 'Jogos'],
      ['', 'Novas Excursões'], [F('colonia'), 'Colônias de Férias'], ['', 'Cosplay — 21/04']
    ] },

  { type: 'photo',
    kicker: 'Quem faz acontecer',
    title: 'Nosso time',
    img: F('campeoes') },

  { type: 'divider',
    kicker: 'Premiação dos campeões',
    title: 'Modalidades',
    sub: 'Individuais ou duplas',
    img: 'img/abertura-individuais.jpg' },

  { type: 'champs', group: 'Individuais', sport: 'Bola 8', photo: F('bola8'),
    people: [{ name: 'Rodrigo Oliveira “Banana”', detail: '1ª etapa', place: 1 }] },

  { type: 'race', group: 'Individuais', sport: 'Corrida Rústica', stage: 'Etapa Volvo',
    img: F('corrida'),
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

  { type: 'champs', group: 'Individuais', sport: 'Tênis', stage: '1ª etapa', photo: F('tenis'),
    people: [
      { name: 'Juliano Rocha', detail: 'Classe A', place: 1 },
      { name: 'Maison Grande', detail: 'Classe B', place: 1 },
      { name: 'Edinaldo Martins', detail: 'Classe C', place: 1 },
      { name: 'Wagner Stroparo', detail: 'Classe D', place: 1 },
      { name: 'Mauricio Pelini', detail: 'Classe B', place: 2 } ] },

  { type: 'champs', group: 'Individuais', sport: 'Tênis', stage: '2ª etapa', photo: F('tenis2'),
    people: [
      { name: 'Daniel Zanotto', detail: 'Classe B', place: 1 },
      { name: 'Thiago Rudol', detail: 'Classe D', place: 1 },
      { name: 'Lucas Beghini', detail: 'Classe A', place: 2 } ] },

  { type: 'champs', group: 'Individuais', sport: 'Poker', photo: F('poker2'),
    people: [
      { name: 'Ricardo Santos', detail: 'Campeão · 1º semestre', place: 1 },
      { name: 'Cristiano Schuh', detail: 'Vice-campeão · 1º e 2º semestres', place: 2 } ] },

  { type: 'champs', group: 'Duplas', sport: 'Beach Tennis', photo: F('beach'),
    people: [{ name: 'Caren Alves e Juliana Lima', detail: 'Dupla campeã', place: 1 }] },

  { type: 'champs', group: 'Duplas', sport: 'Futevôlei', photo: F('futevolei'),
    people: [
      { name: 'Christian e Kaue', detail: 'Categoria Ouro', place: 1 },
      { name: 'Ander e Alexandre', detail: 'Categoria Prata', place: 1 },
      { name: 'Clevinho e Bruna', detail: 'Categoria Mista', place: 1 } ] },

  { type: 'champs', group: 'Duplas', sport: 'Vôlei de Areia', photo: F('areia'),
    people: [{ name: 'Lucas Santos e Alfredo Stahnke Jr', detail: 'Dupla campeã', place: 1 }] },

  { type: 'champs', group: 'Duplas', sport: 'Truco', photo: F('truco'),
    people: [{ name: 'Sergio Wambier e Genésio Aparecido da Silva', detail: 'Dupla campeã', place: 1 }] },

  { type: 'champs', group: 'Individuais', sport: 'Xadrez', stage: '2ª etapa', photo: F('xadrez'),
    people: [
      { name: 'Juliano Rocha', detail: 'Campeão · 2ª etapa', place: 1 },
      { name: 'Everson Machado', detail: 'Vice-campeão · 2ª etapa', place: 2 } ] },

  { type: 'divider',
    kicker: 'Premiação dos campeões',
    title: 'Modalidades',
    sub: 'Coletivas',
    img: 'img/abertura-coletivas.jpg' },

  { type: 'team', sport: 'Basquete 3x3', team: 'Vaticano', img: F('basquete') },
  { type: 'team', sport: 'Futsal Feminino', team: 'Campeãs', img: F('futfem'),
    members: ['Aline Dutra', 'Jaqueline Moreira', 'Nathali Veiga', 'Sara Veiga', 'Taiana Santos'] },
  { type: 'team', sport: 'Futsal Masculino', team: 'Powertrain', img: F('futmasc') },
  { type: 'team', sport: 'Fut-7', team: 'Alemanha', img: F('copa') },
  { type: 'team', sport: 'Vôlei Feminino', team: 'Haiti', img: F('volei') },
  { type: 'team', sport: 'Vôlei Masculino', team: 'Brasil', img: F('volmasc') },

  { type: 'final',
    title: 'Parabéns',
    sub: 'a todos os campeões!',
    img: 'img/parabens.jpg' }
];
