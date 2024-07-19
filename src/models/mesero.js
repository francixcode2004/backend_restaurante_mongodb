const { Schema, model } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(require("mongoose"));

const MeseroSchema = new Schema(
    {
        
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
module.exports = model("Mesero", MeseroSchema);

