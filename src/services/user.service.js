const User = require('../models/User');

// Modelo de usuário para criar novos usuários e atualizá-los no banco de dados
const createService = (body) => User.create(body);

// Função para buscar todos os usuários no banco de dados
const findAllService = () => User.find();

// Função para buscar um usuário específico pelo ID no banco de dados
const findByIdService = (id) => User.findById(id);

module.exports = { createService, findAllService, findByIdService };