require('dotenv').config();
const express = require('express');
const sequelize = require('./config/mysql');
const conectarMongo = require('./config/mongo');
require('./models/Empleado'); // registra el modelo para que sync() cree la tabla

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ mensaje: 'Examen de Vanguardia' }));
app.use('/empleados', require('./routes/empleados.routes'));
app.use('/pedidos', require('./routes/pedidos.routes'));

// Ruta no encontrada
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

// JSON mal escrito -> 400; otro error -> 500
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'El body no es un JSON válido' });
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // crea la tabla empleados si no existe
    console.log('Conectado a MySQL (empresa_db)');

    await conectarMongo();
    console.log('Conectado a MongoDB');

    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  } catch (err) {
    console.error('No se pudo iniciar:', err.message);
    process.exit(1);
  }
}

iniciar();
