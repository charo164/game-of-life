# Jeu de la Vie Challenge

<p>
  <img src="./assets/image/gospers_glider_gun.gif" alt="Gospers Glider Gun" width="420" height="250">
</p>

## Table des Matières

1. [Introduction](#introduction)
2. [Règles du Jeu de la Vie](#règles-du-jeu-de-la-vie)
2. [Comment lancer le jeu](#comment-lancer-le-jeu)
3. [Comment jouer](#comment-jouer)
4. [Technologies](#technologies)
5. [Contribution](#contribution)

## Introduction

Voice mon implementation du Jeu de la Vie pour le Challenge de [Elias W. BA](https://twitter.com/eliaswalyba). Le jeu de la vie c'est quoi ? 🤔, en gros c'est un automate cellulaire inventé par le mathématicien John Conway. Il se déroule sur une grille bidimensionnelle où chaque cellule peut être soit vivante, soit morte. L'évolution du jeu est déterminée par des règles simples appliquées à chaque génération.

## Règles du Jeu de la Vie

Les règles du Jeu de la Vie sont les suivantes :

1. Une cellule morte avec exactement trois voisins vivants devient vivante à la génération suivante.
2. Une cellule vivante avec deux ou trois voisins vivants reste vivante à la génération suivante.
3. Toute autre cellule vivante meurt à la génération suivante (solitude ou surpopulation).
4. Les cellules mortes restent mortes, sauf si elles ont exactement trois voisins vivants.

## Comment lancer le jeu

Pour lancer le jeu, il suffit de lancer les commande suivante (il faut avoir [git](https://git-scm.com/) d'installer) :

```bash
# Cloner le projet 
$ git clone https://github.com/charo164/game-of-life.git

# Se déplacer dans le dossier du projet
$ cd game-of-life
```

puis lancer le fichier `index.html` dans votre navigateur.


## Comment jouer

Pour jouer, il suffit de cliquer sur les cellules pour les faire vivre ou mourir (Maintener le click et dessiner pour aller plus vite). Vous pouvez aussi utiliser le boutons `Start` pour lancer ou arrêter le jeu. Le bouton `Clear` permet de vider la grille. Le bouton `Random` permet de générer une grille aléatoire. Le bouton `Next` permet de passer à la génération suivante. Le bouton `Speed` permet de changer la vitesse du jeu.

<p>
  <img src="./assets/image/game-of-life.gif" alt="Demo" width="420" height="250">
</p>

## Technologies

Les technologies utilisées pour ce projet sont les suivantes :

- HTML
- CSS
- JavaScript

## Contribution

Pour contribuer à ce projet, veuillez suivre les étapes suivantes :

1. Forker le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commiter vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pusher votre branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request
