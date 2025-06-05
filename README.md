# BE_NodeJs
# API với Node.js, Express và MongoDB

## Cấu trúc thư mục
```
src\
 |--config\         # Biến môi trường và cấu hình liên quan
 |--controllers\    # Bộ điều khiển route (tầng controller)
 |--docs\           # Tài liệu Swagger
 |--middlewares\    # Middleware Express tùy chỉnh
 |--models\         # Mô hình Mongoose (tầng dữ liệu)
 |--routes\         # Các routes
 |--services\       # Logic nghiệp vụ (tầng dịch vụ)
 |--utils\          # Các lớp và hàm tiện ích
 |--validations\    # Sơ đồ xác thực dữ liệu yêu cầu
 |--app.js          # Ứng dụng Express
 |--index.js        # Điểm khởi đầu ứng dụng
```

## Cài đặt

```bash
# Clone dự án
git clone <repository-url>

# Cài đặt dependencies
npm install

# Tạo file .env
cp .env.example .env
```

## Sử dụng

```bash
# Chế độ phát triển
npm run dev

# Chế độ sản xuất
npm start

# Chạy các bài kiểm tra
npm test
```

## Môi trường

Tạo một file `.env` trong thư mục gốc và thêm:

```
# Môi trường
NODE_ENV=development


# JWT
JWT_SECRET=my-secret-key
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30
```

## API Documentation

API documentation có sẵn tại http://localhost:3000/api-docs sau khi khởi động server. 