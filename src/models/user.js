const { Schema, model, mongoose } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UsuarioSchema = new Schema(
    {
        id: {
            type: Number,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        contra: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

UsuarioSchema.plugin(AutoIncrement, { id: 'usuario_seq', inc_field: 'id' });

module.exports = model("Usuario", UsuarioSchema);
