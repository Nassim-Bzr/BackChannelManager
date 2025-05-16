const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { auth } = require('../middlewares/auth');

// Message routes
router.get('/', auth, messageController.getAll);
router.get('/booking/:bookingId', auth, messageController.getByBooking);
router.get('/:id', auth, messageController.getById);
router.post('/', auth, messageController.create);
router.put('/:id', auth, messageController.update);
router.delete('/:id', auth, messageController.delete);

module.exports = router; 