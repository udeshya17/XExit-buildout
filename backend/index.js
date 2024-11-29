const cors = require('cors');
const express = require('express');
const employeeRouter = require('./routes/employee.route.js');
const adminRouter = require('./routes/admin.route.js');
const connectMongoDB = require('./config/config.js');
require('dotenv').config();

// Initialize Express app and define the port
const app = express();
const PORT = process.env.PORT || 8080; 

// Connect to MongoDB
connectMongoDB();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', employeeRouter);
app.use('/api/admin', adminRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Backend is listening on PORT ${PORT}`);
});
