# ⚡ Quick Start Guide - Démarrage en 5 minutes

## 🎯 Avant tout

Assurez-vous d'avoir :
- ✅ Node.js installé (v18+)
- ✅ Git installé
- ✅ Un terminal ouvert

---

## 📥 Installation (2 minutes)

### Step 1: Aller au dossier du projet
```bash
cd "c:\Users\hamza\Desktop\prog C\app\student-management"
```

### Step 2: Installer les dépendances
```bash
npm install
```

Ou utiliser le script :
```bash
install.bat
```

---

## 🚀 Lancer l'application (1 minute)

### Option 1: Ligne de commande
```bash
npm run dev
```

### Option 2: Script batch
```bash
run-dev.bat
```

**Résultat** :
```
> next dev

  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Environment: .env.local
```

---

## 🌐 Accéder à l'application (1 minute)

1. Ouvrez votre navigateur
2. Allez à : **http://localhost:3000**
3. Vous serez redirigé vers `/login`

---

## 🔐 Se connecter (30 secondes)

**Email** : `admin@example.com`  
**Mot de passe** : `admin123`

Cliquez sur "Login"

---

## ✨ Explorer l'application (30 secondes)

- 🏠 Tableau de bord avec statistiques
- 👥 Liste des étudiants
- 📚 Gestion des cours
- ➕ Ajouter de nouveaux étudiants
- 📝 Éditer les informations

---

## 📊 Ajouter des données d'exemple

### Méthode 1: API init (automatique)
```bash
curl http://localhost:3000/api/init -X POST
```

Cela créera :
- 4 cours d'exemple
- 3 étudiants d'exemple

### Méthode 2: Manuellement
1. Allez sur "Manage Students"
2. Cliquez "Add New Student"
3. Remplissez le formulaire

---

## 🛑 Arrêter l'application

Appuyez sur `Ctrl + C` dans le terminal

---

## 🐛 Impossible de démarrer ?

### Port 3000 déjà utilisé
```bash
npm run dev -- -p 3001
```
Puis accédez à `http://localhost:3001`

### Module manquant
```bash
rmdir /s /q node_modules
npm install
npm run dev
```

### Erreur de compilation
```bash
rmdir /s /q .next
npm run build
npm run dev
```

---

## 📱 Tester les fonctionnalités

### Dashboard
- ✅ Voir les statistiques
- ✅ Voir les derniers étudiants

### Students
- ✅ Créer un nouvel étudiant
- ✅ Voir la liste complète
- ✅ Editer les détails
- ✅ Inscrire aux cours
- ✅ Supprimer

### Courses
- ✅ Voir les cours disponibles
- ✅ Créer un nouveau cours

---

## 📚 Ressources

| Doc | Objectif |
|-----|----------|
| README.md | Vue d'ensemble |
| PROJECT_SUMMARY.md | Détails complets |
| DEPLOYMENT_GUIDE.md | Déploiement local |
| VERCEL_DEPLOYMENT.md | Déploiement Vercel |
| FILES_REFERENCE.md | Structure des fichiers |

---

## 🌍 Déployer sur Vercel (bonus)

Une fois satisfait localement :

```bash
# 1. Pousser sur GitHub
git push -u origin main

# 2. Aller sur vercel.com
# 3. Import Git Repository
# 4. Selectionnez votre repo
# 5. Ajouter les variables :
# - NEXTAUTH_SECRET=<clé-aléatoire>
# - NEXTAUTH_URL=https://<votre-url>.vercel.app
# 6. Deploy !
```

➡️ Voir `VERCEL_DEPLOYMENT.md` pour les détails

---

## ✅ Checklist rapide

- [ ] Node.js installé
- [ ] Dépendances installées
- [ ] Application démarrée
- [ ] Connecté avec admin
- [ ] Dashboard visible
- [ ] Au moins 1 étudiant créé
- [ ] Au moins 1 cours créé

**Si tout est coché** ✅ → L'application fonctionne parfaitement !

---

## 💡 Tips

1. **Raccourcis clavier** : 
   - `Ctrl + K` dans Next.js = Command palette
   - `F5` = Rafraîchir la page

2. **Console navigateur** : 
   - `F12` pour voir les logs
   - Cherchez les erreurs en rouge

3. **Logs serveur** : 
   - Regardez le terminal
   - Cherchez les messages en couleur

4. **Base de données** :
   - Fichier : `student-management.db`
   - Réinitialiser : Supprimer le fichier et redémarrer

---

## 📞 Besoin d'aide ?

**Problème** : L'app ne partage pas les données  
**Solution** : Vérifier que l'API répond (Network tab dans F12)

**Problème** : Erreur d'authentification  
**Solution** : Vérifier que NEXTAUTH_SECRET est configuré

**Problème** : Base de données vide  
**Solution** : Appeler `/api/init` ou ajouter manuellement

---

## 🎉 Vous êtes prêt !

Explorez l'application et construisez !

**Bonne chance** 🚀

---

**Temps total** : ~5 minutes ⏱️  
**Créé le** : 25 février 2026
