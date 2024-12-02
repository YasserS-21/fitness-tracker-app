const User = require('../models/User');
const bcrypt = require('bcryptjs');


// User registration
exports.registerUser = async (req, res) => {
    const { username, email, password, firstName, lastName, age, gender, height, weight, activityLevel } = req.body;

    try {
        console.log("Checking if User already exists");
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        console.log("No existing user found, proceeding with registration");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, passwordHash: hashedPassword, firstName, lastName, age, gender, height, weight, activityLevel });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

