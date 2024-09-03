const News = require('../models/News');

const createService = (body) => News.create(body);

// News.find() vai pegar todas as noticias do banco de dados
// .sort({ _id: -1 }) ele ordena as noticias em ordem decrescente, as noticias mais novas aparecem primeiro
// .skip(offset) ele pula o numero de noticias definido pelo offset ou seja 0
// .limit(limit) limita o número de notícias retornadas
// .populate('user') traz os dados do usuario que fez a publicação da noticia
const findAllService = (limit, offset) => News.find().sort({ _id: -1}).skip(offset).limit(limit).populate('user');

const countNews = () => News.countDocuments();

module.exports = { createService, findAllService, countNews };