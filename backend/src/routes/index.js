const express = require('express');
const router = express.Router();

const healthRoutes = require('./health.routes');
const itemsRoutes = require('./items.routes');
const authRoutes = require('./auth.routes');
const centerRoutes = require('./center.routes');
const userRoutes = require('./user.routes');
const programRoutes = require('./program.routes');
const analyticsRoutes = require('./analytics.routes');
const systemRoutes = require('./system.routes');

router.use('/health', healthRoutes);
router.use('/items', itemsRoutes);
router.use('/auth', authRoutes);
router.use('/admin/centers', centerRoutes);
router.use('/admin/users', userRoutes);
router.use('/admin/programs', programRoutes);
router.use('/admin/analytics', analyticsRoutes);
router.use('/admin/system', systemRoutes);

module.exports = router;
