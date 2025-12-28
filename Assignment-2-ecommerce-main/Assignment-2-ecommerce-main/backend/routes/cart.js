const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');

// Add item to cart
router.post('/add', addToCart);

// Remove item from cart
router.post('/remove', removeFromCart);

// Get user's cart
router.get('/:user_id', getCart);

module.exports = router;
