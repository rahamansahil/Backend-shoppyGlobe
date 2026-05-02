// LOGIC FOR DEFINING THE USER SCHEMA USING MONGOOSE

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Method to hash password before saving
userSchema.pre('save', async function(){
    try {
    if (!this.isModified('password')){
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        console.error('Error hashing password:', error);    
    }
});

module.exports = mongoose.model('User', userSchema);