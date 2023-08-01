const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API da Minha Aplicação',
            version: '1.0.0',
            description: 'Documentação da API da Minha Aplicação',
        },
    },
    apis: [
        './src/routes.js',
        './src/externalApi.js',
    ],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
