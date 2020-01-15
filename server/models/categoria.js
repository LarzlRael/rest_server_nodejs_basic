const { model, Schema } = require('mongoose')

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId, ref: 'Usuario'
    }
});

module.exports = model('Categoria', categoriaSchema);