const { ValidationError } = require('sequelize');
const Empleado = require('../models/Empleado');

// Convierte errores de validación de Sequelize en un 400 con mensajes claros
function manejarError(err, res) {
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: 'Datos inválidos', detalles: err.errors.map((e) => e.message) });
  }
  console.error(err);
  return res.status(500).json({ error: 'Error interno del servidor' });
}

// GET /empleados
exports.listar = async (req, res) => {
  try {
    const empleados = await Empleado.findAll({ order: [['id', 'ASC']] });
    res.json(empleados);
  } catch (err) { manejarError(err, res); }
};

// GET /empleados/:id
exports.obtener = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    res.json(empleado);
  } catch (err) { manejarError(err, res); }
};

// POST /empleados
exports.crear = async (req, res) => {
  try {
    const { nombre, puesto, salario, activo } = req.body;
    // Validación pedida en el examen: salario mayor que 0
    if (salario === undefined || isNaN(Number(salario)) || Number(salario) <= 0) {
      return res.status(400).json({ error: 'El salario es obligatorio y debe ser mayor que 0' });
    }
    const empleado = await Empleado.create({ nombre, puesto, salario, activo });
    res.status(201).json(empleado);
  } catch (err) { manejarError(err, res); }
};

// PUT /empleados/:id
exports.actualizar = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    const { nombre, puesto, salario, activo } = req.body; // solo estos campos, nunca el id
    await empleado.update({ nombre, puesto, salario, activo });
    res.json(empleado);
  } catch (err) { manejarError(err, res); }
};

// DELETE /empleados/:id -> lo desactiva (activo = false) en vez de borrarlo
exports.eliminar = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
    await empleado.update({ activo: false });
    res.json({ mensaje: 'Empleado desactivado', empleado });
  } catch (err) { manejarError(err, res); }
};
