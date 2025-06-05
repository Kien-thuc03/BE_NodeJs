const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { swaggerDocs } = require('./docs/swagger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', routes);

// Cấu hình Swagger UI
swaggerDocs(app, process.env.PORT || 3000);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message: err.message
    });
});

module.exports = app;