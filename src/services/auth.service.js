const User = require('../models/User');

// Faz a busca do email se ele existir no banco de dados
// E faz o select para mostrar a senha 
const loginService = (email) => User.findOne({ email: email }).select('+password');

module.exports = { loginService };