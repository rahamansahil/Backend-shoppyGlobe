const express = require('express');
const router = express.Router();
const { addToCart, updateCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, addToCart);
router.put('/:id', protect, updateCart);
router.delete('/:id', protect, removeFromCart);

module.exports = router;