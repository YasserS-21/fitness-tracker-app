const express = require('express');

const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// User registration route
router.post('/register', registerUser);

//user login route
router.post('/login', loginUser)

// User profile route
router.get('/profile', getProfile);

module.exports = router;