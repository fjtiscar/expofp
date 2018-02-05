const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadoSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    tag: String
});

module.exports = mongoose.model('Empleado', empleadoSchema);