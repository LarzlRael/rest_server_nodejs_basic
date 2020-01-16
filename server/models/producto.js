const { model, Schema } = require('mongoose')

let productoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    precioUni: {
        type: Number, required: [true, 'el precio es unitario es nesesario']
    },
    descripcion: {
        type: String, required: false
    },
    disponible: {
        type: Boolean, required: true, default: true
    },
    categoria: {
        type: Schema.Types.ObjectId, ref: 'Categoria'
    },
    usuario: {
        type: Schema.Types.ObjectId, ref: 'Usuario'
    },
    img: {
        type: String
    }

});

module.exports = model('Productos', productoSchema);