const User = require('../models/User');

// Modelo de usuário para criar novos usuários e atualizá-los no banco de dados
const create = (body) => User.create(body);

module.exports = { create };