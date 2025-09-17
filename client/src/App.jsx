import { useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Contacts from './pages/Contacts';

function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem('token') || '');
  const [page, setPage] = useState(userToken ? 'contacts' : 'login');

  // Fonction pour gérer login / register
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setUserToken(token);
    setPage('contacts');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserToken('');
    setPage('login');
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <h1>MyContacts</h1>
      </header>

      {/* Navigation */}
      <nav className="mb-4">
        {!userToken && (
          <>
            <button className="btn btn-outline-primary me-2" onClick={() => setPage('login')}>
              Login
            </button>
            <button className="btn btn-outline-secondary" onClick={() => setPage('register')}>
              Register
            </button>
          </>
        )}
      </nav>

      {/* Contenu principal */}
      <main>
        {page === 'register' && <Register />}
        {page === 'login' && <Login onLogin={handleLogin} />}
        {page === 'contacts' && <Contacts token={userToken} />}
      </main>

      {/* Footer avec Déconnexion */}
      {userToken && (
        <footer className="mt-4 text-center">
          <button className="btn btn-danger" onClick={handleLogout}>
            Déconnexion
          </button>
        </footer>
      )}
    </div>
  );
}

export default App;
