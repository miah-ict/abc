const express = require('express');
const router = express.Router();
const centerController = require('../controllers/center.controller');
const { authenticateToken } = require('../middlewares/auth');
const { requireRole } = require('../middlewares/rbac');

router.get('/', centerController.getAllCenters);
router.get('/:id', centerController.getCenterById);

// Admin-only routes
router.post('/', authenticateToken, requireRole('SUPER_ADMIN'), centerController.createCenter);
router.put('/:id', authenticateToken, requireRole('SUPER_ADMIN'), centerController.updateCenter);
router.patch('/:id/status', authenticateToken, requireRole('SUPER_ADMIN'), centerController.updateCenterStatus);
router.delete('/:id', authenticateToken, requireRole('SUPER_ADMIN'), centerController.deleteCenter);

module.exports = router;
