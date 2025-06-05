const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Cấu hình Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Quản lý thực tập',
            version: '1.0.0',
            description: 'API hệ thống quản lý thực tập sinh viên',
            contact: {
                name: 'Admin',
                email: 'admin@example.com'
            },
        },
        servers: [{
            url: 'http://localhost:3000',
            description: 'Development server',
        }, ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: [],
        }]
    },
    apis: [
        './src/routes/*.js',
        './src/controllers/*.js',
        './src/models/*.js'
    ],
};

const specs = swaggerJsdoc(options);

// Middleware để thiết lập Swagger UI
const swaggerDocs = (app, port) => {
    // Route để truy cập Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'API Documentation',
    }));

    console.log(`Swagger UI đang chạy tại http://localhost:${port}/api-docs`);
};

module.exports = { swaggerDocs };