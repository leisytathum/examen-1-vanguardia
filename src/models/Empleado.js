const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

// Parte 1: modelo Empleado (tabla "empleados")
const Empleado = sequelize.define('Empleado', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: 'El nombre no puede estar vacío' } },
  },
  puesto: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: 'El puesto no puede estar vacío' } },
  },
  salario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: { msg: 'El salario debe ser un número' },
      mayorQueCero(valor) {
        if (Number(valor) <= 0) throw new Error('El salario debe ser mayor que 0');
      },
    },
  },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'empleados',
});

module.exports = Empleado;
