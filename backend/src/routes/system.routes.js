const express = require('express');
const router = express.Router();
const systemController = require('../controllers/system.controller');
const { authenticateToken } = require('../middlewares/auth');
const { requireRole } = require('../middlewares/rbac');

router.get('/settings', systemController.getSettings);
router.put('/settings', authenticateToken, requireRole('SUPER_ADMIN'), systemController.updateSettings);

router.get('/logs', systemController.getAuditLogs);
router.post('/logs', authenticateToken, systemController.createAuditLog);

router.get('/backups', systemController.getBackups);
router.post('/backups/trigger', authenticateToken, requireRole('SUPER_ADMIN'), systemController.triggerBackup);

router.get('/reports/summary', systemController.getReportsSummary);

module.exports = router;
