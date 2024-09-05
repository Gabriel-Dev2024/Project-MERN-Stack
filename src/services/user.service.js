const User = require('../models/User');

// Modelo de usuário para criar novos usuários e atualizá-los no banco de dados
const createService = (body) => User.create(body);

// Função para buscar todos os usuários no banco de dados
const findAllService = () => User.find();

// Função para buscar um usuário específico pelo ID no banco de dados
const findByIdService = (id) => User.findById(id);

// Função para atualizar um usuário no banco de dados
const updateService = (
    id,
    name,
    username,
    email,
    password,
    avatar,
    background

    // O primeiro argumento é o filtro, que neste caso é o ID do usuário que deseja atualizar.
    // O segundo parâmetro da função findOneAndUpdate é um objeto com as alterações desejadas.
    // As chaves são os nomes dos campos que deseja alterar, e os valores são os novos valores para esses campos.
) => User.findOneAndUpdate(
    { _id: id },
    { name, username, email, avatar, background }
)

module.exports = { createService, findAllService, findByIdService, updateService };