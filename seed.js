// seed.js file for seeding initial product data into the database. THIS HAS TO BE RUN ONCE ONLY!

require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios'); // You'll need to run: npm install axios
const Product = require('./models/Product');
const connectDB = require('./config/db.js');

const seedData = async () => {
    try {
        await connectDB();
        await Product.deleteMany(); // Clears existing products so you don't get duplicates

        const { data } = await axios.get('https://fakestoreapi.com/products');
        
        const products = data.map(p => ({
            name: p.title,
            title: p.title,
            price: p.price,
            description: p.description,
            category: p.category,
            image: p.image,
            stock: Math.floor(Math.random() * 50) + 1 // Random stock between 1-50
        }));

        await Product.insertMany(products);
        console.log('🚀 Data Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();