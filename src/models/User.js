const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Criado uma nova instancia com opções especificas para cada objeto
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    }
});

// Define um middleware para criptografar a senha antes de salvar no banco de dados
UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Define o Schema e exporta o modelo User para ser usado em outros lugares
const User = mongoose.model('User', UserSchema);

module.exports = User;