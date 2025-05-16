const express = require('express');
const router = express.Router();
const cleaningTaskController = require('../controllers/cleaningTaskController');
const { auth } = require('../middlewares/auth');

// Cleaning task routes
router.get('/', auth, cleaningTaskController.getAll);
router.get('/upcoming', auth, cleaningTaskController.getUpcoming);
router.get('/property/:propertyId', auth, cleaningTaskController.getByProperty);
router.get('/:id', auth, cleaningTaskController.getById);
router.post('/', auth, cleaningTaskController.create);
router.put('/:id', auth, cleaningTaskController.update);
router.put('/:id/status', auth, cleaningTaskController.updateStatus);
router.delete('/:id', auth, cleaningTaskController.delete);

module.exports = router; 