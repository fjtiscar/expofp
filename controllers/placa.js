const Placa = require('../models/placa');
const Usuario = require('../models/user');
const mongoose = require('mongoose');


module.exports.nuevaPlaca = (req, res) => {

    Usuario.findOne({'_id': req.user}, (err, usuario) => {
        if (err) return res.status(500).jsonp({
                error: 500,
                mensaje: 'No existe ese usuario'
            });

        let placa = new Placa({
            id_placa: req.body.id_placa,
            user: mongoose.Types.ObjectId(usuario._id)
        });

        placa.save((err, result) => {
            if(err)
                return res.status(400).jsonp({error: 400, mensaje: 'Placa ya registrada'});

            return res.status(201).jsonp({
                id_placa: result.id_placa,
                email: usuario.email
            });
        });

    });

};

module.exports.listarPlacas = (req, res) => {

    Usuario.findOne({'_id': req.user}, (err, usuario) => {
        if (err) return res.status(500).jsonp({
            error: 500,
            mensaje: 'No existe ese usuario'
        });

        Placa.find({user: usuario}).select('id_placa -_id').exec((err, result) => {
            res.status(200).jsonp(result);
        });

    });

};