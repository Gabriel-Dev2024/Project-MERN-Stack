const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const authMiddleware = (req, res, next) => {

    try {
        // Verifica se a autorização está presente
        const { authorization } = req.headers;

        // Verifica se a autorização é válida
        if (!authorization) {
            return res.status(401).send({ message: 'Acesso não autorizado' });
        }

        // Extrai o token da autorização, e separa ele depois de um espaço
        const parts = authorization.split(' ');

        // Verifica se o token está presente e válido
        if (parts.length !== 2) {
            return res.status(401).send({ message: 'Acesso não autorizado' });
        }

        // Coloca o Bearer e o token em variaveis
        const [schema, token] = parts;

        // Verifica se o esquema é Bearer
        if (schema !== 'Bearer') {
            return res.status(401).send({ message: 'Acesso não autorizado' });
        };

        // Verifica o token
        jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Token Invalido' });
            }

            // Verifica se o usuario existe
            const user = await userService.findByIdService(decoded.id);

            // Verifica se o usuario existe e se o id é válido
            if (!user || !user.id) {
                return res.status(401).send({ message: 'Usuario não encontrado' });
            }

            // Salva o userId na requisição
            req.userId = user.id;

            next();
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = authMiddleware;