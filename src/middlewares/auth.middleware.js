const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

/**
 * Middleware xác thực JWT
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticate = async(req, res, next) => {
    try {
        // Lấy token từ header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'error',
                message: 'Không tìm thấy token xác thực'
            });
        }

        const token = authHeader.split(' ')[1];

        // Xác thực token
        const decoded = jwt.verify(token, config.jwt.secret);

        // Tìm user từ id trong token
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Người dùng không tồn tại'
            });
        }

        // Kiểm tra trạng thái tài khoản
        if (!user.is_active) {
            return res.status(401).json({
                status: 'error',
                message: 'Tài khoản của bạn đã bị vô hiệu hóa'
            });
        }

        // Lưu thông tin user vào request
        req.user = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                status: 'error',
                message: 'Token không hợp lệ'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'error',
                message: 'Token đã hết hạn'
            });
        }

        return res.status(500).json({
            status: 'error',
            message: 'Lỗi xác thực',
            error: error.message
        });
    }
};

/**
 * Middleware kiểm tra quyền
 * @param {Array} roles - Danh sách vai trò được phép truy cập
 */
const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                status: 'error',
                message: 'Không tìm thấy thông tin người dùng'
            });
        }

        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'error',
                message: 'Bạn không có quyền truy cập tài nguyên này'
            });
        }

        next();
    };
};

module.exports = {
    authenticate,
    authorize
};