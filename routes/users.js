const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, adminAuth } = require('../middlewares/auth');

// User profile routes
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

// Admin routes for user management
router.get('/', userController.getAll);
router.get('/:id', adminAuth, userController.getById);
router.post('/', userController.create);
router.put('/:id', adminAuth, userController.update);
router.delete('/:id', adminAuth, userController.delete);

module.exports = router; 