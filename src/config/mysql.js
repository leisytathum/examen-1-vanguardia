const { Sequelize } = require('sequelize');

// Conexión a MySQL con los datos del archivo .env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
