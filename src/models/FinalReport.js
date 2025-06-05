const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * FinalReport Schema - Mô hình báo cáo tổng kết thực tập
 */
const finalReportSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }, // ID sinh viên
    file_url: {
        type: String,
        required: true
    }, // Đường dẫn đến file báo cáo
    submission_date: {
        type: Date,
        default: Date.now
    }, // Ngày nộp
    feedback: String, // Nhận xét của giảng viên
    status: {
        type: String,
        enum: ['PENDING', 'REVIEWED', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    } // Trạng thái: Chờ duyệt, Đã xem xét, Đã duyệt, Từ chối
}, {
    timestamps: true
});

module.exports = mongoose.model('FinalReport', finalReportSchema);