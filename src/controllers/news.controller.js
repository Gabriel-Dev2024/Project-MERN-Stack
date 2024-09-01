const newsService = require('../services/news.service');

const create = async (req, res) => {

    try {
        const { title, text, banner } = req.body;

        if (!title || !text || !banner) {
            return res.status(400).send({ message: 'Titulo, texto e banner são obrigatórios' });
        }

        await newsService.createService({
            title,
            text,
            banner,
            user: { _id: '66c815ecbbfcc7965f419320'}
        });

        res.send(201);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

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