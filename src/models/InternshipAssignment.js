const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * InternshipAssignment Schema - Mô hình phân công giảng viên hướng dẫn
 */
const internshipAssignmentSchema = new Schema({
    lecturer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Lecturer',
        required: true
    }, // ID giảng viên
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
    assignment_date: {
        type: Date,
        default: Date.now
    }, // Ngày phân công
    notes: String // Ghi chú
}, {
    timestamps: true
});

module.exports = mongoose.model('InternshipAssignment', internshipAssignmentSchema);