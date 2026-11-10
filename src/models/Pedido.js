const mongoose = require('mongoose');

// Parte 2: esquema Pedido (colección "pedidos")
const pedidoSchema = new mongoose.Schema({
  clienteNombre: { type: String, required: [true, 'clienteNombre es obligatorio'], trim: true },
  total: {
    type: Number,
    required: [true, 'total es obligatorio'],
    validate: { validator: (v) => v > 0, message: 'El total debe ser mayor que 0' },
  },
  estado: {
    type: String,
    enum: { values: ['pendiente', 'enviado', 'entregado'], message: 'Estado no válido: {VALUE}' },
    default: 'pendiente',
  },
  fecha: { type: Date, default: Date.now },
  productos: { type: [String], default: undefined }, // opcional
});

module.exports = mongoose.model('Pedido', pedidoSchema);
