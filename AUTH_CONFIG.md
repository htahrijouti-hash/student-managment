# Configuration NextAuth

La configuration NextAuth de ce projet utilise :
- **Provider** : Credentials (email/password)
- **Base de données** : SQLite avec bcryptjs pour le hachage
- **Session** : JWT
- **Redirect** : /login pour les utilisateurs non authentifiés

## Initialisation des credentials

Au premier démarrage, utilisez :
- Email : admin@example.com
- Mot de passe : admin123

Ces credentials sont créés via l'endpoint `/api/init`

## Variables d'environnement requises

```
NEXTAUTH_SECRET=votre-clé-secrète-aléatoire
NEXTAUTH_URL=http://localhost:3000
```

## Endpoints d'authentification

- `POST /api/auth/signin` - Connexion
- `GET /api/auth/signout` - Déconnexion
- `GET /api/auth/session` - Informations de session
- `GET /api/auth/providers` - Providers disponibles

## Flux d'authentification

1. L'utilisateur se connecte avec email et password
2. NextAuth valide les credentials via la fonction `authorize`
3. Le mot de passe est hashé et comparé avec bcrypt
4. Une session JWT est créée et stockée dans les cookies
5. Les pages protégées vérifient la session via le middleware

## Protection des routes

Le middleware protège les routes :
- `/dashboard`
- `/students`
- `/courses`

Les utilisateurs non authentifiés sont redirigés vers `/login`

## Personnalisation

Pour ajouter plus de fournisseurs, modifier `auth.ts` et ajouter des providers supplémentaires (Google, GitHub, etc.)

**Note** : Toute modification de auth.ts requiert un redémarrage du serveur.
