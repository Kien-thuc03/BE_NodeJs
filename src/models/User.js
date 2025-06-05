const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * User Schema - Mô hình người dùng hệ thống
 */
const userSchema = new Schema({
    institutional_id: {
        type: String,
        required: true,
        unique: true
    }, // Mã định danh của người dùng
    email: {
        type: String,
        required: true,
        unique: true
    }, // Địa chỉ email
    password_hash: {
        type: String,
        required: true
    }, // Mật khẩu đã băm
    full_name: String, // Họ và tên đầy đủ
    phone_number: String, // Số điện thoại
    role: {
        type: String,
        enum: ['ADMIN', 'STUDENT', 'LECTURER', 'DEAN', 'VICE_DEAN', 'DEPARTMENT_HEAD'],
        required: true
    }, // Vai trò: Quản trị viên, Sinh viên, Giảng viên, Trưởng khoa, Phó khoa, Phụ trách khoa
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: 'users'
});

module.exports = mongoose.model('User', userSchema);