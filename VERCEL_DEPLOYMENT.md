# Student Management System Vercel Deployment Configuration

Ce document explique comment déployer l'application Student Management System sur Vercel.

## Configuration du déploiement

Le fichier `vercel.json` contient la configuration Vercel optimisée pour cette application :

### Points clés

1. **Version Vercel 2** : Utilise le format v2 le plus récent
2. **Variables d'environnement** : Configurables via Vercel dashboard
3. **Serverless Functions** : Support complet des API routes
4. **Response Streaming** : Activé pour les réponses optimisées

### Routes configurées

- `/api/auth/*` : Gestion de l'authentification NextAuth
- `/api/students/*` : Endpoints pour les étudiants
- `/api/courses/*` : Endpoints pour les cours
- `/api/*` : Autres endpoints API

### FDuration des fonctions

Les fonctions API ont un timeout de 30 secondes (limite gratuite Vercel)

## Étapes de déploiement

### 1. Préparation local

```bash
# Vérifier que le build fonctionne
npm run build

# Vérifier qu'il n'y a pas d'erreurs
npm run lint
```

### 2. Push sur GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push -u origin main
```

### 3. Configuration Vercel

1. Accédez à https://vercel.com
2. Cliquez sur "New Project"
3. Sélectionnez "Import Git Repository"
4. Selectionnez votre repository `student-management`
5. Cliquez sur "Import"

### 4. Variables d'environnement

Dans les paramètres du projet Vercel, ajouter sous "Environment Variables" :

```
NEXTAUTH_SECRET=<valeur-aléatoire-forte>
NEXTAUTH_URL=https://<projet>.vercel.app
```

### 5. Paramètres de build

Les paramètres par défaut devraient convenir :
- Build Command : `next build`
- Output Directory : `.next`
- Install Command : `npm ci`

### 6. Déployer

Cliquez sur "Deploy" et attendez que la compilation soit terminée.

## Après le déploiement

### Initialiser la base de données

1. Allez sur votre URL Vercel
2. Accédez à `/api/init`
3. Cela créera la base de données avec des données d'exemple

### Problèmes potentiels

#### Erreur : "Cannot find module 'better-sqlite3'"

**Cause** : SQLite nécessite une compilation native
**Solution** : Surcharger `better-sqlite3` en environnement de production

#### Authentification ne fonctionne pas

**Cause** : `NEXTAUTH_SECRET` ou `NEXTAUTH_URL` non configurés
**Solution** : Vérifier les variables d'environnement dans Vercel dashboard

#### Base de données vide après redéploiement

**Cause** : Vercel utilise des ephemeral volumes
**Solution** : Utiliser une base de données externe (PostgreSQL) en production

## Migration vers PostgreSQL

Pour la production, remplacer SQLite par PostgreSQL :

1. Installer un service PostgreSQL (Neon, Render, etc.)
2. Modifier `lib/db.ts` pour utiliser pg au lieu de better-sqlite3
3. Configurer `DATABASE_URL` dans les variables Vercel

## Monitoring et logs

Dans Vercel dashboard :
- **Deployments** : Voir l'historique des déploiements
- **Logs** : Voir les logs en temps réel
- **Analytics** : Performances et statistiques
- **Error Tracking** : Erreurs et exceptions

## Domaine personnalisé

Pour utiliser un domaine personnalisé :

1. Allez dans "Settings" du projet
2. Cliquez sur "Domains"
3. Ajouter votre domaine
4. Configurer les DNS records selon les instructions Vercel

## Optimisations supplémentaires

### 1. Image Optimization

Next.js optimise automatiquement les images. Utiliser `<Image>` plutôt que `<img>`

### 2. Caching

Ajouter des headers de cache dans `next.config.ts` :

```typescript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'no-store' }
      ]
    }
  ]
}
```

### 3. Compression

Next.js compresse automatiquement les assets

## Rollback

En cas de problème après un déploiement :

1. Allez dans "Settings" > "Deployments"
2. Cliquez sur un déploiement antérieur
3. Cliquez "Rollback"

## Support et ressources

- Docs Vercel Next.js : https://vercel.com/docs/frameworks/nextjs
- Docs NextAuth : https://next-auth.js.org/
- Vercel Support : https://vercel.com/support

---

**Créé par** : Hamza Tahrijouti
**Email** : h.tahrijouti@esisa.ac.ma
