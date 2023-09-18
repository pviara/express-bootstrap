# README
Ce repository a été conçu comme la base de ce que sera votre projet Express.js une fois le cours terminé. Prenez soin de lire chaque étape et ne manquez pas de feuilleter les pages de documentation qui vous sont partagées.

## Environnement de développement
1. Télécharger puis installer **Node.js** (LTS, i.e. Long-Term Support)
2. Installer le package **TypeScript** globalement à l'aide de **npm** :
```
npm install -g typescript
```

**Ressources** :
- [Page de téléchargement de Node.js](https://nodejs.org/en/download)
- [C'est quoi installer un package "globalement" ?](https://docs.npmjs.com/downloading-and-installing-packages-globally)

---

## Setup du projet
### Initialisation
1. Créer un dossier VIDE en local sur votre machine, ne procédez pas aux étapes suivantes dans le repo que vous venez de cloner
2. Initialiser le **projet** à la racine (donc dans le dossier que vous venez de créer) avec **npm** :
```bash
npm init -y # Génère un fichier package.json
```

3. Initialiser **TypeScript** au sein du projet :
```bash
tsc --init # Génère un fichier tsconfig.json
```

**Ressources** :
- [Comment créer un repo sur GitHub ?](https://docs.github.com/fr/repositories/creating-and-managing-repositories/creating-a-new-repository)
- [Qu'est-ce qu'un package.json ?](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [Qu'est-ce qu'un tsconfig.json ?](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

### Dépendances
Pour utiliser Express.js mais aussi pour formatter notre code ou même le tester, il nous faut des packages externes. Certains de ces packages ne sont utiles que dans le cadre du développement, tandis que d'autres sont utiles même en production :
- on appelle _dependencies_ les dépendances essentielles au fonctionnement du projet en production
- on appelle _dev dependencies_ les dépendances nécessaires uniquement au développement du projet

Ce projet dépend initialement de deux _dependencies_ :
- `dotenv` sert à charger des variables d'environnement à partir d'un fichier
- `express` sert à créer des applications web de manière simple et rapide

Côté développement, nous allons avoir besoin de plusieurs _dev dependencies_ :
- `ts-node-dev` sert à compiler les fichiers TypeScript à la volée et en continu
- `jest` est un framework de test qui permet d'écrire et d'exécuter des tests en JavaScript
- `ts-jest` sert à tester des fichiers TypeScript via l'utilisation de `jest`
- `prettier` (optionnel) sert à appliquer des règles de formatage cohérentes à votre code

Sans oublier tous les packages préfixés par `@types` : `@types/express`, `@types/node` et `@types/jest`. Ces packages spéciaux fournissent des informations de typage pour des packages JavaScript qui ne sont pas écrits en TypeScript nativement.

Pour installer tous ces packages, utilisez les commandes suivantes :
```bash
npm install dotenv express
npm install -D ts-node-dev jest ts-jest prettier @types/express @types/jest @types/node
```

**Ressources :**
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [jest](https://www.npmjs.com/package/jest)
- [ts-jest](https://www.npmjs.com/package/ts-jest)
- [prettier](https://www.npmjs.com/package/prettier)
- [@types/express](https://www.npmjs.com/package/@types/express)
- [@types/node](https://www.npmjs.com/package/@types/node)
- [@types/jest](https://www.npmjs.com/package/@types/jest)

### Configuration
Toujours un peu pénible de tout configurer mais en fin de compte c'est très rapide, don't worry.

#### TypeScript
Ouvrez votre `tsconfig.json` puis décommentez la ligne `outDir` pour la modifier :
```json
"compilerOptions": {
    "outDir": "./dist",
}
```

#### ts-node-dev
Ouvrez votre `package.json` et ajoutez une ligne à l'objet `scripts` :
```json
"scripts": {
    "dev": "npx ts-node-dev src/app.ts",
}
```

#### Jest
1. Ouvrez votre `package.json` et remplacez la ligne `test` de l'objet `scripts` :
```json
"scripts": {
    "test": "jest --passWithNoTests",
}
```

2. Créez un fichier `jest.config.js` à la racine de votre projet :
```js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/dist/'],
    verbose: true,
};
```

#### Prettier (optionnel)
1. Créez un fichier `.prettierrc` à la racine de votre projet avec la configuration suivante :
```json
{
    "singleQuote": true,
    "tabWidth": 4,
    "trailingComma": "all"
}
```

2. Ouvrez votre `package.json` et ajoutez une ligne à l'objet `scripts` :
```json
"scripts": {
    "format": "prettier --write \"src/**/*.ts\"",
}
```

## Notre application
Il est temps de concrétiser tout ce bazar et d'écrire nos premières lignes de code.
1. Créez un dossier `src` à la racine de votre projet et ajoutez-y un fichier `app.ts` :
```ts
import express from 'express';

const app = express();
const port = 3000;

app.listen(port, () => console.log(`> Listening on port ${port}`));
```

2. Dans votre terminal utilisez la commande suivante :
```bash
npm run dev # Exécute le script 'dev' de l'objet 'scripts'
```

3. Vous devriez avoir un output à peu près ressemblant à celui-ci :
```txt
[INFO] 16:52:33 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 5.1.6)
> Listening on port 3000
```

**Félicitations !** 🥳🎉 Vous avez créé votre application back-end !
