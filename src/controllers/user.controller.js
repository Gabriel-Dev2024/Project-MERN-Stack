const userService = require('../services/user.service');

const create = async (req, res) => {
  // Criando variaveis que fazem a request do body
  const { name, username, email, password, avatar, background } = req.body;

  // Validando se todos os campos estão preenchidos. Se não, retorna um erro 404 e uma mensagem de erro.
  if (!name || !username || !email || !password || !avatar || !background) {
      res.status(404).send({ message: 'Preencha todos os campos'})
  }

  // Verificando se o email já está cadastrado. Se sim, retorna um erro 400 e uma mensagem de erro
  const user = await userService.create(req.body);

  // Verificando se o método create retornou um novo usuário. Se não, retorna um erro 400 e uma mensagem de erro
  if (!user) {
    return res.status(400).send({ message: 'ERRO ao criar Usuario' })
  }

  // Se todos os campos estão preenchidos, cria um novo usuário com os dados fornecidos.
  res.status(201).send({
    message : 'Usuario criado com sucesso',
    user: {
      id: user._id,
      name,
      username,
      email,
      password,
      avatar,
      background,
    },
  });
};

// Exportando função para ser utilizada em outros lugares da aplicação.
module.exports = { create };