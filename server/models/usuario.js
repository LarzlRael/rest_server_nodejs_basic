const { Schema, model } = require('mongoose')
const uniqueValor = require('mongoose-unique-validator')
//importando el modulo para hacer el bcrypt
const bcrypt = require('bcrypt')
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es nesario'],
    },
    email: {
        type: String,
        required: [true, 'Es correo es necesario puerco'],
        unique: true
    },
    password: {
        type: String,
        required: [true]
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROL',
        //el enum sirve para limitar los registro que queremos poder
        enum: rolesValidos

    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

// para no mostrar el campo de la contraseña cuando devuelve la consulta
//una fomra pero no la definitiva
usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObjetcts = user.toObject();
    delete userObjetcts.password;

    return userObjetcts;
}
usuarioSchema.plugin(uniqueValor, { message: '{PATH} debe ser unico' })
module.exports = model('Usuario', usuarioSchema)