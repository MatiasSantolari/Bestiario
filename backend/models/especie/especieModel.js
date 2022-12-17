const mongoose = require('mongoose');

const especieSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    detalle: {
        type: String,
        require: true
    },
    monstruos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'monstruos', required:true}]
})

module.exports = mongoose.model('especies',especieSchema);
