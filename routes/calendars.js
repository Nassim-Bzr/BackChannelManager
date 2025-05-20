const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const { authMiddleware } = require('../middlewares/auth');

// Calendar routes
router.get('/', authMiddleware, calendarController.getAll);
router.get('/property/:propertyId', authMiddleware, calendarController.getByProperty);
router.get('/:id', authMiddleware, calendarController.getById);
router.post('/', calendarController.create);
router.put('/:id', authMiddleware, calendarController.update);
router.delete('/:id', authMiddleware, calendarController.delete);

module.exports = router; 