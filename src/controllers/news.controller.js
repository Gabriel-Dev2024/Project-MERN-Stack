const newsService = require('../services/news.service');

// Função para criar uma noticia
const create = async (req, res) => {

    try {
        const { title, text, banner } = req.body;

        // Verifica se tem o title, text e o banner
        if (!title || !text || !banner) {
            return res.status(400).send({ message: 'Titulo, texto e banner são obrigatórios' });
        }

        // Envia para o banco de dados o title, text e o banner que é colocado no body
        await newsService.createService({
            title,
            text,
            banner,
            user: req.userId
        });

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Função para listar todas as notícias
const findAll = async (req, res) => {

    try {
        const news = await newsService.findAllService();

        if (news.length === 0) {
            return res.status(400).send({ message: 'Nenhuma Noticia encontrado' });
        }

        res.send(news);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { create, findAll };