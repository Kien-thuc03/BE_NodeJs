const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * CompanyEvaluation Schema - Mô hình phiếu đánh giá của doanh nghiệp
 */
const companyEvaluationSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }, // ID sinh viên
    file_url: {
        type: String,
        required: true
    }, // Đường dẫn đến file phiếu đánh giá
    submission_date: {
        type: Date,
        default: Date.now
    }, // Ngày nộp
    verification_status: {
        type: String,
        enum: ['UNVERIFIED', 'VERIFIED', 'INVALID'],
        default: 'UNVERIFIED'
    }, // Trạng thái xác nhận: Chưa xác nhận, Đã xác nhận, Không hợp lệ
    notes: String, // Ghi chú
    score: {
        type: Number,
        min: 0,
        max: 10
    } // Điểm đánh giá từ doanh nghiệp (nếu có)
}, {
    timestamps: true
});

module.exports = mongoose.model('CompanyEvaluation', companyEvaluationSchema);