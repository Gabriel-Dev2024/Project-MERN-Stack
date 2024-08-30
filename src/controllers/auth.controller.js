const bcrypt = require('bcrypt');
const authService = require('../services/auth.service');

// Validação da senha e do login
const login = async (req, res) => {

    try {
        const { email, password } = req.body

        // Validação do email
        const user = await authService.loginService(email);

        if (!user) {
            return res.status(400).send({ message: 'Email ou Senha Inválida' });
        }

        // Validação da senha
        const passwordIsValid = await bcrypt.compare(password, user.password)
        
        if (!passwordIsValid) {
            return res.status(400).send({ message: 'Email ou Senha Inválida' });
        }

        // Gerar o token para o usuario
        const token = authService.generateToken(user.id)

        res.send({token});

    } catch (err) {
        res.status(400).send({ message: err.message || 'Falha no Login' });
    }
}

module.exports = { login };