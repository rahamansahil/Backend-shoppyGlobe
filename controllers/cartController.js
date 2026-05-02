const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the user already has a cart
        let cart = await Cart.findOne({ userId: req.user.id}); // _id or id?
        if (cart) {
            // If the cart exists, check if the product is already in the cart
            const itemIndex = cart.items.findIndex(item => item.productId === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;

                // If item doesn't exist in cart, add new item
            } else {
                cart.items.push({ productId, quantity });
            }
            await cart.save();
            return res.status(200).json(cart);

        // If the user doesn't have a cart, create a new cart
        } else {
            const newCart = await Cart.create({
                userId: req.user.id,
                items: [{ productId, quantity }]
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {   
        res.status(500).json({ message: error.message });
    }
}

exports.updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        console.log("ProductId fetched from req.body:", productId,);

        // Check if the cart exists
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);

        // If the product is found in the cart, update the quantity
        if (item) {
            item.quantity = quantity;
            await cart.save();
            return res.status(200).json(cart);

        // If the product is not found in the cart, return an error
        } else {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @route   DELETE /cart/:id
exports.removeFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        // keep all items except the one to be removed
        cart.items = cart.items.filter(p => p.productId != req.params.id);
        await cart.save();
        res.json({ message: "Item removed", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};