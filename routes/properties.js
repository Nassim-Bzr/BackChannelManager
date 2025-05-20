const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { authMiddleware } = require('../middlewares/auth');

// Property routes
router.get('/', propertyController.getAll);
router.get('/upcoming-bookings', propertyController.getWithUpcomingBookings);
router.get('/:id', propertyController.getById);
router.get('/:id/performance', propertyController.getPerformance);
router.post('/', propertyController.create);
router.put('/:id', propertyController.update);
router.delete('/:id', propertyController.delete);

module.exports = router; 