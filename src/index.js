const app = require('./app');
const config = require('./config/config');
const mongoose = require('mongoose');

// Kết nối MongoDB
mongoose
    .connect(config.mongoose.url, config.mongoose.options)
    .then(() => {
        console.log('Đã kết nối với MongoDB');

        // Khởi động server
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
    })
    .catch((error) => {
        console.error('Lỗi kết nối MongoDB:', error);
    });