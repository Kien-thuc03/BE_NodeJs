const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Student Schema - Mô hình sinh viên
 */
const studentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, // ID người dùng liên kết
    student_code: {
        type: String,
        required: true,
        unique: true
    }, // Mã sinh viên
    class: {
        type: String,
            required: true
    } // Lớp
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);