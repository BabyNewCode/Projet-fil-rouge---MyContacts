const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth');

// Toutes les routes protégées
router.use(auth);

router.get('/', contactController.getContacts);

router.post('/', [
  body('firstName').notEmpty().withMessage('firstName requis'),
  body('lastName').notEmpty().withMessage('lastName requis'),
  body('phone').isLength({ min: 10, max: 20 }).withMessage('phone 10-20 caractères')
], contactController.createContact);

router.patch('/:id', contactController.updateContact);

router.delete('/:id', contactController.deleteContact);

module.exports = router;
