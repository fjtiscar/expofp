const bcrypt = require('bcrypt-nodejs');
const service = require('../services');
const User = require('../models/user');

// POST Nuevo usuario
module.exports.registroUsuario = (req, res) => {

    let user = new User({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: req.body.password,
        direccion: req.body.direccion,
        num_personas: req.body.num_personas,
        limite_consumo: req.body.limite_consumo,
        isadmin: false
    });

    user.save((err, result) => {
        if (err)
            return res
                .status(400)
                .jsonp({
                    error: 400,
                    mensaje: `${err.message}`
                });

        return res.status(201).jsonp({
            token: service.createToken(user),
            email: result.email,
            nombre: result.nombre
        });

    });

};

// POST Login
module.exports.signIn = (req, res) => {

    User
        .findOne({email: req.body.email})
        .select('_id email +password nombre apellidos direccion num_personas limite_consumo')
        .exec((err, user) => {

            if (err) return res.status(401).jsonp({error: 401, mensaje: 'Error en la autenticación'});
            if (!user) return res.status(404).jsonp({error: 404, mensaje: 'No existe el usuario'});

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) return res.status(401).jsonp({error: 401, mensaje: 'Error en la autenticación'});
                if (!result)
                    return res.status(401).jsonp({error: 401, mensaje: 'Error en la autenticación'});
                else {
                    req.user = user;
                    res.status(200).jsonp({
                        token: service.createToken(user),
                        nombre: user.nombre,
                        email: user.email,
                        apellidos: user.apellidos,
                        direccion: user.direccion,
                        limite_consumo: user.limite_consumo,
                        num_personas: user.num_personas
                    });
                }
            });
        });
};

// PUT Cambiar configuración
module.exports.cambiarConfig = (req, res) => {

    User.findOne({'_id': req.user}, (err, usuario) => {
        if(err){
            return res
                .status(500)
                .jsonp({
                    error: 500,
                    mensaje: 'No existe ese usuario'
                });
        }
        if(req.body.num_personas)
            usuario.num_personas = req.body.num_personas;
        if(req.body.direccion)
            usuario.direccion = req.body.direccion;
        if(req.body.limite_consumo)
            usuario.limite_consumo = req.body.limite_consumo;
        if(req.body.password)
            usuario.password = req.body.password;

        usuario.save((err) => {
          if (err)
              return res.status(500).jsonp({
                  error: 500,
                  mensaje: `${err.message}`
              });
          res.status(200).jsonp({
              direccion: usuario.direccion,
              num_personas: usuario.num_personas,
              limite_consumo: usuario.limite_consumo
        });
        })
    });
};

// GET User
module.exports.getUser = (req, res) =>  {
    User.findOne({'_id': req.user}, (err, usuario) => {
        if (err)
            return res.status(500).jsonp({
                    error: 500,
                    mensaje: 'No existe ese usuario'
                });
        res.status(200).jsonp({
            email: usuario.email,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            direccion: usuario.direccion,
            num_personas: usuario.num_personas,
            limite_consumo: usuario.limite_consumo
        })
    });
};
