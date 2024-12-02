const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        trim: true,
        lowercase: true, // Convert email to lowercase
    },
    passwordHash: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: false,
    },
    height: {
        type: Number, // Height in centimeters
        required: false,
    },
    weight: {
        type: Number, // Weight in kilograms
        required: false,
    },
    activityLevel: {
        type: String,
        enum: ['sedentary', 'lightly active', 'active', 'moderately active', 'very active'],
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    roles: {
        type: [String], // Array of roles (e.g., ['user', 'admin'])
        default: ['user'], // Default role
    }
});

// Middleware to update the updatedAt field before saving
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create the User model
const User = mongoose.model('User', userSchema, "users");

module.exports = User;
