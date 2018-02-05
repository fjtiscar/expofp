const Consumo = require('../models/consume');
const Usuario = require('../models/user');
const Placa = require('../models/placa');
const mongoose = require('mongoose');
const Moment = require('moment');

// POST Nuevo dato de consumo
module.exports.nuevoDato = (req, res) => {

    Placa.findOne({id_placa: req.body.id_placa}, (err, placa) => {
        if (err) return res.status(404).jsonp({error: 404, mensaje: 'No existe una Placa con ese UUID'});

    let dato = new Consumo({
        id_placa: mongoose.Types.ObjectId(placa._id),
        consumo: req.body.consumo,
        fecha_Fin: Moment(),
        fecha_Inicio: Moment().subtract(req.body.segundos, 'seconds')
    });
    dato.save((err, result) => {
        if(err)
            return res.status(500).jsonp({error: 500, mensaje: `${err.mensaje}`});

        return res.status(201).jsonp({
            consumo: result.consumo
        });
    });
    });
};

module.exports.consumo = (req, res) => {

    Placa.findOne({id_placa: req.body.id_placa}, (err, placa) => {
        if (err) return res.status(404).jsonp({error: 404, mensaje: 'No existe una Placa con ese UUID'});

        Consumo.find({id_placa: placa}).select('consumo fecha_Inicio fecha_Fin -_id').exec((err, consumo) => {
            if (err) return res.status(500).jsonp({
                error: 500,
                mensaje: `${err.message}`
            });
            res.status(200).jsonp(consumo);
        });
    });

};