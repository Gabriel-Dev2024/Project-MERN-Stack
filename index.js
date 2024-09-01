const express = require('express');
const connectDatabase = require('./src/database/db');
const dotenv = require('dotenv').config();

// Rotas
const userRoute = require('./src/routes/user.route');
const authRoute = require('./src/routes/auth.route');
const newsRoute = require('./src/routes/news.route');

// Inicia o express e define a porta para o server rodar
const app = express();
const port = process.env.PORT || 3000;

// Configurações de opições do express
connectDatabase();
app.use(express.json());
app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/news', newsRoute);

// Rota inicial para o server rodar
app.listen(port, () => console.log(`API rodando na porta ${port}`));