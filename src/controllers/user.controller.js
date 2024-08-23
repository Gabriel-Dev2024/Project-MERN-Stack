const create = (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        res.status(404).send({ message: 'Preencha todos os campos'})
    }

    res.status(201).send({
      message : 'Usuario criado com sucesso',
      user: {
        name,
        username,
        email,
        password,
        avatar,
        background,
      },
    });
};

module.exports = { create };