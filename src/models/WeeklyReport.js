const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * WeeklyReport Schema - Mô hình báo cáo tuần
 */
const weeklyReportSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }, // ID sinh viên
    week_number: {
        type: Number,
        required: true
    }, // Tuần số
    file_url: {
        type: String,
        required: true
    }, // Đường dẫn đến file báo cáo
    summary: {
        type: String,
        required: true
    }, // Tóm tắt nội dung báo cáo
    submission_date: {
        type: Date,
        default: Date.now
    }, // Ngày nộp
    feedback: String, // Nhận xét của giảng viên
    status: {
        type: String,
        enum: ['PENDING', 'REVIEWED'],
        default: 'PENDING'
    } // Trạng thái: Chờ duyệt, Đã duyệt
}, {
    timestamps: true
});

module.exports = mongoose.model('WeeklyReport', weeklyReportSchema);