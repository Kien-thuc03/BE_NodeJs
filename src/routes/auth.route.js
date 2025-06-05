const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API xác thực người dùng
 */

// Route đăng ký
router.post('/register', authController.register);

// Route đăng nhập
router.post('/login', authController.login);

module.exports = router;