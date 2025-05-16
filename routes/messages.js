const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authMiddleware } = require('../middlewares/auth');

// Message routes
router.get('/', authMiddleware, messageController.getAll);
router.get('/booking/:bookingId', authMiddleware, messageController.getByBooking);
router.get('/:id', authMiddleware, messageController.getById);
router.post('/', authMiddleware, messageController.create);
router.put('/:id', authMiddleware, messageController.update);
router.delete('/:id', authMiddleware, messageController.delete);

module.exports = router; 