const Menu = require('../models/menu');

exports.createMenu = async (req, res) => {
    try {
        const { plato, precio, piezas } = req.body;
        const nuevoMenu = new Menu({ plato, precio, piezas });
        await nuevoMenu.save();
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
        const menu = await Menu.findByIdAndUpdate(
            req.params.id,
            { plato, precio, piezas },
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
        const menu = await Menu.findByIdAndDelete(req.params.id);
        if (!menu) {
            return res.status(404).json({ error: "Plato no encontrado" });
        }
        res.status(204).json("eliminado");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
