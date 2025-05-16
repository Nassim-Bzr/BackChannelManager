const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');
const { auth } = require('../middlewares/auth');

// Price routes
router.get('/', auth, priceController.getAll);
router.get('/property/:propertyId', auth, priceController.getByPropertyAndDateRange);
router.get('/:id', auth, priceController.getById);
router.post('/', auth, priceController.create);
router.post('/property/:propertyId/bulk', auth, priceController.bulkUpdate);
router.put('/:id', auth, priceController.update);
router.delete('/:id', auth, priceController.delete);

module.exports = router; 