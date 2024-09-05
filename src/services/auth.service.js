const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Faz a busca do email se ele existir no banco de dados
// E faz o select para mostrar a senha 
const loginService = (email) =>
    User.findOne({ email: email })
        .select('+password');

// Gera um token JWT para o usuário
// Que expira em 86400 segundos que é igual a 24 horas
const generateToken = (id) =>
    jwt.sign({ id: id },
        process.env.SECRET_JWT,
        { expiresIn: 86400 });

module.exports = { loginService, generateToken };