const express = require('express');
const userRoute = require('./src/routes/user.route');
const connectDatabase = require('./src/database/db');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configurações de opições do express
connectDatabase();
app.use(express.json());
app.use('/user', userRoute);

app.listen(port, () => console.log(`API rodando na porta ${port}`));