const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const mongoose = require('mongoose');
const routes = require('./routes');

const port = 3331;
const app = express();

// MongoDB
const mongoDBUrl = 'mongodb://localhost:27017/mydatabase';
mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexão com o MongoDB estabelecida.'))
  .catch((err) => console.error('Erro de conexão com o MongoDB:', err));

// rotas da API
app.use(bodyParser.json());
app.use('/', routes);

// documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;
