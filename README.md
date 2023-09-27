# Projet Ownily

## Installation Poste Dévelopeur

- Installation de la dernière version 9.8.1 de npm
  - Installer **NVM** au besoin
  - Dans le terminal exécuter `nvm use` depuis la racine pour installer la version de node nécessaire
- Installation de **Yarn** sous [ubuntu](https://phoenixnap.com/kb/how-to-install-yarn-ubuntu) (via npm)
- Installation des extensions recommandés dans VSC (si VSC utilisé)
  - Afficher les extensions recommandées
  - Soit par la commande rapide `CTRL + P` ou `CMD + P` and `> Extensions: Show recommended extensions`
  - Soit par le menu des extensions puis dans la barre de recherche `@recommended`
  - Installer une partie ou toutes les extensions

### Récupérer la bonne version de Node

Depuis la racine simplement exécuter

```bash
nvm use
```

Afin d'appliquer la version attendue pour faire tourner l'application

### Installation du back et du front

```bash
yarn install
yarn build:dev
yarn back:start:docker:dev
yarn back:start:dev
```

Ou dans le menu de debuggage vscode lancer `Run back`

Vérifier l'accès à mongo-express: http://localhost:8081.  
L'accès à l'application: http://localhost:8080.

Démarrer front en mode développement:

```
yarn front:start:dev
```

Ou dans le menu de debuggage vscode lancer `Run front`

L'accès à l'application: http://localhost:8082. Ou dans le menu de debuggage vscode lancer `Launch front`

### Build et execution en local du DOCKER Pour debug

- Démarrer avec docker-compose tous les services (docker, mongo...) : `docker-compose up -d --build`
- Tester votre image `http://localhost:8080`

# Exercice Gestion locative

## Contexte :

Tu travailles sur une application de comptabilité destinée aux SCI (Sociétés Civiles Immobilières). L'objectif est d'ajouter une nouvelle fonctionnalité de gestion locative pour permettre aux utilisateurs de gérer les locataires et les paiements.

## Fonctionnalités requises :

1. Enregistrement d'un locataire :
   - Les utilisateurs doivent pouvoir enregistrer les informations relatives à un nouveau locataire, telles que le nom, l'adresse, les coordonnées, etc.
   - Les données du locataire doivent être stockées dans une base de données.
2. Appel de loyer :
   - Les utilisateurs doivent pouvoir générer un appel de loyer pour un locataire donné.
   - La demande de paiement doit inclure les informations sur le montant dû, la période de paiement et toute autre information pertinente.
   - Une fois la demande de paiement générée, elle doit être stocké et envoyé au locataire et au loueur en début de la période de paiement en fonction de ça récurrence (mois, trimestre, semestre, annuel).
3. Suivi de vie :
   - Liste des évènements à enregistrer dans elasticsearch de l’ensemble de la fonctionnalité. (Les évènements moleculer sont automatiquement enregistrer dans elasticsearch)

## Contraintes techniques :

- L'application est développée en utilisant le framework Vue.js pour le frontend.
- Les données des locataire et des demandes de paiement sont stockées dans une base de données MongoDB.
- L'envoi d'e-mails est géré en utilisant un service intégré en mixin dans Moleculer

## Objectifs :

L'objectif de cet exercice est de concevoir une fonctionnalité de gestion locative, en se concentrant sur l'enregistrement des locataires et la demande de paiement. Le candidat devra intégré la solution dans l’application de test (fournit) tout en répondant aux exigences spécifiées.
