require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database Connection
connectDB();

// AUTH ROUTES FOR REGISTER AND LOGIN
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); // Users will hit /api/auth/register and /api/auth/login for authentication

// PRODUCT ROUTES
app.use('/products', productRoutes)

// CART ROUTES
const cartRoutes = require('./routes/cartRoutes');
app.use('/cart', cartRoutes);

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('ShoppyGlobe API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));