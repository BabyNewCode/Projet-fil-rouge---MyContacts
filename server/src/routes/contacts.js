const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth');



/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Récupérer tous les contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Liste des contacts
 */

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Créer un contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Jean
 *               lastName:
 *                 type: string
 *                 example: Dupont
 *               phone:
 *                 type: string
 *                 example: "0612345678"
 *     responses:
 *       201:
 *         description: Contact créé
 */



// Toutes les routes protégées
router.use(auth);

router.get('/', contactController.getContacts);

router.post('/', [
  body('firstName').notEmpty().withMessage('firstName requis'),
  body('lastName').notEmpty().withMessage('lastName requis'),
  body('phone').isLength({ min: 10, max: 20 }).withMessage('phone 10-20 caractères')
], contactController.createContact);



/**
 * @swagger
 * /api/contacts/{id}:
 *   patch:
 *     summary: Mettre à jour un contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact mis à jour
 */

router.patch('/:id', contactController.updateContact);


/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Supprimer un contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact supprimé
 */

router.delete('/:id', contactController.deleteContact);

module.exports = router;
