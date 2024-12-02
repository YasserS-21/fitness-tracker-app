const express = require('express');
const authMiddleware = require("../middleware/authMiddleware")

const { registerUser, loginUser, getProfile } = require('../controllers/userController');

const router = express.Router();

// User registration route
router.post('/register', registerUser);

//user login route
router.post('/login', loginUser)

// User profile route
router.get('/profile', authMiddleware, getProfile);

module.exports = router;