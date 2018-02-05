const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consumo = new Schema({
    id_placa: {type: Schema.ObjectId, ref: 'Placa'},
    consumo: Number,
    segundos:   Number,
    fecha_Inicio: {type: Date},
    fecha_Fin: {type: Date}
});

module.exports = mongoose.model('Consume', consumo);