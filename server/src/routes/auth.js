const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Mot de passe min 6 caractères')
], authController.register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], authController.login);

module.exports = router;
