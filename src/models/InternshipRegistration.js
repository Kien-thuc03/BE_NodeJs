const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * InternshipRegistration Schema - Mô hình thông tin đăng ký thực tập
 */
const internshipRegistrationSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }, // ID sinh viên
    internship_period_id: {
        type: Schema.Types.ObjectId,
        ref: 'InternshipPeriod',
        required: true
    }, // ID đợt thực tập
    company_id: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    }, // ID đơn vị thực tập
    internship_position: {
        type: String,
        required: true
    }, // Vị trí thực tập
    registration_date: {
        type: Date,
        default: Date.now
    }, // Ngày đăng ký
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    } // Trạng thái: Đang chờ, Đã duyệt, Từ chối
}, {
    timestamps: true
});

module.exports = mongoose.model('InternshipRegistration', internshipRegistrationSchema);