const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const { auth } = require('../middlewares/auth');

// Calendar routes
router.get('/', auth, calendarController.getAll);
router.get('/property/:propertyId', auth, calendarController.getByProperty);
router.get('/:id', auth, calendarController.getById);
router.post('/', auth, calendarController.create);
router.put('/:id', auth, calendarController.update);
router.delete('/:id', auth, calendarController.delete);

module.exports = router; 