const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arduinoSchema = new Schema({
    arduino_id: {type: String, unique: true},
    fecha: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Arduino', arduinoSchema);