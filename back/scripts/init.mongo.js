
db.getCollection('people').insertMany([
    {
        pseudo: 'DJ',
        mail: "DJ@gmail.com",
        password: "Test123",
        role: "Admin"
    },
    {
        pseudo: 'LS',
        mail: "LS@gmail.com",
        password: "123Test",
        role: "User"
    },
    {
        pseudo: 'LD',
        mail: "LD@gmail.com",
        password: "T123est",
        role: "User"
    },
]);

db.getCollection('people').find({});


db.getCollection('games').insertMany([
    {
        title: 'Final Fantasy XIV: EndWalker',
        synopsis: "Final Fantasy XIV : Endwalker est la quatrième extension du jeu éponyme. Il s'agit d'un MMORPG (jeu de rôle massivement multijoueur) ancré dans l'univers des Final Fantasy. Dans Endwalker, il est possible de voyager à travers l'île de Thavnair, Garlemald et même la Lune. Deux nouvelles classes font leur apparition : le sage (soigneur) et le faucheur (DPS de mêlée). La race des hommes Viéras est également disponible.",
        note: 16,
        image: "https://image.jeuxvideo.com/medias/161277/1612766574-6606-jaquette-avant.png",
        test: "Après cette première prise en main, Endwalker s'annonce comme une nouvelle extension de grande qualité pour Final Fantasy XIV. Entre ses nouveaux environnements au charme unique, sa vaste capitale ou encore tous ses petits ajustements faits pour faciliter l'expérience de jeu, le résultat final promet de satisfaire la communauté très active du jeu. Et si le Faucheur et le Sage ont toutes les clés en main pour être des jobs techniques mais grisants une fois maîtrisés, toutes les modifications apportées au Moine et à l'Invocateur sauront ravir les joueurs de ces classes. Reste désormais à savoir comme cette extension parviendra à conclure l'arc scénaristique entamé depuis les débuts du jeu pour offrir une première conclusion épique à Final Fantasy XIV et préparer sa prochaine grande histoire. Réponse le 23 novembre prochain sur PC, PS4, PS5 et Mac.",
        platform: "PC"
    },
    {
        title: 'Pokémon Diamant Étincelant / Perle Scintillante',
        synopsis: "Pokémon Diamant Étincelant / Perle Scintillante est un remake de Pokémon Version Diamant / Perle sorti sur Nintendo DS. Avec un nouveau style graphique plutôt enfantin, les joueurs peuvent découvrir ou redécouvrir la région de Sinnoh et retrouver les Pokémons de la quatrième génération.",
        note: 15,
        image: "https://image.jeuxvideo.com/medias/163396/1633959248-729-jaquette-avant.gif",
        test: "Après cette première prise en main, Endwalker s'annonce comme une nouvelle extension de grande qualité pour Final Fantasy XIV. Entre ses nouveaux environnements au charme unique, sa vaste capitale ou encore tous ses petits ajustements faits pour faciliter l'expérience de jeu, le résultat final promet de satisfaire la communauté très active du jeu. Et si le Faucheur et le Sage ont toutes les clés en main pour être des jobs techniques mais grisants une fois maîtrisés, toutes les modifications apportées au Moine et à l'Invocateur sauront ravir les joueurs de ces classes. Reste désormais à savoir comme cette extension parviendra à conclure l'arc scénaristique entamé depuis les débuts du jeu pour offrir une première conclusion épique à Final Fantasy XIV et préparer sa prochaine grande histoire. Réponse le 23 novembre prochain sur PC, PS4, PS5 et Mac.",
        platform: "Switch"
    },
    {
        title: 'Ruined King : A League of Legends Story',
        synopsis: "Ruined King est un jeu développé par Airship Syndicate (Darksiders Genesis, Battle Chasers) et édité par Riot Forge. RPG solo doté d'un système de combat au tour par tour, le titre prend place dans deux régions du monde de Runeterra : Bilgewater et les Îles Obscures. Six champions sont réunis pour affronter un ennemi commun : Miss Fortune, Illaoi, Braum, Yasuo, Ahri et Pyke.",
        note: 16,
        image: "https://image.jeuxvideo.com/medias/163708/1637080607-7753-jaquette-avant.gif",
        test: "Ruined King : A League of Legends Story ne réinvente pas la roue, c’est certain. Cependant, ses systèmes de jeu solides en font un RPG tout à fait recommandable, surtout pour les fans de LoL. Ces derniers pourront apprécier la réinterprétation de leur univers favori par Airship Syndicate et Joe Madureira. Et si l’on regrette une écriture un peu convenue qui manque parfois de subtilité, on apprécie de pouvoir s’immerger dans les ruelles de Bilgewater et les Îles Obscures en compagnie de champions charismatiques.",
        platform: "PC"
    },
]);

db.getCollection('games').find({});