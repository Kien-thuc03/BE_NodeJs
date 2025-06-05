const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Lecturer Schema - Mô hình giảng viên
 */
const lecturerSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, // ID người dùng liên kết
    lecturer_code: {
        type: String,
        required: true,
        unique: true
    }, // Mã giảng viên
    department: {
        type: String,
        required: true
    } // Bộ phận/Khoa
}, {
    timestamps: true
});

module.exports = mongoose.model('Lecturer', lecturerSchema);