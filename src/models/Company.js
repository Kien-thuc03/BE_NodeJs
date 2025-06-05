const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Company Schema - Mô hình đơn vị/doanh nghiệp thực tập
 */
const companySchema = new Schema({
    company_name: {
        type: String,
        required: true
    }, // Tên đơn vị/doanh nghiệp
    address: {
        type: String,
        required: true
    }, // Địa chỉ
    contact_person: {
        type: String,
        required: true
    }, // Người liên hệ
    position: String, // Chức vụ
    phone_number: {
        type: String,
        required: true
    }, // Số điện thoại
    email: {
        type: String,
        required: true
    }, // Email
    industry: String // Lĩnh vực hoạt động
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', companySchema);