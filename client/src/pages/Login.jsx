import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // 🔹 Récupère l’URL du backend

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { // 🔹 utilise API_URL
        email,
        password,
      });
      const token = res.data.token;
      onLogin(token); // remonte le token à App.jsx
      setMessage('Connexion réussie !');
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        err.response?.data?.errors?.map(e => e.msg).join(', ') ||
        'Erreur'
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Se connecter</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
