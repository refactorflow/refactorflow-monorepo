# Turborepo starter

Ce projet est basé sur un starter Turborepo officiel.

## Installation et configuration

1. Installez les dépendances :

```sh
pnpm i
```

2. Configurez le backend :

```sh
cd apps/backend
npx prisma generate
```

3. Configurez les variables d'environnement :

- Créez un fichier `.env` dans le dossier `apps/backend`
- Ajoutez les variables d'environnement nécessaires

4. Lancez le projet en développement :

```sh
pnpm run dev
```
