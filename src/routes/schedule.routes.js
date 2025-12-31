const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const scheduleController = require('../controllers/schedule.controller');

// dealer
router.post('/', authMiddleware, scheduleController.createSchedule);
router.get('/', authMiddleware, scheduleController.getAllSchedules);
router.put('/:id', authMiddleware, scheduleController.updateSchedule);
router.delete('/:id', authMiddleware, scheduleController.deleteSchedule);

// customer (public)
router.get('/available', scheduleController.getAvailableSchedules);

module.exports = router;
