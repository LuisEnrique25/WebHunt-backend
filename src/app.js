const express = require('express');
const routerUser = require('./routes/user.router');
const errorHandler = require('./middlewares/errorHandler.middleware');

const app = express();

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'WebHunt is running'
    });
});

app.use('/api/users', routerUser);



// Middlewares
app.use(errorHandler);

module.exports = app;