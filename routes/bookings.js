const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authMiddleware } = require('../middlewares/auth');

// Booking routes
router.get('/', authMiddleware, bookingController.getAll);
router.get('/upcoming', authMiddleware, bookingController.getUpcoming);
router.get('/property/:propertyId', authMiddleware, bookingController.getByProperty);
router.get('/:id', authMiddleware, bookingController.getById);
router.post('/', authMiddleware, bookingController.create);
router.put('/:id', authMiddleware, bookingController.update);
router.delete('/:id', authMiddleware, bookingController.delete);

module.exports = router; 