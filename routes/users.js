const express = require('express');
const userController = require('../controllers/users');
const auth = require('../middlewares/auth');
let router = express.Router();

router.post('/register', userController.registroUsuario);
router.post('/login', userController.signIn);
router.put('/config', auth.isAuth, userController.cambiarConfig);
router.get('/user', auth.isAuth, userController.getUser);


module.exports = router;
