const express = require('express');
const router = express.Router();
const statController = require('../controllers/statController');
const { auth } = require('../middlewares/auth');

// Stats routes
router.get('/', auth, statController.getAll);
router.get('/property/:propertyId', auth, statController.getByProperty);
router.get('/property/:propertyId/summary', auth, statController.getPropertySummary);
router.get('/:id', auth, statController.getById);
router.post('/', auth, statController.create);
router.put('/:id', auth, statController.update);
router.delete('/:id', auth, statController.delete);

module.exports = router; 