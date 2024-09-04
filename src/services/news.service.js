const News = require('../models/News');

const createService = (body) => News.create(body);

// News.find() vai pegar todas as noticias do banco de dados
// .sort({ _id: -1 }) ele ordena as noticias em ordem decrescente, as noticias mais novas aparecem primeiro
// .skip(offset) ele pula o numero de noticias definido pelo offset ou seja 0
// .limit(limit) limita o número de notícias retornadas
// .populate('user') traz os dados do usuario que fez a publicação da noticia
const findAllService = (limit, offset) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');

// Conta quantas noticias existem no banco de dados
const countNews = () => News.countDocuments();

// News.findOne().sort({ _id: -1 }).populate('user') vai pegar a última noticia do banco de dados
const topNewsService = () => News.findOne().sort({ _id: -1 }).populate('user');

// News.findById(id) vai pegar a noticia com o id passado como parametro
const findByIdService = (id) => News.findById(id).populate('user');

// $regex: ${title || ''}`: Cria uma expressão regular para buscar o título fornecido.
// $options: 'i': Faz a busca sem diferenciar maiúsculas de minúsculas.
const searchByTitleService = (title) => News.find({
    title: { $regex: `${title || ''}`, $options: 'i' }
})
    .sort({ _id: -1 })
    .populate('user');

module.exports = { createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService };