const { Schema, model } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(require("mongoose"));

const MeseroSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
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
  },
  {
    timestamps: true,
  }
);
MeseroSchema.plugin(AutoIncrement, { id: 'mesero_seq', inc_field: 'id' });
module.exports = model("Mesero", MeseroSchema);
