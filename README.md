# MyContacts

**MyContacts** est une application full-stack permettant de gérer des utilisateurs et leurs contacts. Elle inclut un backend en **Node.js / Express / MongoDB**, un frontend en **React**, ainsi que des tests unitaires et une documentation API via **Swagger**.

---

## **Fonctionnalités**

* **Authentification** : inscription et connexion d'utilisateurs.
* **Gestion des contacts** : créer, lire, modifier, supprimer des contacts.
* **Interface réactive** : React avec formulaire et tableau de contacts.
* **Tests unitaires** : Jest + Supertest.
* **Documentation API** : Swagger.
* **Déploiement** possible sur Render (backend) et Netlify (frontend).

---

## **Installation**

### Prérequis

* Node.js ≥ 18
* npm
* MongoDB local ou distant (pour production)

### Backend

1. Se placer dans le dossier `server` :

```bash
cd server
```

2. Installer les dépendances :

```bash
npm install
```

3. Créer un fichier `.env` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mycontacts
JWT_SECRET=ton_secret
```

4. Lancer le serveur :

```bash
npm run dev
```

Le serveur écoute par défaut sur `http://localhost:5000`.

### Frontend

1. Se placer dans le dossier `client` :

```bash
cd client
```

2. Installer les dépendances :

```bash
npm install
```

3. Lancer le frontend :

```bash
npm start
```

L'application sera disponible sur `http://localhost:3000`.

---

## **Tests**

Pour lancer les tests unitaires (backend) :

```bash
cd server
npm test
```

* Les tests utilisent **MongoMemoryServer** pour une DB temporaire.
* Auth et Contacts sont testés.

---

## **Documentation API (Swagger)**

Une fois le serveur lancé, accéder à :

```
http://localhost:5000/api-docs
```

* Toutes les routes Auth et Contacts sont documentées.
* Méthodes disponibles :

  * `POST /api/auth/register` : créer un utilisateur
  * `POST /api/auth/login` : connecter un utilisateur
  * `GET /api/contacts` : récupérer les contacts de l’utilisateur connecté
  * `POST /api/contacts` : créer un contact
  * `PATCH /api/contacts/:id` : modifier un contact
  * `DELETE /api/contacts/:id` : supprimer un contact



---

## **Endpoints essentiels**

### Auth

| Méthode | Route              | Description                 |
| ------- | ------------------ | --------------------------- |
| POST    | /api/auth/register | Créer un nouvel utilisateur |
| POST    | /api/auth/login    | Authentifier un utilisateur |

### Contacts (auth requise)

| Méthode | Route              | Description                 |
| ------- | ------------------ | --------------------------- |
| GET     | /api/contacts      | Récupérer tous les contacts |
| POST    | /api/contacts      | Ajouter un contact          |
| PATCH   | /api/contacts/\:id | Modifier un contact         |
| DELETE  | /api/contacts/\:id | Supprimer un contact        |

---

## **Tech Stack**

* **Frontend** : React, Bootstrap
* **Backend** : Node.js, Express
* **Base de données** : MongoDB (Mongoose)
* **Tests** : Jest, Supertest
* **Documentation API** : Swagger (OpenAPI 3.0)
* **Sécurité** : Helmet, JWT
