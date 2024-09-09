const userService = require('../services/user.service');
const mongoose = require('mongoose');

const validId = (req, res, next) => {
    // Recebendo o ID do usuário a ser buscado.
    const id = req.params.id;

    // Validando se o ID é válido. Se não, retorna um erro 400 e uma mensagem de erro.
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'ID invalido' });
    }

    next(); // Se o ID é válido, passa para a próxima função.
};

const validUser = async (req, res, next) => {
    const id = req.params.id;

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400).send({ message: 'Usuário não existe' });
    };

    next()
};

const validPost = (req, res, next) => {
    const { title, text, banner } = req.body;

    if (!title && !text && !banner) {
        return res.status(400).send({ message: 'Pelo menos um campo é obrigatório' });
    }

    next();
};

module.exports = { validId, validUser, validPost };