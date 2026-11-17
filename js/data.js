/* =========================================================
   CONTEÚDO DA APRESENTAÇÃO — Melhores do Ano AV 2026
   Para trocar um nome, foto ou número, edite só este arquivo.
   ========================================================= */
// Fotos reais: pasta img/fav (fotos publicadas no site Família AV — familia-av.com).
// Nas listas, o 1º campo de cada item é a foto (ou '' para mostrar só o número).
const F = n => 'img/fav/' + n + '.jpg';

window.DECK = [
  { type: 'cover',
    title: ['MELHORES', 'DO ANO'],
    tag: 'AV 2026' },

  { type: 'numbers',
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
    title: 'Modalidades',
    // 'ic:nome' = ícone do esporte (lista de ícones em js/deck.js)
    items: [
      ['ic:volei', 'Campeonato de Vôlei'], ['ic:futsal', 'Campeonato de Futsal'], ['ic:fut7', 'Campeonato de Fut-7'],
      ['ic:basquete', 'Torneio de Basquete'], ['ic:xadrez', 'Torneios de Xadrez'], ['ic:tenis', 'Torneios de Tênis'],
      ['ic:truco', 'Ranking de Truco — 1º e 2º turnos'], ['ic:poker', 'Poker'], ['ic:futevolei', 'Futevôlei'], ['ic:bola8', 'Torneios de Bola Oito']
    ],
    cta: 'Assistir ao vídeo' },

  { type: 'video',
    // vídeo do canal da Família AV no YouTube (toca o primeiro da lista, em tela grande)
    youtube: [
      { id: 'UACFpmUD5jg', title: 'Retrospectiva da Oliviking 2025' },
      { id: 'Ph90xqEM2cE', title: 'Oliviking 2025 termina em grande estilo' },
      { id: 'BiCF80YDWfw', title: 'Números da Oliviking 2025' },
      { id: 'wNnm4eMn3X4', title: 'Beach tennis encerra a Oliviking' },
      { id: 'hs2CwEHQtek', title: 'África do Sul conquista o prêmio da Oliviking' }
    ] },

  { type: 'list', variant: 'dense',
    title: 'Atividades',
    items: [
      ['', 'Colônia de Férias de verão e inverno'], ['', 'Bailes do Hawaii, Gauchesco e Noite do Horror'],
      ['', 'Karaokê (com banda)'], ['', 'Tardezinha'], ['', 'CozinhaFácil'], ['', 'Festa Julina'],
      ['', 'Festa das Crianças'], ['', 'Encontro de Carros Antigos'],
      ['', 'Fazendo Arte, Camarim de pintura'], ['', 'Excursões: Cruzeiro Nordeste, Foz do Iguaçu e Beto Carrero'],
      ['', 'Passeios ecológicos: Bombinhas, Caverna do Diabo e Morro da Faxina'],
      ['', 'Cursos de Queijos e Vinhos, Cervejas e Bartender'],
      ['', 'Escolinha de Futebol', 'Novidade: turmas em dias de semana'], ['', 'Aula de Patins'],
      ['', 'Aulas de Ballet'], ['', 'Dia das Mães, Dia dos Pais e almoço de Páscoa']
    ] },

  { type: 'list', variant: 'grid',
    title: 'Melhorias',
    items: [
      ['', 'Reforma do Salão VIP'], ['', 'Reforma do Quiosque'], ['', 'Novo Espaço de Lazer'],
      ['', 'Adequação do Espaço Soccer'], ['', 'Reforma da Quadra de Tênis (saibro)'],
      ['', 'Nova divulgação nas redes sociais (Instagram)'], ['', 'Reforma do Viveiro das Aves'],
      ['', 'Espaço Pet'], ['', 'Painéis de LED no Centro de Eventos'],
      ['', 'Sistema de câmeras em todo o clube'], ['', 'Novo piso e brinquedos no parquinho do Soccer']
    ] },

  { type: 'list', variant: 'grid',
    title: 'Próximos passos',
    items: [
      ['', 'Novo App da Associação'], ['', 'Nova Churrasqueira'], ['', 'Nova Academia e Administrativo'],
      ['', 'Salas de Lutas'], ['', 'Ballet'], ['', 'Jogos'],
      ['', 'Novas Excursões'], ['', 'Colônias de Férias'], ['', 'Cosplay — 21/04']
    ] },

  { type: 'photo',
    title: 'Nosso time',
    img: F('campeoes') },  // trocar pela foto da equipe da Associação Volvo

  { type: 'divider',
    title: 'Modalidades',
    sub: 'Individuais ou duplas',
    list: ['Bola 8', 'Corrida Rústica', 'Tênis', 'Poker', 'Beach Tennis', 'Futevôlei', 'Vôlei de Areia', 'Truco', 'Xadrez'],
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
    title: 'Modalidades',
    sub: 'Coletivas',
    list: ['Basquete 3x3', 'Futsal Feminino', 'Futsal Masculino', 'Fut-7', 'Vôlei Feminino', 'Vôlei Masculino'],
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
