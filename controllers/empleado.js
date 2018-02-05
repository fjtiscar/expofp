const Empleado = require('../models/empleado');
const crypto = require('crypto-random-string');
const User = require('../models/user');

//POST Nuevo empleado
module.exports.nuevoEmpleado = (req, res) => {

    User.findOne({'_id': req.user}, (err, usuario) => {
        if(err){return res.status(500).jsonp({
                    error: 500,
                    mensaje: 'No existe ese usuario'});
        }

        let empleado = new Empleado({
            email: req.body.email,
            tag: crypto(15)
        });

        if(usuario.isadmin){
            empleado.save((err, result) => {
                if(err)
                    return res.status(500).jsonp({error: 500, mensaje: `${err.mensaje}`});

                return res.status(201).jsonp({
                    email: result.email,
                    tag: result.tag
                });
            });
        } else{
            res.sendStatus(403);
        }

    });
};


//POST Nuevo tag empleado
module.exports.nuevoTag = (req, res) => {
    User.findOne({'_id': req.user}, (err, usuario) => {
        if (err) {
            return res.status(500).jsonp({
                error: 500,
                mensaje: 'No existe ese usuario'
            });
        }
    Empleado.findOne({email: req.body.email}, (err, empleado) => {
        if (err) {
            return res.status(500).jsonp({
                error: 500,
                mensaje: 'No existe ese empleado'
            });
        }

        if(usuario.isadmin) {
            empleado.tag = crypto(15);
            empleado.save((err, result) => {
                if(err)
                    return res.status(500).jsonp({error: 500, mensaje: `${err.mensaje}`});

                return res.status(201).jsonp({
                    tag: result.tag
                });
            });
        } else{
            res.sendStatus(403);
        }

    });
    });
};

//POST Listar empleados
module.exports.listaEmpleados = (req, res) => {

    User.findOne({'_id': req.user}, (err, usuario) => {
        if (err) {
            return res.status(500).jsonp({
                error: 500,
                mensaje: 'No existe ese usuario'
            });
        }
        if(usuario.isadmin) {
            Empleado.find().select('-_id email tag').exec((err, empleados) => {
                if (err) return res.status(500).jsonp({
                    error: 500,
                    mensaje: `${err.message}`
                });
                res.status(200).jsonp(empleados);
            });
        } else{
            res.sendStatus(403);
        }
    });
};



//GET Comprobar autorización de usuario
module.exports.autorizacion = (req, res) => {
    Empleado.findOne({tag: req.params.tag}, (err, empleado) => {
       if(err)
           return res.status(403);
       res.status(200).jsonp({
           email: empleado.email
       })
    });
};