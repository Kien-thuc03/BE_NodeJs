const app = require('./app');
const config = require('./config/config');
const mongoose = require('mongoose');

// Khởi động server ngay lập tức, không phụ thuộc vào MongoDB
const server = app.listen(config.port, () => {
    console.log(`Server đang chạy trên cổng ${config.port}`);
});

// Xử lý lỗi không mong muốn
const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server đã đóng');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    console.error('Lỗi không mong muốn:', error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    console.log('SIGTERM đã nhận được');
    if (server) {
        server.close();
    }
});

// Kết nối MongoDB (không chặn khởi động server)
mongoose
    .connect(config.mongoose.url, config.mongoose.options)
    .then(() => {
        console.log('Đã kết nối với MongoDB');
    })
    .catch((error) => {
        console.error('Lỗi kết nối MongoDB:', error);
        console.log('Server vẫn hoạt động nhưng không có kết nối đến cơ sở dữ liệu.');
    });