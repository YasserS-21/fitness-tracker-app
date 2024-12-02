const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// User login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)

    try {
        const users = await User.find()
        console.log(users)
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        console.log("User Found");
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        console.log("Valid Password");
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Token Assigned");
        res.json({ token, userId: user._id });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId); // Assuming req.user is populated by your auth middleware
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
