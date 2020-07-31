const express = require('express');
const ErrorResponse = require('../utils/errorResponse');

const router = express.Router();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Add new Data
router.post('/', (req, res, next) => {

});

// Get All Data
router.get('/all', (req, res, next) => {

});

// Catch the 404 routes
router.get('*', (req, res, next) => {
    // Return error message
    next(new ErrorResponse('Incorrect route use either / or /all '), 404);
});

module.exports = router;
