const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Usuario", UsuarioSchema);
