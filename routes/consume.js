const express = require('express');
const consumeController = require('../controllers/consume');
let router = express.Router();
const auth = require('../middlewares/auth');

router.post('/', consumeController.nuevoDato);
router.post('/consumo', auth.isAuth, consumeController.consumo);
router.post('/consumo/hoy', auth.isAuth, consumeController.consumoHoy);
router.post('/consumo/dia/:fecha', auth.isAuth, consumeController.consumoDia);

module.exports = router;