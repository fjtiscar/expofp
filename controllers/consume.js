const Consumo = require('../models/consume');
const Usuario = require('../models/user');
const Placa = require('../models/placa');
const mongoose = require('mongoose');
const Moment = require('moment');

// POST Nuevo dato de consumo
module.exports.nuevoDato = (req, res) => {

    Placa.findOne({id_placa: req.body.id_placa}, (err, placa) => {
        if (err) return res.sendStatus(500);

        if (!placa) {
            res.status(404).jsonp({error: 404, mensaje: 'No existe una Placa con ese UUID'});
        } else {
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

        }

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

module.exports.consumoHoy = (req, res) => {

    Placa.findOne({id_placa: req.body.id_placa}, (err, placa) => {
        if (err) return res.status(404).jsonp({error: 404, mensaje: 'No existe una Placa con ese UUID'});

        /*let ahora = new Date();
        console.log("Now " + ahora);
        console.log(ahora.getYear() + " : " + ahora.getMonth() + " : " + ahora.getDate());
        let start_date = new Date(ahora.getYear(), ahora.getMonth(), ahora.getDate(), 0, 0, 0, 0);
        console.log(start_date);
        let end_date = new Date();
        end_date.setDate(start_date.getTime () + 1 * 86400000);*/

        let start_date = Moment().startOf('day');
        let end_date = Moment().add(1, 'd');
        //let start_date = ahora.

        Consumo
            .find({id_placa: placa})
            .select('consumo fecha_Inicio fecha_Fin -_id')
            .where('fecha_Inicio').gte(start_date)
            .where('fecha_Inicio').lt(end_date)
            .exec((err, consumo) => {
            if (err) return res.status(500).jsonp({
                error: 500,
                mensaje: `${err.message}`
            });
            res.status(200).jsonp(consumo);
        });
    });

};

module.exports.consumoDia = (req, res) => {

    if (!req.params.fecha) {
        return res.sendStatus(400);
    }

    Placa.findOne({id_placa: req.body.id_placa}, (err, placa) => {
        if (err) return res.status(404).jsonp({error: 404, mensaje: 'No existe una Placa con ese UUID'});

        /*let ahora = new Date();
        console.log("Now " + ahora);
        console.log(ahora.getYear() + " : " + ahora.getMonth() + " : " + ahora.getDate());
        let start_date = new Date(ahora.getYear(), ahora.getMonth(), ahora.getDate(), 0, 0, 0, 0);
        console.log(start_date);
        let end_date = new Date();
        end_date.setDate(start_date.getTime () + 1 * 86400000);*/

        let start_date = Moment(req.params.fecha).startOf('day');
        let end_date = Moment(req.params.fecha).add(1, 'd');
        //let start_date = ahora.

        Consumo
            .find({id_placa: placa})
            .select('consumo fecha_Inicio fecha_Fin -_id')
            .where('fecha_Inicio').gte(start_date)
            .where('fecha_Inicio').lt(end_date)
            .exec((err, consumo) => {
                if (err) return res.status(500).jsonp({
                    error: 500,
                    mensaje: `${err.message}`
                });
                res.status(200).jsonp(consumo);
            });
    });

};
