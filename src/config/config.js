const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongoose: {
        url: process.env.MONGODB_URL || 'mongodb://localhost:27017/mydb',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'my-secret-key',
        accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || 30,
        refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || 30,
    },
};