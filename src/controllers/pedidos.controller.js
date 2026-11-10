const mongoose = require('mongoose');
const Pedido = require('../models/Pedido');

const ESTADOS = ['pendiente', 'enviado', 'entregado'];

// POST /pedidos
exports.crear = async (req, res) => {
  try {
    const { clienteNombre, total, estado, productos } = req.body; // la fecha la pone Mongo
    const pedido = await Pedido.create({ clienteNombre, total, estado, productos });
    res.status(201).json(pedido);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
      const detalles = err.errors ? Object.values(err.errors).map((e) => e.message) : [err.message];
      return res.status(400).json({ error: 'Datos inválidos', detalles });
    }
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// GET /pedidos
exports.listar = async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ fecha: -1 });
    res.json(pedidos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// GET /pedidos/estado/:estado
exports.porEstado = async (req, res) => {
  try {
    const { estado } = req.params;
    if (!ESTADOS.includes(estado)) {
      return res.status(400).json({ error: `Estado no válido. Usa: ${ESTADOS.join(', ')}` });
    }
    const pedidos = await Pedido.find({ estado }).sort({ fecha: -1 });
    res.json(pedidos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
