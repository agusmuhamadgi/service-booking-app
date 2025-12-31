const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const bookingController = require('../controllers/booking.controller');

// customer
router.post('/', bookingController.createBooking);

// dealer
router.get('/', authMiddleware, bookingController.getAllBookings);
router.put('/:id/status', authMiddleware, bookingController.updateStatus);

module.exports = router;
