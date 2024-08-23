const mongoose = require('mongoose');

// Conectando ao MongoDB Atlas
const connectDatabase = () => {
    mongoose.connect(
        'mongodb+srv://gabriel:29032008@cluster1.pqmu0.mongodb.net/',
    )
    // Esperando resposta do MongoDB Atlas para o mongoose conectar
    .then(() => console.log('MongoDB Atlas Connectado com sucesso'))
    .catch((err) => console.log(err));
};

module.exports = connectDatabase;