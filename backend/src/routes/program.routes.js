const express = require('express');
const router = express.Router();
const programController = require('../controllers/program.controller');
const { authenticateToken } = require('../middlewares/auth');
const { requireRole } = require('../middlewares/rbac');

router.get('/', programController.getAllPrograms);
router.get('/:id', programController.getProgramById);

router.post('/', authenticateToken, requireRole('SUPER_ADMIN'), programController.createProgram);
router.put('/:id', authenticateToken, requireRole('SUPER_ADMIN'), programController.updateProgram);
router.delete('/:id', authenticateToken, requireRole('SUPER_ADMIN'), programController.deleteProgram);

module.exports = router;
