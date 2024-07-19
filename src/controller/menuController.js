const Menu = require('../models/menu');
const fs = require('node:fs');
const path = require('path');

function saveImage(file) {
    const uploadsDir = path.join(__dirname, '../../public/menu'); 
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
exports.createMenu = async (req, res) => {
    try {
        const { plato, precio, piezas } = req.body;
        const foto = req.file ? req.file.path : null;

        const nuevoMenu = new Menu({
            plato,
            precio,
            piezas,
            foto,
        });

        await nuevoMenu.save();
        console.log(req.file);
        saveImage(req.file);
        res.status(201).json(nuevoMenu);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({ error: "Plato no encontrado" });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMenuById = async (req, res) => {
    try {
        const { plato, precio, piezas } = req.body;
        let foto = null;

        if (req.file) {
            foto = req.file.path;
            saveImage(req.file);
        }

        const updatedData = {
            plato,
            precio,
            piezas,
        };

        if (foto) {
            updatedData.foto = foto;
        }

        const menu = await Menu.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!menu) {
            return res.status(404).json({ error: "Plato no encontrado" });
        }

        res.status(200).json(menu);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMenuById = async (req, res) => {
    try {
        const menu = await Menu.findOneAndDelete({ _id: req.params.id });
        if (!menu) {
            return res.status(404).json({ error: "Plato no encontrado" });
        }

        // Obtener la ruta de la foto del menú a eliminar
        const fotoPath = menu.foto;

        // Si existe la foto asociada al menú, eliminarla del sistema de archivos
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
