import { useState, useEffect } from 'react';
import axios from 'axios';
import './Contacts.css'

export default function Contacts({ token }) {
  const [contacts, setContacts] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editPhone, setEditPhone] = useState('');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api/contacts',
    headers: { Authorization: `Bearer ${token}` },
  });

  // 🔹 Récupérer les contacts
  const fetchContacts = async () => {
    try {
      const res = await api.get('/');
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 🔹 Ajouter un contact
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/', { firstName, lastName, phone });
      setFirstName(''); setLastName(''); setPhone('');
      setMessage('Contact ajouté !');
      fetchContacts();
    } catch (err) {
      setMessage(err.response?.data?.errors?.map(e => e.msg).join(', ') || 'Erreur');
    }
  };

  // 🔹 Supprimer un contact
  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      setMessage('Contact supprimé !');
      fetchContacts();
    } catch (err) {
      setMessage('Erreur suppression');
    }
  };

  // 🔹 Modifier un contact
  const handleEdit = (contact) => {
    setEditingId(contact._id);
    setEditFirstName(contact.firstName);
    setEditLastName(contact.lastName);
    setEditPhone(contact.phone);
  };

  // 🔹 Sauvegarder la modification
  const handleSave = async (id) => {
    try {
      await api.patch(`/${id}`, {
        firstName: editFirstName,
        lastName: editLastName,
        phone: editPhone,
      });
      setMessage('Contact modifié !');
      setEditingId(null);
      fetchContacts();
    } catch (err) {
      setMessage('Erreur modification');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Mes Contacts</h2>

      <form onSubmit={handleAdd} className="mb-4">
        <div className="row g-2">
          <div className="col">
            <input type="text" className="form-control" placeholder="Prénom"
              value={firstName} onChange={e => setFirstName(e.target.value)} required />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Nom"
              value={lastName} onChange={e => setLastName(e.target.value)} required />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Téléphone"
              value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-success">Ajouter</button>
          </div>
        </div>
      </form>

      {message && <p className="text-success">{message}</p>}

      <table className="table">
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c._id}>
              {editingId === c._id ? (
                <>
                  <td>
                    <input type="text" className="form-control"
                      value={editFirstName}
                      onChange={(e) => setEditFirstName(e.target.value)} />
                  </td>
                  <td>
                    <input type="text" className="form-control"
                      value={editLastName}
                      onChange={(e) => setEditLastName(e.target.value)} />
                  </td>
                  <td>
                    <input type="text" className="form-control"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)} />
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(c._id)}>
                        Sauvegarder
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>
                        Annuler
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{c.firstName}</td>
                  <td>{c.lastName}</td>
                  <td>{c.phone}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(c)}>
                        Modifier
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c._id)}>
                        Supprimer
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
