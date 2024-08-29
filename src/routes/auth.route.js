const route = require('express').Router();
const authController = require('../controllers/auth.controller');

route.post('/', authController.login);

module.exports = route;