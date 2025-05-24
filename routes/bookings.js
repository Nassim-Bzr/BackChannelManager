const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Booking routes
router.get('/',  bookingController.getAll);
router.get('/upcoming',  bookingController.getUpcoming);
router.get('/property/:propertyId',  bookingController.getByProperty);
router.get('/:id',  bookingController.getById);
router.post('/',  bookingController.create);
router.put('/:id',  bookingController.update);
router.delete('/:id',  bookingController.delete);

module.exports = router; 