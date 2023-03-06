const { Schema, model} = require('mongoose');

const SucursalSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre de la sucursal es obligatorio'],
        unique: true,
    },
    municipio: {
        type: String,
        required: [true, 'El municipio es obligatorio'],
        unique: true,
    },
    direccion: {
        type: String,
        required: [true, 'la direccion es obligatorio'],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true
    },
})

module.exports = model('Sucursal', SucursalSchema);