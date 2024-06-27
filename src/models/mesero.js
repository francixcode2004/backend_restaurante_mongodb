const { Schema, model } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(require("mongoose"));

const MeseroSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        nombre: {
            type: String,
            required: true,
        },
        apellido: {
            type: String,
            required: true,
        },
        edad: {
            type: Number,
            required: true,
        },
        calificacion: {
            type: Number,
        },
        foto:{
            type: String
        }
    },
    {
        timestamps: true,
    }
);
MeseroSchema.plugin(AutoIncrement, { id: 'mesero_seq', inc_field: 'id' });
module.exports = model("Mesero", MeseroSchema);

