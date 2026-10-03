const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken } = require('../middlewares/auth');
const { requireRole } = require('../middlewares/rbac');

router.use(authenticateToken);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', requireRole('SUPER_ADMIN'), userController.createUser);
router.put('/:id', requireRole('SUPER_ADMIN'), userController.updateUser);
router.patch('/:id/status', requireRole('SUPER_ADMIN'), userController.updateUserStatus);
router.delete('/:id', requireRole('SUPER_ADMIN'), userController.deleteUser);

module.exports = router;
