
db = connect("localhost:27017/vgdc");

db.createCollection("people");


db.getCollection('people').insertMany([
  {
    pseudo: 'DJ',
    mail: 'DJ@gmail.com',
    password: '$2b$12$L3/TbULvAKkXGUOR1KzMb.p10b37b2D7QOiRSVs3VAVsA180Y7VB.', //Test123Test
    role: 'Admin',
  },
  {
    pseudo: 'LS',
    mail: 'LS@gmail.com',
    password: '$2b$12$pjglyOjJ5wrS0vYtazziKugdUwHw3w6py44aJblxgCoKUt9mH7KbW', //123TestTest
    role: 'User',
  },
  {
    pseudo: 'LD',
    mail: 'LD@gmail.com',
    password: '$2b$12$wH3JFbbG3o5HATAnnBvT0eCojG.Uqx4YAx9she62Zj6lNTn/BWbQO', //T123estTest
    role: 'User',
  },
]);

db.getCollection('people').find({});

db.createCollection("games");

db.getCollection('games').insertMany([
  {
    title: 'Final Fantasy XIV: EndWalker',
    synopsis:
      "Final Fantasy XIV : Endwalker est la quatrième extension du jeu éponyme. Il s'agit d'un MMORPG (jeu de rôle massivement multijoueur) ancré dans l'univers des Final Fantasy. Dans Endwalker, il est possible de voyager à travers l'île de Thavnair, Garlemald et même la Lune. Deux nouvelles classes font leur apparition : le sage (soigneur) et le faucheur (DPS de mêlée). La race des hommes Viéras est également disponible.",
    note: 16,
    image:
      'https://image.jeuxvideo.com/medias/161277/1612766574-6606-jaquette-avant.png',
    test: "Après cette première prise en main, Endwalker s'annonce comme une nouvelle extension de grande qualité pour Final Fantasy XIV. Entre ses nouveaux environnements au charme unique, sa vaste capitale ou encore tous ses petits ajustements faits pour faciliter l'expérience de jeu, le résultat final promet de satisfaire la communauté très active du jeu. Et si le Faucheur et le Sage ont toutes les clés en main pour être des jobs techniques mais grisants une fois maîtrisés, toutes les modifications apportées au Moine et à l'Invocateur sauront ravir les joueurs de ces classes. Reste désormais à savoir comme cette extension parviendra à conclure l'arc scénaristique entamé depuis les débuts du jeu pour offrir une première conclusion épique à Final Fantasy XIV et préparer sa prochaine grande histoire. Réponse le 23 novembre prochain sur PC, PS4, PS5 et Mac.",
    platform: 'PC',
  },
  {
    title: 'Pokémon Diamant Étincelant / Perle Scintillante',
    synopsis:
      'Pokémon Diamant Étincelant / Perle Scintillante est un remake de Pokémon Version Diamant / Perle sorti sur Nintendo DS. Avec un nouveau style graphique plutôt enfantin, les joueurs peuvent découvrir ou redécouvrir la région de Sinnoh et retrouver les Pokémons de la quatrième génération.',
    note: 15,
    image:
      'https://image.jeuxvideo.com/medias/163396/1633959248-729-jaquette-avant.gif',
    test: "Après cette première prise en main, Endwalker s'annonce comme une nouvelle extension de grande qualité pour Final Fantasy XIV. Entre ses nouveaux environnements au charme unique, sa vaste capitale ou encore tous ses petits ajustements faits pour faciliter l'expérience de jeu, le résultat final promet de satisfaire la communauté très active du jeu. Et si le Faucheur et le Sage ont toutes les clés en main pour être des jobs techniques mais grisants une fois maîtrisés, toutes les modifications apportées au Moine et à l'Invocateur sauront ravir les joueurs de ces classes. Reste désormais à savoir comme cette extension parviendra à conclure l'arc scénaristique entamé depuis les débuts du jeu pour offrir une première conclusion épique à Final Fantasy XIV et préparer sa prochaine grande histoire. Réponse le 23 novembre prochain sur PC, PS4, PS5 et Mac.",
    platform: 'Switch',
  },
  {
    title: 'Ruined King : A League of Legends Story',
    synopsis:
      "Ruined King est un jeu développé par Airship Syndicate (Darksiders Genesis, Battle Chasers) et édité par Riot Forge. RPG solo doté d'un système de combat au tour par tour, le titre prend place dans deux régions du monde de Runeterra : Bilgewater et les Îles Obscures. Six champions sont réunis pour affronter un ennemi commun : Miss Fortune, Illaoi, Braum, Yasuo, Ahri et Pyke.",
    note: 16,
    image:
      'https://image.jeuxvideo.com/medias/163708/1637080607-7753-jaquette-avant.gif',
    test: 'Ruined King : A League of Legends Story ne réinvente pas la roue, c’est certain. Cependant, ses systèmes de jeu solides en font un RPG tout à fait recommandable, surtout pour les fans de LoL. Ces derniers pourront apprécier la réinterprétation de leur univers favori par Airship Syndicate et Joe Madureira. Et si l’on regrette une écriture un peu convenue qui manque parfois de subtilité, on apprécie de pouvoir s’immerger dans les ruelles de Bilgewater et les Îles Obscures en compagnie de champions charismatiques.',
    platform: 'PC',
  },
]);

