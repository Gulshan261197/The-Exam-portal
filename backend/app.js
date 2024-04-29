const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const passport = require('./services/passportconf');
const app = express();
const cors = require('cors');

app.use(helmet());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin');
    next();
});

const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));

// Remove this line: app.use(expressValidator());

// ... (other middleware and configuration)

// Add request validation using express-validator
app.post('/your-route', [
    check('field1').notEmpty().isString(),
    check('field2').isEmail(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Your route logic here
});

// ... (remaining code)

// Error handling
app.use(function (req, res, next) {
    next(createError(404, 'Invalid API. Use the official documentation to get the list of valid APIs.'));
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});

module.exports = app;
