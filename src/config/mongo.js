const mongoose = require('mongoose');

// Conexión a MongoDB con la cadena del archivo .env
async function conectarMongo() {
  await mongoose.connect(process.env.MONGO_URI);
}

module.exports = conectarMongo;
