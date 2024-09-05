const News = require('../models/News');
const { v4: uuidv4 } = require('uuid'); // Biblioteca para gerar IDs únicos

const createService = (body) => News.create(body);

// News.find() vai pegar todas as noticias do banco de dados
// .sort({ _id: -1 }) ele ordena as noticias em ordem decrescente, as noticias mais novas aparecem primeiro
// .skip(offset) ele pula o numero de noticias definido pelo offset ou seja 0
// .limit(limit) limita o número de notícias retornadas
// .populate('user') traz os dados do usuario que fez a publicação da noticia
const findAllService = (limit, offset) =>
    News.find()
        .sort({ _id: -1 })
        .skip(offset)
        .limit(limit)
        .populate('user');

// Conta quantas noticias existem no banco de dados
const countNews = () => News.countDocuments();

// News.findOne().sort({ _id: -1 }).populate('user') vai pegar a última noticia do banco de dados
const topNewsService = () =>
    News.findOne()
        .sort({ _id: -1 })
        .populate('user');

// News.findById(id) vai pegar a noticia com o id passado como parametro
const findByIdService = (id) =>
    News.findById(id)
        .populate('user');

// $regex: ${title || ''}`: Cria uma expressão regular para buscar o título fornecido.
// $options: 'i': Faz a busca sem diferenciar maiúsculas de minúsculas.
const searchByTitleService = (title) =>
    News.find(
        { title: { $regex: `${title || ''}`, $options: 'i' } })
        .sort({ _id: -1 })
        .populate('user');

// News.find({ user: id }) vai pegar todas as noticias publicadas pelo usuario com o id passado como parametro
const byUserService = (id) =>
    News.find(
        { user: id })
        .sort({ _id: -1 })
        .populate('user');

// Essa função atualiza a noticia pelo id passado como parametro
// E permite atualiza o title, text ou o banner
// E o rawResult é para escrever o resultado na tela
const updateService = (id, title, text, banner) =>
    News.findOneAndUpdate(
        { _id: id },
        { title, text, banner },
        { rawResult: true }
    );

// Função para deletar uma noticia pelo id passado como parametro
const deleteNewsService = (id) => News.findOneAndDelete({ _id: id });

// 'likes.userId': { $nin: [userId] }: Isso verifica se o userId não está presente na lista de likes do documento.
// O operador $nin significa "não está em" e assegura que o usuário ainda não tenha curtido a notícia.

// $push: Este operador é usado para adicionar um novo item a um array no MongoDB.
// likes: Refere-se ao array de "likes" no documento.
// { userId, created: new Date() }: Este é o novo objeto que será adicionado ao array de likes. Inclui o userId do usuário que está curtindo e a data atual, indicando quando o "like" foi registrado.
const likeNewsService = (id, userId) =>
    News.findOneAndUpdate(
        { _id: id, 'likes.userId': { $nin: [userId] } },
        { $push: { likes: { userId, created: new Date() } } }
    );

// $pull: Este operador é usado para remover um item de um array no MongoDB.
const removeLikeNewsService = (id, userId) =>
    News.findOneAndUpdate(
        { _id: id },
        { $pull: { likes: { userId } } }
    );

const commentNewsService = (id, userId, comment) => {

    // Gerar um id aleatório para o comentário
    const idComment = uuidv4();
    return News.findOneAndUpdate(
        { _id: id },
        { $push: {
                comments: {
                    idComment,
                    userId,
                    comment,
                    createdAt: new Date()
                }
            }
        }
    );
}

// Essa função remove um comentário pelo id passado como parametro
const removeCommentService = (id, idComment, userId) =>
    News.findOneAndUpdate(
        { _id: id },
        { $pull: { comments: { idComment, userId } } }
    );

module.exports = { createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService, byUserService, updateService, deleteNewsService, likeNewsService, removeLikeNewsService, commentNewsService, removeCommentService };