// LOGIC FOR DEFINING THE PRODUCT SCHEMA USING MONGOOSE

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    image: { type: String },
    stock: { type: Number, default: 10 } // FakeStore doesn't provide stock, so we'll default to 10
});

module.exports = mongoose.model('Product', productSchema);