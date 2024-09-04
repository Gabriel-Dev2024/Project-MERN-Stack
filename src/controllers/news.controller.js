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
        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit || !offset) {
            limit = 5;
            offset = 0;
        }

        // Envia para o banco de dados os limit e offset que são colocados no query
        // E conta o total de noticias com a função countNews
        const news = await newsService.findAllService(limit, offset);
        const total = await newsService.countNews();
        const currentUrl = req.baseUrl;

        // URL para a próxima página de resultados, se houver mais notícias disponíveis
        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if (news.length === 0) {
            return res.status(400).send({ message: 'Nenhuma Noticia encontrado' });
        }

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: news.map((newsItem) => {
                const user = newsItem.user || {};

                return {
                    id: newsItem._id,
                    title: newsItem.title,
                    text: newsItem.text,
                    banner: newsItem.banner,
                    likes: newsItem.likes,
                    comments: newsItem.comments,
                    name: user.name,
                    username: user.username,
                    userAvatar: user.avatar
                }

            }),
        });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const topNews = async (req, res) => {

    try {
        // Pega a ultima noticia
        const news = await newsService.topNewsService();

        if (!news) {
            return res.status(400).send({ message: 'Nenhuma Noticia encontrada' });
        }


        const user = news.user || {};
        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: user.name,
                username: user.username,
                userAvatar: user.avatar
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    }

};

const findById = async (req, res) => {

    try {
        const { id } = req.params;

        const news = await newsService.findByIdService(id);

        const user = news.user || {};
        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: user.name,
                username: user.username,
                userAvatar: user.avatar
            }
        })

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = { create, findAll, topNews, findById };