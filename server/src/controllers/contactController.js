const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { firstName, lastName, phone } = req.body;
  try {
    const contact = new Contact({ user: req.user.id, firstName, lastName, phone });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phone } = req.body;

  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: 'Contact non trouvé' });
    if (contact.user.toString() !== req.user.id) return res.status(403).json({ message: 'Accès refusé' });

    if (firstName !== undefined) contact.firstName = firstName;
    if (lastName !== undefined) contact.lastName = lastName;
    if (phone !== undefined) contact.phone = phone;

    await contact.save();
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID de contact invalide' });
  }

  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: 'Contact non trouvé' });
    if (contact.user.toString() !== req.user.id) return res.status(403).json({ message: 'Accès refusé' });

    await contact.deleteOne();
    res.json({ message: 'Contact supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
