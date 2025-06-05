const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * InternshipPeriod Schema - Mô hình đợt thực tập
 */
const internshipPeriodSchema = new Schema({
    period_code: {
        type: String,
        required: true,
        unique: true
    }, // Mã đợt thực tập
    semester: {
        type: String,
        required: true
    }, // Học kỳ
    academic_year: {
        type: String,
        required: true
    }, // Năm học
    start_date: {
        type: Date,
        required: true
    }, // Ngày bắt đầu
    end_date: {
        type: Date,
        required: true
    } // Ngày kết thúc
}, {
    timestamps: true
});

module.exports = mongoose.model('InternshipPeriod', internshipPeriodSchema);