const router = require('express').Router();
const c = require('../controllers/pedidos.controller');

router.post('/', c.crear);
router.get('/', c.listar);
router.get('/estado/:estado', c.porEstado);

module.exports = router;
