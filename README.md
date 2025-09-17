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

Le backend est déployé sur **Render** :  
- URL : [https://projet-fil-rouge-mycontacts-1.onrender.com](https://projet-fil-rouge-mycontacts-1.onrender.com)  
- Variables d’environnement à configurer sur Render :
  - `PORT` : 10000
  - `MONGO_URI` : <ton URI MongoDB>
  - `JWT_SECRET` : <ton secret JWT>


### Frontend

Le frontend est déployé sur **Netlify** :  
- URL : [https://jovial-profiterole-f921b8.netlify.app](https://jovial-profiterole-f921b8.netlify.app)  
- Variable d’environnement à configurer sur Netlify :
  - `VITE_API_URL` : `https://projet-fil-rouge-mycontacts-1.onrender.com`

Après configuration, le frontend communique avec le backend via l’URL définie dans `VITE_API_URL`.


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
