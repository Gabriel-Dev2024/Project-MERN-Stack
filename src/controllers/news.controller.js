const newsService = require('../services/news.service');

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
            return res.status(400).send({ message: 'Nenhuma Noticia encontrada' });
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

const searchByTitle = async (req, res) => {

    try {
        // Pega o título da noticia passado no query string ate o momento
        const { title } = req.query;
        const news = await newsService.searchByTitleService(title);

        if (news.length === 0) {
            return res.status(400).send({ message: 'Nenhuma Noticia encontrada' });
        }

        res.send({
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
            })
        });

    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const byUser = async (req, res) => {

    try {
        // Esse userId é pego do middleware de authentication
        const id = req.userId;
        const news = await newsService.byUserService(id);

        res.send({
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
            })
        });

    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, text, banner } = req.body;
        const news = await newsService.findByIdService(id);

        // Testa se o id do user é o mesmo que esta logado
        if (news.user._id != req.userId) {
            res.status(400).send({ message: 'Você não pode atualizar essa postagem' });
        }

        await newsService.updateService(id, title, text, banner);

        res.send({ message: 'Postagem atualizada com sucesso!' });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const deleteNews = async (req, res) => {

    try {
        const { id } = req.params;
        const news = await newsService.findByIdService(id);

        if (news.user._id != req.userId) {
            res.status(400).send({ message: 'Você não pode deletar essa postagem' });
        }

        await newsService.deleteNewsService(id);

        res.send({ message: 'Notícia deletada com sucesso!' });

    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const likeNews = async (req, res) => {

    try {
        const { id } = req.params;
        const userId = req.userId;
        const newsLiked = await newsService.likeNewsService(id, userId);

        if (!newsLiked) {
            await newsService.removeLikeNewsService(id, userId);
            return res.send({ message: 'Curtida removida com sucesso!' });
        }

        res.send({ message: 'Notícia curtida com sucesso!' });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const commentNews = async (req, res) => {

    try {
        const { id } = req.params;
        const userId = req.userId;
        const comment = req.body.comment;

        if (!comment) {
            return res.status(400).send({ message: 'Você precisa informar um comentário!' });
        }

        await newsService.commentNewsService(id, userId, comment);

        res.send({ message: 'Comentário adicionado com sucesso!' });

    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

const removeComment = async (req, res) => {

    try {
        const { id, idComment } = req.params;
        const userId = req.userId;

        // Verifique se id e idComment foram fornecidos
        if (!id || !idComment) {
            return res.status(400).send({ message: 'ID da notícia e ID do comentário são obrigatórios.' });
        }

        const commentDelete = await newsService.removeCommentService(id, idComment, userId);

        // Após a chamada ao serviço, o código tenta encontrar o comentário específico na lista de comentários retornada (commentDelete.comments).
        const commentFinder = commentDelete.comments.find((comment) => comment.idComment === idComment);

        // Se não encontra o comentário, retorna um 404 e uma mensagem de erro.
        if (!commentFinder) {
            res.status(404).send({ message: 'Comentario não existe'});
        };

        // Verifica se o userId do comentário encontrado é igual ao userId do usuário que está tentando remover o comentário.
        if (commentFinder.userId !== userId) {
            return res.status(400).send({ messsage: 'Você não pode apagar esse comentario' });
        };

        res.send({ message: 'Comentário removido com sucesso!' });

    } catch (err) {
        res.status(500).send({ message: err.message });
    };
};

module.exports = { create, findAll, topNews, findById, searchByTitle, byUser, update, deleteNews, likeNews, commentNews, removeComment };