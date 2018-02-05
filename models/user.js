const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    nombre: String,
    apellidos: String,
    password: {type: String, select: false},
    num_personas: Number,
    direccion: String,
    limite_consumo: Number,
    isadmin: Boolean
});

userSchema.pre('save', function (next) {

    let user = this;

    bcrypt.genSalt(10, (err, salt) => {

        if (err) return next();

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next();

            user.password = hash;
            next();
        });
    })
});

module.exports = mongoose.model('User', userSchema);