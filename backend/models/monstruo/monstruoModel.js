const mongoose = require('mongoose');

const monstruoSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    nivelAmenaza:{
        type: String,
        require: true
    },
    estado: {
        type: String,
        require: true
    },
    detalle: {
        type: String,
        require: true
    },
    nombresAlternativos: {
        type: String,
        require: true
    },
    urlImagen:{
        type: String,
        require: false
    },
    especie: { type: mongoose.Schema.Types.ObjectId, ref: 'especies', required:true}
})

module.exports = mongoose.model('monstruos',monstruoSchema);