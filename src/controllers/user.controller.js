const userService = require('../services/user.service');
const mongoose = require('mongoose');

// Rota para criação de um novo usuário
const create = async (req, res) => {
  // Criando variaveis que fazem a request do body
  const { name, username, email, password, avatar, background } = req.body;

  // Validando se todos os campos estão preenchidos. Se não, retorna um erro 400 e uma mensagem de erro.
  if (!name || !username || !email || !password || !avatar || !background) {
    res.status(400).send({ message: 'Preencha todos os campos' })
  }

  // Verificando se o email já está cadastrado. Se sim, retorna um erro 400 e uma mensagem de erro
  const userEmail = await userService.createService(req.body);

  // Verificando se o método create retornou um novo usuário. Se não, retorna um erro 400 e uma mensagem de erro
  if (!userEmail) {
    return res.status(400).send({ message: 'ERRO ao criar Usuario' })
  }

  // Se todos os campos estão preenchidos, cria um novo usuário com os dados fornecidos.
  res.status(201).send({
    message: 'Usuario criado com sucesso',
    user: {
      id: userService._id,
      name,
      username,
      email,
      password,
      avatar,
      background,
    },
  });
};

// Rota para buscar todos os usuários
const findAll = async (req, res) => {
  // Buscando todos os usuários cadastrados.
  const users = await userService.findAllService();

  if (users.length === 0) {
    return res.status(400).send({ message: 'Nenhum Usuario encontrado' });
  }

  res.send(users)
};

// Rota para buscar um usuário por ID
const findById = async (req, res) => {
  // Recebendo o ID do usuário a ser buscado.
  const id = req.params.id;

  // Validando se o ID é válido. Se não, retorna um erro 400 e uma mensagem de erro. 0 é considerado um ID inválido.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID invalido' });  
  }

  // Buscando o usuário pelo ID. Se não encontrar, retorna um erro 400 e uma mensagem de erro.
  const user = await userService.findByIdService(id);

  if (!user) {
    return res.status(400).send({ message: 'Usuario não encontrado' });
  };

  res.send(user);
};

// Exportando função para ser utilizada em outros lugares da aplicação.
module.exports = { create, findAll, findById };