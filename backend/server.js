const express = require('express');
const connectDB = require('./src/config/db');
const app = require('./src/app');
require('dotenv').config();

// Connect to database
connectDB();

// Initialize express
const server = express();

server.use(express.json());

// Use the routes defined in the app
server.use('/api', app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
