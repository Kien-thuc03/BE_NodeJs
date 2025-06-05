const express = require('express');
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API quản lý người dùng
 */

// Route lấy thông tin cá nhân (yêu cầu xác thực)
router.get('/profile', authenticate, userController.getProfile);

module.exports = router;