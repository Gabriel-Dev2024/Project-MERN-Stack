const News = require('../models/News');

const createService = (body) => News.create(body);

const findAllService = () => News.find();

module.exports = { createService, findAllService };