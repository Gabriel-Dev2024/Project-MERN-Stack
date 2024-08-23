const express = require('express');
const userRoute = require('./src/routes/user.route');
const connectDatabase = require('./src/database/db');

const app = express();
const port = 3000;

// Configurações de opições do express
connectDatabase();
app.use(express.json());
app.use('/', userRoute);

app.listen(port, () => console.log(`API rodando na porta ${port}`));