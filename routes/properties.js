const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { auth } = require('../middlewares/auth');

// Property routes
router.get('/', auth, propertyController.getAll);
router.get('/upcoming-bookings', auth, propertyController.getWithUpcomingBookings);
router.get('/:id', auth, propertyController.getById);
router.get('/:id/performance', auth, propertyController.getPerformance);
router.post('/', auth, propertyController.create);
router.put('/:id', auth, propertyController.update);
router.delete('/:id', auth, propertyController.delete);

module.exports = router; 