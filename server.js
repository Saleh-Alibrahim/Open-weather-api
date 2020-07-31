const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config();

// Change the environment to production
if (process.argv[2] === '-p') {
    process.env.NODE_ENV = 'production';
}


// Require Express to run server and routes
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('public'));

// Enable CORS
app.use(cors());

// Mount routers
app.use('/', require('./routes/indexRoute'));

app.use(errorHandler);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
// Setup Server

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`.yellow.bold));