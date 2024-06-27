const Usuario = require('../models/user');

// Función para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    try {
        const { email, contra } = req.body;

        // Verifica si el usuario ya existe
        const existingUser = await Usuario.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        // Crea un nuevo usuario
        const nuevoUsuario = new Usuario({
            email,
            contra,
        });

        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Función para actualizar un usuario
exports.updateUserById = async (req, res) => {
    try {
        const { email, contra } = req.body;
        const updatedData = { email };

        // Si se proporciona una nueva contraseña, actualízala
        if (contra) {
            updatedData.contra = contra;
        }

        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
