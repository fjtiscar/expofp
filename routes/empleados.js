const express = require('express');
const empleadoController = require('../controllers/empleado');
const auth = require('../middlewares/auth');
let router = express.Router();

router.post('/new', auth.isAuth, empleadoController.nuevoEmpleado);
router.post('/tag', auth.isAuth, empleadoController.nuevoTag);
router.post('/list', auth.isAuth, empleadoController.listaEmpleados);
router.get('/:tag', empleadoController.autorizacion);

module.exports = router;