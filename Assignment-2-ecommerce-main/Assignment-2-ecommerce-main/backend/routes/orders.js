const express = require('express');
const router = express.Router();
const { checkout } = require('../controllers/orderController');

// Checkout / Place order
router.post('/checkout', checkout);

module.exports = router;
