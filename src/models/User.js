const mongoose = require('mongoose');
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
        unique: true
    },
    password: {
        type: String,
        required: true
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

// Define o Schema e exporta o modelo User para ser usado em outros lugares
const User = mongoose.model('User', UserSchema);

module.exports = User;