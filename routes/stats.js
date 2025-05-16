const express = require('express');
const router = express.Router();
const statController = require('../controllers/statController');
const { authMiddleware } = require('../middlewares/auth');

// Stats routes
router.get('/', authMiddleware, statController.getAll);
router.get('/property/:propertyId', authMiddleware, statController.getByProperty);
router.get('/property/:propertyId/summary', authMiddleware, statController.getPropertySummary);
router.get('/:id', authMiddleware, statController.getById);
router.post('/', authMiddleware, statController.create);
router.put('/:id', authMiddleware, statController.update);
router.delete('/:id', authMiddleware, statController.delete);

module.exports = router; 