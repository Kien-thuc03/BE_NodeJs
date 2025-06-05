const User = require('../models/User');

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Lấy thông tin người dùng hiện tại
 *     description: Lấy thông tin chi tiết của người dùng đã đăng nhập
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thông tin người dùng
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
 *                         institutional_id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         full_name:
 *                           type: string
 *                         phone_number:
 *                           type: string
 *                         role:
 *                           type: string
 *       401:
 *         description: Không được xác thực
 *       500:
 *         description: Lỗi server
 */
const getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('institutional_id');

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Không tìm thấy người dùng'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                user: {
                    id: user._id,
                    institutional_id: user.institutional_id,
                    email: user.email,
                    full_name: user.full_name,
                    phone_number: user.phone_number,
                    role: user.role
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Đã xảy ra lỗi khi lấy thông tin người dùng',
            error: error.message
        });
    }
};

module.exports = {
    getProfile
};