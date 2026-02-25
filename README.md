# Student Management System

Une application complète de gestion des étudiants construite avec Next.js, SQLite, Tailwind CSS et NextAuth.

## Fonctionnalités

- 🔐 **Authentification sécurisée** avec NextAuth
- 📚 **Gestion des étudiants** : Ajouter, modifier, supprimer des étudiants
- 📖 **Gestion des cours** : Créer et afficher les cours disponibles
- ✅ **Inscription aux cours** : Inscrire les étudiants aux cours
- 📊 **Tableau de bord** : Vue d'ensemble des statistiques
- 🎨 **Interface moderne** : Design responsive avec Tailwind CSS

## Installation

### Prérequis

- Node.js (v18+)
- npm ou yarn

### Étapes d'installation

```bash
# Cloner le repository
git clone https://github.com/htahrijouti-hash/student-management.git
cd student-management

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créer un fichier .env.local et ajouter :
# NEXTAUTH_SECRET=your-secret-key
# NEXTAUTH_URL=http://localhost:3000

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible à [http://localhost:3000](http://localhost:3000)

## Credentials par défaut

L'application initialise une base de données avec :
- **Email**: admin@example.com
- **Mot de passe**: admin123

## Structure du projet

```
student-management/
├── app/
│   ├── api/
│   │   ├── auth/          # Configuration NextAuth
│   │   ├── students/      # API routes pour les étudiants
│   │   ├── courses/       # API routes pour les cours
│   │   └── init/          # Initialisation de base de données
│   ├── dashboard/         # Page du tableau de bord
│   ├── students/          # Pages de gestion des étudiants
│   ├── courses/           # Pages de gestion des cours
│   ├── login/             # Page de connexion
│   └── layout.tsx         # Layout principal
├── lib/
│   └── db.ts              # Configuration SQLite
├── auth.ts                # Configuration NextAuth
├── middleware.ts          # Middleware d'authentification
└── vercel.json            # Configuration Vercel
```

## Technologies utilisées

- **Frontend** : React 19, TypeScript, Tailwind CSS
- **Backend** : Next.js App Router
- **Base de données** : SQLite avec better-sqlite3
- **Authentification** : NextAuth avec bcrypt
- **Déploiement** : Vercel-ready

## Variables d'environnement

```env
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

## Scripts disponibles

```bash
# Démarrage en développement
npm run dev

# Compilation
npm run build

# Démarrage en production
npm start

# Linter
npm run lint
```

## Déploiement sur Vercel

Pour déployer sur Vercel :

1. Pousser le code sur GitHub
2. Connecter votre repository sur [Vercel](https://vercel.com)
3. Configurer les variables d'environnement dans Vercel
4. Cliquer sur "Deploy"

Le fichier `vercel.json` contient la configuration optimisée pour Vercel.

## Architecture

### Base de données

Tables :
- `users` : Utilisateurs et administrateurs
- `students` : Informations des étudiants
- `courses` : Catalogue des cours
- `enrollments` : Inscriptions des étudiants aux cours

### API Routes

- `POST /api/auth/[...nextauth]` : Authentification
- `GET/POST /api/students` : Gestion des étudiants
- `GET/PUT/DELETE /api/students/[id]` : Détails et modification
- `GET/POST /api/students/[id]/enrollments` : Inscriptions aux cours
- `GET/POST /api/courses` : Gestion des cours

## Notes de sécurité

- En production, changer `NEXTAUTH_SECRET` avec une clé aléatoire forte
- Utiliser HTTPS en production
- Implémenter une validation supplémentaire côté serveur
- Protéger les variables d'environnement sensibles

## Tests initiaux

Pour initialiser la base de données avec des données d'exemple :

```bash
curl http://localhost:3000/api/init -X POST
```

Cela créera :
- Un utilisateur admin
- 4 cours d'exemple
- 3 étudiants d'exemple

## Auteur

Hamza Tahrijouti - h.tahrijouti@esisa.ac.ma

## License

MIT
