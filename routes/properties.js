const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { authMiddleware } = require('../middlewares/auth');

// Property routes
router.get('/', authMiddleware, propertyController.getAll);
router.get('/upcoming-bookings', authMiddleware, propertyController.getWithUpcomingBookings);
router.get('/:id', authMiddleware, propertyController.getById);
router.get('/:id/performance', authMiddleware, propertyController.getPerformance);
router.post('/', authMiddleware, propertyController.create);
router.put('/:id', authMiddleware, propertyController.update);
router.delete('/:id', authMiddleware, propertyController.delete);

module.exports = router; 