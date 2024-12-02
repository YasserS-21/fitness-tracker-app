const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Middleware to parse JSON requests
app.use(express.json()); 

// Enable CORS for all routes
app.use(cors())

// Connect to MongoDB
connectDB();


module.exports = app

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});