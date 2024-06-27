const { Schema, model } = require('mongoose');
const AutoIncrement = require("mongoose-sequence")(require("mongoose"));

const MenuSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
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

MenuSchema.plugin(AutoIncrement, { id: 'menu_seq', inc_field: 'id' });

module.exports = model('Menu', MenuSchema);
