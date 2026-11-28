/* =========================================================
   CONTEÚDO DA APRESENTAÇÃO — Melhores do Ano AV 2026
   Para trocar um nome, foto ou número, edite só este arquivo.
   Atualizado com o "ROTEIRO FESTA DOS CAMPEÕES 2026".
   ========================================================= */
// Fotos reais: pasta img/fav (fotos publicadas no site Família AV — familia-av.com).
// Nas listas, o 1º campo de cada item é a foto (ou '' para mostrar só o texto).
const F = n => 'img/fav/' + n + '.jpg';

window.DECK = [
  { type: 'cover',
    title: ['MELHORES', 'DO ANO'],
    tag: 'AV 2026' },

  { type: 'numbers',
    title: 'O ano em números',
    // pre: texto antes do número (ex.: '+')
    items: [
      { n: 45, pre: '+', label: 'anos de história', sub: 'cuidando das pessoas e conectando histórias' },
      { n: 15, label: 'modalidades esportivas', sub: 'campeonatos, torneios e rankings' },
      { n: 600, pre: '+', label: 'corredores', sub: 'na Corrida Associação Volvo' },
      { n: 682, label: 'crianças na Colônia de Férias', sub: 'verão e inverno' },
      { n: 7000, pre: '+', label: 'pessoas no Arraiá da AV', sub: 'recorde de público' },
      { n: 5000, pre: '+', label: 'pessoas na Festa das Crianças', sub: 'diversão para toda a família' }
    ] },

  { type: 'list', variant: 'sports',
    title: 'Modalidades',
    // 'ic:nome' = ícone do esporte (lista de ícones em js/deck.js); 3º campo = participantes
    items: [
      ['ic:volei', 'Vôlei Masculino', '5 equipes'],
      ['ic:fut7', 'Fut-7 Masculino', '8 equipes'],
      ['ic:fut7', 'Fut-7 Feminino', '2 equipes · novidade'],
      ['ic:fut7', 'Fut-7 Masculino 35+', '6 equipes'],
      ['ic:futsal', 'Futebol Masculino', '6 equipes'],
      ['ic:basquete', 'Basquete 3x3 M/F', '5 equipes'],
      ['ic:xadrez', 'Xadrez', '2 torneios · 24 participantes'],
      ['ic:tenis', 'Tênis M/F — 3 etapas', '135 participações'],
      ['ic:truco', 'Ranking de Truco', '91 participantes'],
      ['ic:poker', 'Poker — 2 rankings', '+ de 100 participantes'],
      ['ic:futevolei', 'Futevôlei', '+ de 30 participantes'],
      ['ic:corrida', 'Corrida Associação Volvo', '+ de 600 participantes'],
      ['ic:pingpong', 'Tênis de Mesa', '41 participantes · novidade'],
      ['ic:volei', 'Vôlei de Areia M/F', '16 duplas'],
      ['ic:cartola', 'Cartola', '81 participantes']
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
      ['', 'Colônia de Férias de verão e inverno', '682 crianças'],
      ['', 'Bailes do Flashback e Noite do Horror', 'média de 400 pessoas'],
      ['', 'Arraiá da AV', '+ de 7.000 pessoas · recorde'],
      ['', 'Festa das Crianças', '+ de 5.000 pessoas'],
      ['', 'Encontro de Carros Antigos (noturno)', '+ de 80 carros'],
      ['', 'Cozinha Fácil — sushi, pizza, Dia das Crianças e panettone', '4 edições · 222 participantes'],
      ['', 'Halloween Kids', 'novidade · 110 participantes'],
      ['', 'Ginástica Rítmica', 'novidade'],
      ['', 'Fut-7 Feminino', 'novidade'],
      ['', 'Tênis de Mesa adulto e infanto-juvenil', 'novidade']
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

  { type: 'list', variant: 'photos',
    title: 'Próximos passos',
    // '?' = espaço reservado para a foto. Para colocar a foto, troque '?' pelo caminho, ex.: 'img/proximos/academia.jpg'
    items: [
      ['?', 'Nova Academia'], ['?', 'Novo Escritório AV'], ['?', 'Evento Cosplay'],
      ['?', 'Campeonatos'], ['?', 'Excursões Internacionais']
    ] },

  { type: 'photo',
    title: 'Nosso time',
    img: 'img/nosso-time.webp' },  // foto da equipe da Associação Volvo

  { type: 'divider',
    title: 'Modalidades',
    sub: 'Individuais ou duplas',
    list: ['Corrida AV', 'Tênis', 'Poker', 'Futevôlei', 'Vôlei de Areia', 'Truco', 'Xadrez', 'Tênis de Mesa'],
    img: 'img/abertura-individuais.jpg' },

  // linhas: [nome, categoria, colocação]
  { type: 'race', group: 'Individuais', sport: 'Corrida Associação Volvo', stage: '2026',
    img: F('corrida'),
    cols: [
      { title: '5 km', rows: [
        ['Robinilson Costa Martins', 'Masculino', 1],
        ['Marcos Diego Leandro de Sousa', 'Masculino', 2],
        ['Fabio de Lima Camargo', 'Masculino', 3],
        ['Janaina Marcelo Coiado', 'Feminino', 1],
        ['Erita Joara Pickler', 'Feminino', 2],
        ['Cristiane Walbach de Assis', 'Feminino', 3] ] },
      { title: '10 km', rows: [
        ['Marcos Antonio Stocco', 'Masculino', 1],
        ['Thiago Marzani da Silva', 'Masculino', 2],
        ['Fabrício Aparecido Cardozo', 'Masculino', 3],
        ['Liliane Gonçalves Gomes Wrublewski', 'Feminino', 1],
        ['Rafaela Moretto', 'Feminino', 2],
        ['Gabriella Gonchorovski dos Santos', 'Feminino', 3] ] }
    ] },

  { type: 'race', group: 'Individuais', sport: 'Tênis de Campo', stage: '2026',
    img: F('tenis'),
    cols: [
      { title: 'Masculino', rows: [
        ['José Carlos Oliveira Junior', 'Campeão', 1],
        ['Marco Paiano', 'Vice-campeão', 2],
        ['Juliano Rocha', '3º lugar', 3] ] },
      { title: 'Feminino', rows: [
        ['Cibele Gabardo', 'Campeã', 1],
        ['Rafaela Novaski Morges', 'Vice-campeã', 2],
        ['Sara Veiga', '3º lugar', 3] ] }
    ] },

  { type: 'race', group: 'Individuais', sport: 'Tênis de Mesa', stage: '2026',
    img: 'img/tenis-de-mesa.svg',
    cols: [
      { title: 'Masculino', rows: [
        ['Marcelo Silva', 'Campeão', 1],
        ['Bruno Firakoski', 'Vice-campeão', 2],
        ['Fabio Augusto Ribeiro', '3º lugar', 3] ] },
      { title: 'Feminino', rows: [
        ['Manoela Arantes', 'Campeã', 1],
        ['Cibele Gabardo', 'Vice-campeã', 2],
        ['Sara Veiga', '3º lugar', 3] ] }
    ] },

  // Poker: dois rankings (1º e 2º semestre), do 1º ao 3º lugar
  { type: 'race', group: 'Individuais', sport: 'Poker', stage: '2026',
    img: F('poker2'),
    cols: [
      { title: 'Ranking 1º semestre', rows: [
        ['Cristiano Schuh', 'Campeão', 1],
        ['Johnny Durão', 'Vice-campeão', 2],
        ['Gustavo Aires', '3º lugar', 3] ] },
      { title: 'Ranking 2º semestre', rows: [
        ['Gregory Neulan Lunz', 'Campeão', 1],
        ['Gustavo Aires', 'Vice-campeão', 2],
        ['Eduardo Diazzi', '3º lugar', 3] ] }
    ] },

  { type: 'champs', group: 'Duplas', sport: 'Futevôlei', photo: F('futevolei'),
    people: [
      { name: 'Ander Correia', detail: 'Categoria Ouro', place: 1 },
      { name: 'Reinaldo Stocki\nDanniel Braga', detail: 'Categoria Prata', place: 1 },
      { name: 'Bruna Dias Costa\nCleverton Skrypietz', detail: 'Dupla Mista', place: 1 } ] },

  { type: 'champs', group: 'Duplas', sport: 'Vôlei de Areia', photo: F('areia'),
    people: [{ name: 'Lucas Santos\nAlexandro Vargas', detail: 'Dupla campeã', place: 1 }] },

  { type: 'champs', group: 'Duplas', sport: 'Truco', photo: F('truco'),
    people: [
      { name: 'Altevir e Rogério', detail: 'Dupla campeã', place: 1 },
      { name: 'Alex', detail: 'Vice-campeão', place: 2 },
      { name: 'Dilton e Donizete', detail: '3º lugar', place: 3 } ] },

  { type: 'champs', group: 'Individuais', sport: 'Xadrez', photo: F('xadrez'),
    people: [
      { name: 'Eduardo Seiti', detail: 'Campeão', place: 1 },
      { name: 'Juliano dos Santos Rocha', detail: 'Vice-campeão', place: 2 },
      { name: 'João Vitor Cararo Cano', detail: '3º lugar', place: 3 } ] },

  { type: 'divider',
    title: 'Modalidades',
    sub: 'Coletivas',
    list: ['Basquete 3x3', 'Futsal Feminino', 'Futsal Masculino', 'Fut-7', 'Vôlei Feminino', 'Vôlei Masculino'],
    img: 'img/abertura-coletivas.jpg' },

  { type: 'team', sport: 'Basquete 3x3', team: 'Coroinhas', img: F('basquete'),
    members: ['Luiz Henrique Gomes de Brito', 'Luiz Henrique Moreira Fonseca', 'Jefferson Oliveira',
      'Manoela Arantes', 'Rosana Gagliassi', 'Ana Paula Paludo'] },
  { type: 'team', sport: 'Futsal Feminino', team: 'Campeãs', img: F('futfem'),
    members: ['Aline Dutra', 'Jaqueline Moreira', 'Nathali Veiga', 'Sara Veiga', 'Taiana Santos'] },
  { type: 'team', sport: 'Futsal Masculino', team: 'Powertrain', img: F('futmasc') },
  { type: 'team', sport: 'Fut-7', team: 'Alemanha', img: F('copa') },
  { type: 'team', sport: 'Vôlei Feminino', team: 'Haiti', img: F('volei') },
  { type: 'team', sport: 'Vôlei Masculino', team: 'Brasil', img: F('volmasc'),
    members: ['Alexsandro Vargas', 'Lucas Afonso', 'Bruno Bastos', 'Eber', 'Jadson', 'Johanson',
      'Kauan', 'Luizão', 'Mateus', 'Muryllo', 'Pedro'] },

  { type: 'final',
    title: 'Parabéns',
    sub: 'a todos os campeões!',
    img: 'img/parabens.jpg' }
];
