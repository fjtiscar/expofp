const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placaSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},
    id_placa: {type: String, unique: true}
});

module.exports = mongoose.model('Placa', placaSchema);