const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * InternshipOutline Schema - Mô hình đề cương thực tập
 */
const internshipOutlineSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }, // ID sinh viên
    file_url: {
        type: String,
        required: true
    }, // Đường dẫn đến file đề cương
    submission_date: {
        type: Date,
        default: Date.now
    }, // Ngày nộp
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REVISION_REQUIRED', 'REJECTED'],
        default: 'PENDING'
    }, // Trạng thái: Chờ duyệt, Đã duyệt, Yêu cầu sửa, Từ chối
    feedback: String // Nhận xét
}, {
    timestamps: true
});

module.exports = mongoose.model('InternshipOutline', internshipOutlineSchema);