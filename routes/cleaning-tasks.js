const express = require('express');
const router = express.Router();
const cleaningTaskController = require('../controllers/cleaningTaskController');
const { authMiddleware } = require('../middlewares/auth');

// Cleaning task routes
router.get('/', authMiddleware, cleaningTaskController.getAll);
router.get('/upcoming', authMiddleware, cleaningTaskController.getUpcoming);
router.get('/property/:propertyId', authMiddleware, cleaningTaskController.getByProperty);
router.get('/:id', authMiddleware, cleaningTaskController.getById);
router.post('/', authMiddleware, cleaningTaskController.create);
router.put('/:id', authMiddleware, cleaningTaskController.update);
router.put('/:id/status', authMiddleware, cleaningTaskController.updateStatus);
router.delete('/:id', authMiddleware, cleaningTaskController.delete);

module.exports = router; 