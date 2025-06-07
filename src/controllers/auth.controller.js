const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     description: Tạo tài khoản người dùng mới
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - institutional_id
 *               - email
 *               - password
 *               - full_name
 *               - role
 *             properties:
 *               institutional_id:
 *                 type: string
 *                 description: Mã định danh người dùng
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email người dùng
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mật khẩu người dùng
 *               full_name:
 *                 type: string
 *                 description: Họ tên đầy đủ
 *               phone_number:
 *                 type: string
 *                 description: Số điện thoại
 *               role:
 *                 type: string
 *                 enum: [ADMIN, STUDENT, LECTURER, DEAN, VICE_DEAN, DEPARTMENT_HEAD]
 *                 description: Vai trò người dùng
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       409:
 *         description: Email hoặc institutional_id đã tồn tại
 *       500:
 *         description: Lỗi server
 */
const register = async(req, res) => {
    try {
        const { institutional_id, email, password, full_name, phone_number, role } = req.body;

        // Kiểm tra xem email hoặc institutional_id đã tồn tại chưa
        const existingUser = await User.findOne({
            $or: [{ email }, { institutional_id }]
        });

        if (existingUser) {
            return res.status(409).json({
                status: 'error',
                message: 'Email hoặc mã định danh đã được sử dụng'
            });
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Tạo người dùng mới
        const newUser = new User({
            institutional_id,
            email,
            password_hash,
            full_name,
            phone_number,
            role
        });

        // Lưu vào database
        await newUser.save();

        res.status(201).json({
            status: 'success',
            data: {
                user: {
                    id: newUser._id,
                    email: newUser.email,
                    institutional_id: newUser.institutional_id,
                    full_name: newUser.full_name,
                    role: newUser.role
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Đã xảy ra lỗi khi đăng ký',
            error: error.message
        });
    }
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     description: Đăng nhập và trả về token JWT
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - institutional_id
 *               - password
 *             properties:
 *               institutional_id:
 *                 type: string
 *                 description: Mã định danh người dùng
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mật khẩu người dùng
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     institutional_id:
 *                       type: string
 *                     full_name:
 *                       type: string
 *                     role:
 *                       type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Email hoặc mật khẩu không đúng
 *       500:
 *         description: Lỗi server
 */
const login = async(req, res) => {
    try {
        const { institutional_id, password } = req.body;

        // Tìm user với email
        const user = await User.findOne({ institutional_id });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Mã định danh hoặc mật khẩu không đúng'
            });
        }

        // Kiểm tra trạng thái tài khoản
        if (!user.is_active) {
            return res.status(401).json({
                status: 'error',
                message: 'Tài khoản của bạn đã bị vô hiệu hóa'
            });
        }

        // Kiểm tra mật khẩu
        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Mã định danh hoặc mật khẩu không đúng'
            });
        }

        // Tạo JWT token
        const token = jwt.sign({
                id: user._id,
                institutional_id: user.institutional_id,
                role: user.role
            },
            config.jwt.secret, { expiresIn: `${config.jwt.accessExpirationMinutes}m` }
        );

        // Trả về thông tin user và token
        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    institutional_id: user.institutional_id,
                    full_name: user.full_name,
                    role: user.role
                },
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Đã xảy ra lỗi khi đăng nhập',
            error: error.message
        });
    }
};

module.exports = {
    register,
    login
};