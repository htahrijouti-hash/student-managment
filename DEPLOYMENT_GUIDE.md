# Guide de Déploiement et Gestion du Projet

## Structure de répertoires créée

Le projet est actuellement situé à :
```
c:\Users\hamza\Desktop\prog C\app\student-management\
```

## Fichiers clés créés

### Configuration et authentification
- `auth.ts` - Configuration NextAuth avec stratégie Credentials
- `middleware.ts` - Protection des routes et redirection d'authentification
- `.env.local` - Variables d'environnement (à remplir)
- `vercel.json` - Configuration Vercel optimisée

### Base de données
- `lib/db.ts` - Initialisation SQLite avec better-sqlite3
- Schéma : Users, Students, Courses, Enrollments

### API Routes
- `app/api/auth/[...nextauth]/route.ts` - Authentification NextAuth
- `app/api/students/route.ts` - GET/POST étudiants
- `app/api/students/[id]/route.ts` - GET/PUT/DELETE étudiant spécifique
- `app/api/students/[id]/enrollments/route.ts` - Gestion des inscriptions
- `app/api/courses/route.ts` - Gestion des cours
- `app/api/init/route.ts` - Initialisation de base de données

### Pages Frontend
- `app/page.tsx` - Page d'accueil (redirection)
- `app/login/page.tsx` - Page de connexion
- `app/dashboard/page.tsx` - Tableau de bord
- `app/students/page.tsx` - Liste des étudiants
- `app/students/[id]/page.tsx` - Détails d'un étudiant
- `app/courses/page.tsx` - Gestion des cours

## Démarrage en développement

### Méthode 1 : Ligne de commande
```bash
cd "c:\Users\hamza\Desktop\prog C\app\student-management"
npm run dev
```

### Méthode 2 : Script batch
```bash
"c:\Users\hamza\Desktop\prog C\app\student-management\run-dev.bat"
```

L'application sera disponible à http://localhost:3000

## Initialisation de la base de données

### Première fois
1. Accédez à http://localhost:3000/api/init
2. Cela créera la base de données avec des données d'exemple
3. Connectez-vous avec :
   - Email: admin@example.com
   - Mot de passe: admin123

## Déploiement sur Vercel

### Étapes de déploiement

1. **Pousser le code sur GitHub** (voir ci-dessous)

2. **Connecter à Vercel**
   - Visitez https://vercel.com/new
   - Sélectionnez "Import Git Repository"
   - Connexionnez votre compte GitHub
   - Selectionnez le repository `student-management`

3. **Configurer les variables d'environnement**
   Dans les paramètres Vercel, ajouter :
   ```
   NEXTAUTH_SECRET=<générer-une-clé-aléatoire>
   NEXTAUTH_URL=https://<your-domain>.vercel.app
   ```

4. **Déployer**
   Vercel va automatiquement builder et déployer

### Générer NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Ou utiliser un générateur en ligne : https://generate-secret.vercel.app/32

## Gestion GitHub

### Repository
- URL : https://github.com/htahrijouti-hash/student-managment.git
- Branche : main

### Emails configurés
- Git email : h.tahrijouti@esisa.ac.ma

### Scripts de push (créés)
- `push-to-github.bat` - Script pour pousser sur GitHub

### Commandes git basiques
```bash
# Vérifier le statut
git status

# Ajouter des changements
git add .

# Créer un commit
git commit -m "Description des changements"

# Pousser
git push -u origin main

# Voir les remotes
git remote -v
```

## Configuration Vercel complétée

Le fichier `vercel.json` est déjà configuré avec :
- Build command : `next build`
- Output directory : `.next`
- Environment variables : NEXTAUTH_SECRET, NEXTAUTH_URL
- Node.js version compatible

## Accès et utilisation

### Page de connexion
- http://localhost:3000/login

### Pages protégées
- /dashboard - Tableau de bord
- /students - Gestion des étudiants
- /courses - Gestion des cours

### API d'initialisation
- POST http://localhost:3000/api/init

## Logs et débogage

Les logs du serveur Next.js s'affichent dans le terminal :
```bash
npm run dev
```

Pour les logs de production après build :
```bash
npm run build
npm start
```

## Notes importantes

1. **Sécurité** : En production, toujours utiliser une vraie clé NEXTAUTH_SECRET
2. **Base de données** : SQLite est local, utiliser PostgreSQL pour la production Vercel
3. **Variables d'environnement** : Jamais commiter `.env.local` contenant des vrais secrets
4. **Authentification** : NextAuth gère les sessions côté serveur de manière sécurisée

## Troubleshooting

### Installation dependencies
```bash
cd "c:\Users\hamza\Desktop\prog C\app\student-management"
npm install
```

### Clean build
```bash
rmdir /s /q .next
npm run build
```

### Port 3000 déjà utilisé
```bash
npm run dev -- -p 3001
```

## Commandes utiles

```bash
# Format le code
npm run lint

# Reset de la base de données
rm student-management.db  # Puis redémarrer
```

---

**Créé par** : Hamza Tahrijouti
**Email** : h.tahrijouti@esisa.ac.ma
**Date** : 2026-02-25
