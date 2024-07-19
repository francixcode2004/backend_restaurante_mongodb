const { Schema, model } = require('mongoose');
const AutoIncrement = require("mongoose-sequence")(require("mongoose"));

const MenuSchema = new Schema({
    plato: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    piezas: {
        type: Number,
        required: true
    },
    foto:{
        type:String
    }
}, {
    timestamps: true
});

module.exports = model('Menu', MenuSchema);
