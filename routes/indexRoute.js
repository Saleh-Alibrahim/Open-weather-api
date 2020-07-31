const express = require('express');
const ErrorResponse = require('../utils/errorResponse');

const router = express.Router();

// Setup empty JS object to act as endpoint for all routes
let projectData = [];




// Add new Data
router.post('/', (req, res, next) => {

    // Store the data to the array
    projectData.push(req.body);

    // Return success
    res.json({ success: true });

});

// Get All Data
router.get('/all', (req, res, next) => {

    // Return all the data
    res.json(projectData);
});

// Catch the 404 routes
router.get('*', (req, res, next) => {

    // do not show the error if rendering the main page
    if (req.url == '/kj' && req.method == 'GET') {
        return;
    }
    // Return error message
    next(new ErrorResponse('Incorrect route use either / or /all ', 404));
});

module.exports = router;
