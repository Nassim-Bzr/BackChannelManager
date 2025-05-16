const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');
const { authMiddleware } = require('../middlewares/auth');

// Price routes
router.get('/', authMiddleware, priceController.getAll);
router.get('/property/:propertyId', authMiddleware, priceController.getByPropertyAndDateRange);
router.get('/:id', authMiddleware, priceController.getById);
router.post('/', authMiddleware, priceController.create);
router.post('/property/:propertyId/bulk', authMiddleware, priceController.bulkUpdate);
router.put('/:id', authMiddleware, priceController.update);
router.delete('/:id', authMiddleware, priceController.delete);

module.exports = router; 