const Mesero = require("../models/mesero");
const fs = require('fs');
const path = require('path');

function saveImage(file) {
    const uploadsDir = path.join(__dirname, '../../public/mesero'); // Ruta completa a 'public/menu'

    // Verificar si existe el directorio de uploads, si no, crearlo de manera recursiva
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Construir la ruta completa para el nuevo archivo
    const newPath = path.join(uploadsDir, file.originalname);

    // Mover el archivo subido al nuevo directorio y renombrarlo si es necesario
    fs.renameSync(file.path, newPath);

    // Devolver la ruta completa del archivo guardado (opcional)
    console.log("la ruta es ",newPath);
}
exports.createMesero = async (req, res) => {
    try {
        const { nombre, apellido, edad, calificacion } = req.body;
        const foto = req.file ? req.file.path : null;

        const nuevoMesero = new Mesero({
            nombre,
            apellido,
            edad,
            calificacion,
            foto,
        });

        await nuevoMesero.save();
        saveImage(req.file);
        res.status(201).json(nuevoMesero);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllMeseros = async (req, res) => {
    try {
        const meseros = await Mesero.find();
        res.status(200).json(meseros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMeseroById = async (req, res) => {
    try {
        const mesero = await Mesero.findById(req.params.id);
        if (!mesero) {
            return res.status(404).json({ error: "Mesero no encontrado" });
        }
        res.status(200).json(mesero);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMeseroById = async (req, res) => {
    try {
        const { nombre, apellido, edad, calificacion } = req.body;
        let foto = null;

        if (req.file) {
            foto = req.file.path;
            saveImage(req.file);
        }


        const updatedData = {
            nombre,
            apellido,
            edad,
            calificacion,
        };

        if (foto) {
            updatedData.foto = foto;
        }

        const mesero = await Mesero.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!mesero) {
            return res.status(404).json({ error: "Mesero no encontrado" });
        }

        res.status(200).json(mesero);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMeseroById = async (req, res) => {
    try {
        const mesero = await Mesero.findOneAndDelete({ _id: req.params.id });
        if (!mesero) {
            return res.status(404).json({ error: "Mesero no encontrado" });
        }

        // Obtener la ruta de la foto del mesero a eliminar
        const fotoPath = mesero.foto;

        // Si existe la foto asociada al mesero, eliminarla del sistema de archivos
        if (fotoPath) {
            // Construir la ruta completa hacia la foto
            const filePath = path.join(__dirname, `../../${fotoPath}`);

            // Verificar si el archivo existe y eliminarlo
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        res.status(204).json("Eliminado correctamente");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
