const express = require('express');
const consumeController = require('../controllers/consume');
let router = express.Router();
const auth = require('../middlewares/auth');

router.post('/', consumeController.nuevoDato);
router.post('/consumo', auth.isAuth, consumeController.consumo);

module.exports = router;