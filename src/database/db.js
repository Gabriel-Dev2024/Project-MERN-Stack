const mongoose = require('mongoose');

// Conectando ao MongoDB Atlas
const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URI,{
        serverSelectionTimeoutMS: 5000
    })
        // Esperando resposta do MongoDB Atlas para o mongoose conectar
        .then(() => console.log('MongoDB Atlas Connectado com sucesso'))
        .catch((err) => console.log(err));

};

module.exports = connectDatabase;