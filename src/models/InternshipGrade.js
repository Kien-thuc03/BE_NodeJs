const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * InternshipGrade Schema - Mô hình điểm đánh giá thực tập
 */
const internshipGradeSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }, // ID sinh viên
    internship_period_id: {
        type: Schema.Types.ObjectId,
        ref: 'InternshipPeriod'
    }, // ID đợt thực tập
    process_score: {
        type: Number,
        min: 0,
        max: 10
    }, // Điểm quá trình
    report_score: {
        type: Number,
        min: 0,
        max: 10
    }, // Điểm báo cáo
    company_score: {
        type: Number,
        min: 0,
        max: 10
    }, // Điểm doanh nghiệp
    final_score: {
        type: Number,
        min: 0,
        max: 10
    }, // Điểm tổng kết
    feedback: String, // Nhận xét
    graded_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, // Người chấm điểm
    graded_date: {
        type: Date,
        default: Date.now
    } // Ngày chấm điểm
}, {
    timestamps: true
});

module.exports = mongoose.model('InternshipGrade', internshipGradeSchema);