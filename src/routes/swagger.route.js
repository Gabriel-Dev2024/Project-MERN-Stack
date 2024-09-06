const express = require('express');
const path = require('path');
const router = express.Router();    

// Serve arquivos estáticos do diretório onde estão os arquivos do Swagger UI
router.use(express.static(path.join(__dirname, '../../public')));

// Rota para a página principal do Swagger UI
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require(path.join(__dirname, '../../public/swagger.json'));

router.post('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;