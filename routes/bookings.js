const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { auth } = require('../middlewares/auth');

// Booking routes
router.get('/', auth, bookingController.getAll);
router.get('/upcoming', auth, bookingController.getUpcoming);
router.get('/property/:propertyId', auth, bookingController.getByProperty);
router.get('/:id', auth, bookingController.getById);
router.post('/', auth, bookingController.create);
router.put('/:id', auth, bookingController.update);
router.delete('/:id', auth, bookingController.delete);

module.exports = router; 