const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, adminAuth } = require('../middlewares/auth');

// User profile routes
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

// Admin routes for user management
router.get('/', authMiddleware, userController.getAll);
router.get('/:id', adminAuth, userController.getById);
router.post('/', userController.create);
router.put('/:id', adminAuth, userController.update);
router.delete('/:id', adminAuth, userController.delete);

module.exports = router; 