const express = require('express');
const router = express.Router();

// Import các routes khác
const userRoute = require('./user.route');
const authRoute = require('./auth.route');

// API Documentation route
router.get('/', (req, res) => {
    res.json({
        message: 'API đang hoạt động',
        version: '1.0.0',
    });
});

// Sử dụng các routes
router.use('/users', userRoute);
router.use('/auth', authRoute);

module.exports = router;