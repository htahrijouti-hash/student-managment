# 📋 Fichiers du projet - Référence complète

## 📁 Structure des répertoires

### `app/` - Application Next.js

#### `app/api/` - Routes API (Backend)
- **`auth/[...nextauth]/route.ts`** - Handlers d'authentification NextAuth
  - Gère signin, signout, sessions
  
- **`students/route.ts`** - CRUD des étudiants (liste et création)
  - GET : Récupère tous les étudiants
  - POST : Créer un nouvel étudiant
  
- **`students/[id]/route.ts`** - Détails d'un étudiant
  - GET : Récupère les détails d'un étudiant
  - PUT : Modifie les informations d'un étudiant
  - DELETE : Supprime un étudiant
  
- **`students/[id]/enrollments/route.ts`** - Inscriptions aux cours
  - GET : Listing des cours d'un étudiant
  - POST : Inscrire l'étudiant à un cours
  
- **`courses/route.ts`** - CRUD des cours
  - GET : Récupère tous les cours
  - POST : Créer un nouveau cours
  
- **`init/route.ts`** - Initialisation de la base de données
  - POST : Crée les données d'exemple

#### `app/` - Pages Frontend
- **`page.tsx`** - Page d'accueil
  - Redirection automatique vers dashboard ou login

- **`layout.tsx`** - Layout principal
  - Fournit SessionProvider pour NextAuth
  - Styles globaux et configuration

- **`globals.css`** - Styles CSS globaux
  - Tailwind CSS + styles personnalisés

#### `app/login/` - Authentification
- **`page.tsx`** - Page de connexion
  - Formulaire email/password
  - Validation d'erreurs
  - Redirection post-connexion

#### `app/dashboard/` - Tableau de bord
- **`page.tsx`** - Tableau de bord principal
  - Statistiques (total, actifs, inactifs)
  - Tableau des derniers étudiants
  - Liens de navigation

#### `app/students/` - Gestion des étudiants
- **`page.tsx`** - Liste et ajout d'étudiants
  - Table complète des étudiants
  - Formulaire d'ajout
  - Actions (View, Delete)

- **`[id]/page.tsx`** - Détails et édition d'un étudiant
  - Vue d'ensemble du profil
  - Édition des informations
  - Tableau des inscriptions aux cours
  - Formulaire d'inscription

#### `app/courses/` - Gestion des cours
- **`page.tsx`** - Liste et création de cours
  - Grille des cours
  - Formulaire de création
  - Détails des cours

### `lib/` - Libraires utilitaires

- **`db.ts`** - Configuration SQLite
  - Connexion à la base de données
  - Création automatique des tables
  - Gestion du cycle de vie de la DB

### 🔐 Authentification et Middleware

- **`auth.ts`** - Configuration NextAuth
  - Provider Credentials
  - Stratégie de validation
  - Callbacks JWT et sessions
  - Configuration des pages

- **`middleware.ts`** - Middleware de protection
  - Protection des routes privées
  - Redirection automatique
  - Gestion de l'authentification

### 📦 Configuration

- **`package.json`** - Dépendances et scripts
  - Scripts : dev, build, start, lint
  - Dépendances : next, react, next-auth, etc.

- **`tsconfig.json`** - Configuration TypeScript
  - Checks stricts activés
  - Path aliases configurés

- **`next.config.ts`** - Configuration Next.js
  - Configuration du compilateur

- **`postcss.config.mjs`** - Configuration PostCSS
  - Plugin Tailwind CSS

- **`eslint.config.mjs`** - Configuration ESLint
  - Règles de qualité du code

### 🌐 Déploiement

- **`vercel.json`** - Configuration Vercel
  - Version 2 API
  - Variables d'environnement
  - Routes et builds configurés
  - Function timeouts

### 🔑 Variables d'environnement

- **`.env.local`** - Variables locales (Ne pas commiter)
  - NEXTAUTH_SECRET
  - NEXTAUTH_URL

- **`.env.example`** - Template des variables
  - Guide pour la configuration

### 📚 Documentation

- **`README.md`** - Documentation principale
  - Installation
  - Démarrage
  - Structure du projet
  - Technologie utilisées

- **`PROJECT_SUMMARY.md`** - Résumé complet du projet
  - Vue d'ensemble
  - Fonctionnalités
  - Déploiement
  - Troubleshooting

- **`DEPLOYMENT_GUIDE.md`** - Guide de déploiement
  - Instructions détaillées
  - Variables d'environnement
  - Scripts disponibles
  - Dépannage

- **`VERCEL_DEPLOYMENT.md`** - Guide spécifique Vercel
  - Configuration Vercel
  - Étapes de déploiement
  - Problèmes courants
  - Optimisations

- **`AUTH_CONFIG.md`** - Configuration de l'authentification
  - Détails de NextAuth
  - Endpoints
  - Flux d'authentification

- **`FILES_REFERENCE.md`** - Ce fichier
  - Référence complète de tous les fichiers

### 📌 Scripts et Utilitaires

- **`install.bat`** - Script d'installation des dépendances
  - Supprime node_modules
  - Réinstalle les packages

- **`run-dev.bat`** - Script pour démarrer en développement
  - Lance le serveur dev local

- **`push-to-github.bat`** - Script pour pousser sur GitHub
  - Configure le remote
  - Lance le push

### 🎨 Assets

- **`public/favicon.ico`** - Favicon de l'application
- **`public/*.svg`** - Icônes SVG

### 🔧 Git

- **`.git/`** - Repository Git (auto-généré)
- **`.gitignore`** - Fichiers à ignorer par Git

---

## 📊 Résumé des fichiers

| Catégorie | Nombre | Exemples |
|-----------|--------|----------|
| API Routes | 6 | auth, students, courses, init |
| Pages Frontend | 7 | login, dashboard, students, courses |
| Configuration | 6 | next.config, tsconfig, vercel.json |
| Authentification | 2 | auth.ts, middleware.ts |
| Documentation | 6 | README, guides, références |
| Utilitaires | 4 | db.ts, install scripts |
| Assets | 5+ | Images, CSS, ICO |

**Total** : Plus de 40 fichiers configurés

---

## 🔄 Flux de l'application

```
User Request
    ↓
Middleware (auth protection)
    ↓
Route Handlers (API)
    ↓
Database (SQLite)
    ↓
Response / Redirect
```

---

## 📝 Dépendances principales

- **next** (16.1.6) - Framework React
- **react** (19.2.3) - Librairie UI
- **next-auth** (5.0.0-beta) - Authentification
- **better-sqlite3** (11.1.2) - Base de données
- **bcryptjs** (2.4.3) - Hachage des mots de passe
- **tailwindcss** (4) - Styling CSS
- **typescript** (5) - Types JavaScript

---

## ✅ Checklist d'implémentation

- ✅ Backend avec Next.js API routes
- ✅ Frontend avec React et TypeScript
- ✅ Base de données SQLite
- ✅ Authentification avec NextAuth
- ✅ Protection des routes
- ✅ Interface responsive
- ✅ CRUD complet pour étudiants
- ✅ CRUD complet pour cours
- ✅ Gestion des inscriptions
- ✅ Configuration Vercel
- ✅ Documentation complète
- ✅ Scripts d'aide

---

## 🚀 Pour commencer

1. **Lire** : `README.md`
2. **Installer** : `npm install`
3. **Configurer** : `.env.local`
4. **Démarrer** : `npm run dev`
5. **Accéder** : `http://localhost:3000`

---

**Créé le** : 25 février 2026  
**Auteur** : Hamza Tahrijouti (h.tahrijouti@esisa.ac.ma)