db.getCollection('games').find({});

db.createCollection("discussions");

db.getCollection('discussions').insertMany([
  {
    "_id" : ObjectId("61a887877d356e795664e1ee"),
    "responses" : 1,
    "author" : "aa",
    "creationDate" : "02/12/2021",
    "title" : "Ma première disucssion"
  },
  {
    "_id" : ObjectId("61a887a97d356e795664e1fa"),
    "responses" : 1,
    "author" : "aa",
    "creationDate" : "02/12/2021",
    "title" : "Ma deuxième discussion"
  }
]);

db.getCollection('discussions').find({});

db.createCollection("posts");

db.getCollection('posts').insertMany([
  {
    "_id" : ObjectId("61a887947d356e795664e1f3"),
    "creationDate" : "02/12/2021",
    "text" : "Bonjour à tous !",
    "author" : "aa",
    "idDiscussion" : "61a887877d356e795664e1ee"
  },
  {
    "_id" : ObjectId("61a887b57d356e795664e200"),
    "creationDate" : "02/12/2021",
    "text" : "Et coucou tout le monde !",
    "author" : "aa",
    "idDiscussion" : "61a887a97d356e795664e1fa"
  }
]);

db.getCollection('posts').find({});

db.createCollection("actualites");

db.getCollection('actualites').insertMany([
  {
    "_id" : ObjectId("61a886f97d356e795664e1e5"),
    "author" : "aa",
    "creationDate" : "02/12/2021",
    "text" : "Après un Forza Horizon 4 nous emmenant du côté de la Grandre-Bretagne, c'est au Mexique que Microsoft nous embarque. Forza Horizon 5 nous propose donc des paysages très variés, allant du désert à la jungle, en passant un volcan, des aires urbaines, des plaines, des marais, une façade maritime ou encore la montagne. Porté par la liberté qu'il offre aux joueurs et les très nombreux bolides disponibles, le titre s'est fait une très jolie place sur les consoles et les PC, devenant temporairement le meilleur lancement d'un jeu Xbox avant que le multijoueur de Halo Infinite Multiplayer ne vienne lui piquer la place.  Cependant, les fonctionnalités en ligne du titre semblent connaître de nombreuses difficultés, et un certain nombre de joueurs commence à s'impatienter malgré la publication d'un patch au milieu du mois de novembre. C'est notamment le cas de Don Joewon Song, un créateur de contenu britannique très connu au sein de la communauté Forza, qui a profité de son aura pour pousser un coup de gueule au sujet du multijoueur.",
    "title" : "Forza Horizon 5 : Un membre important de la communauté exprime sa colère !"
  },
  {
    "_id" : ObjectId("61a887297d356e795664e1e9"),
    "author" : "aa",
    "creationDate" : "02/12/2021",
    "text" : "Teamfight Tactics est un auto-battler. Grossièrement, il s'agit d'un jeu d'échecs automatique dans lequel les joueurs placent sur le plateau un certain nombre de personnages, aux capacités variées, durant une phase préparatoire. Ensuite, ces mêmes personnages s'affrontent, généralement sans l'intervention directe des joueurs, ouvrant la voie à une perte de points de vie et à d'autres mécaniques. Tous les détails sur le fonctionnement du jeu sont à retrouver dans notre test.  ARCANE X TEAMFIGHT TACTICS, C'EST POUR BIENTÔT ! Ce titre, par ailleurs très populaire, intégrera bientôt un personnage de la série Arcane, disponible sur Netflix. Saluée dans le monde entier, la série est un immense carton, propulsant Riot et le studio d'animation Fortiche vers de nouveaux sommets. D'ailleurs, une seconde saison a été officialisée, mais il ne faut pas l'attendre avant 2023 au minimum. Mais revenons-en au personnage annoncé. Il s'agit de Silco, un être jugé impitoyable et égocentrique qui pense que le seul moyen de libérer la ville de Zaun du joug de la ville Piltover est un conflit durant lequel le sang doit être versé.",
    "title" : "Teamfight Tactics : Un personnage de la série Arcane (LoL) va débarquer dans l'auto-battler !"
  }
]);

db.getCollection('actualites').find({});

db.getCollection('people').createIndex(
    {pseudo: 1},
    {unique: true}
);

db.getCollection('people').createIndex(
    {mail: 1},
    {unique: true}
);

db.getCollection('games').createIndex(
    {title: 1},
    {unique: true}
);

db.getCollection('discussions').createIndex(
    {_id: 1},
    {unique: true}
);

db.getCollection('posts').createIndex(
    {_id: 1},
    {unique: true}
);

db.getCollection('actualites').createIndex(
    {title: 1},
    {unique: true}
);
