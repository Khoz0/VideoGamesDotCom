# VideoGamesDotCom

## Présentation :

VideoGamesDotCom est un projet de site de discussions et de partage au sujet des jeux vidéos. Ce projet a été développé pour le cours "Nouvelles technologies du web" par :
  - Jordan SCHERRING
  - Corentin ROBERGE-MENTEC
 
## Frameworks & outils :

Ce projet a été développé en utilisant différents frameworks. Pour le front end, nous avons utilisé le framework Angular. En ce qui concerne le back end, nous avons utilisés le
framework NestJS. Et pour la base de données, nous avons utilisés MongoDB et Robo3t.

## Clone du projet

`git clone git@github.com:Khoz0/VideoGamesDotCom.git`

## Front end

### Les fonctionnalités

Le site VideoGamesDotCom contient plusieurs fonctionnalités.

En tant qu'utilisateur lambda on a accès à ces fonctionnalités :
  - S'inscrire.
  - Se connecter/déconnecter.
  - Modifier son compte.
  - Consulter la page d'accueil.
  - Consulter la page des forums.
  - Créer une discussion si l'utilisateur est connecté.
  - Consulter les différentes discussions.
  - Poster une réponse si l'utilisateur est connecté.
  - Consulter les différentes actualités.
  - Consulter la page des jeux.
  - Consulter les détails relatifs à chaque jeux.
  - Accéder aux différents détails des jeux via la barre de recherche.

En tant qu'administrateur du site, on a accès à ces fonctionnalités :
  - Tout ce qui a été listé ci-dessus.
  - Créer ou supprimer des actualités.
  - Supprimer des posts.
  - Supprimer des discussions.
  - Modifier ou ajouter des jeux.
  - Accéder à l'interface administrateur, permettant de supprimer des comptes.

### Déploiement du front end

```
# Pour se rendre dans le front
cd VideoGamesDotCom/front

# Installation des dépendances avec npm:
npm install

# Installation des dépendances avec yarn:
yarn install

# Execution du serveur front end sur http://localhost:4200
ng serve
```

## Back end

### Déploiement du back end

Il faut tout d'abord créer et initialiser la base de données comme suit :

Tout d'abord il faut créer le container de la base de données MongoDB via docker :

```
$ docker-compose up
$ docker-compose start
```

Puis suivre ces étapes :
  
```
# Avec Robo3t, il faut se connecter à MongoDB grâce au port 27017.
# Créer la base de données nommée vgdc.
# Copier le contenu du script présent dans VideoGamesDotCom/back/scripts/init.mongo.js et le copier dans la console de Robo3t.
# Éxecuter les requêtes.

# Se rendre dans le back
cd VideoGamesDotCom/back

# Installer les dépendances avec npm:
npm install

# Installer les dépendances avec yarn:
yarn install

# Execution du serveur back end sur http://localhost:3000 avec npm:
npm start
# Ajouter :dev après start pour activer le watch mode

# Execution du serveur back end sur http://localhost:3000 avec yarn:
yarn start
# Ajouter :dev après start pour activer le watch mode
