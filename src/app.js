const express = require('express');

const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'WebHunt API is running'
    });
});


// Middlewares

module.exports = app;