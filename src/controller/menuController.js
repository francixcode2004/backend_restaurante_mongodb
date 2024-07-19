// controller/menuController.js
const Order = require("../models/order"); // Cambia la ruta según sea necesario

exports.createOrder = async (req, res) => {
  try {
    const { email, items, total } = req.body;
    const newOrder = new Order({ email, items, total });
    await newOrder.save();
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order" });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Encuentra todos los pedidos en la base de datos
    res.status(200).json(orders); // Envía los pedidos como respuesta en formato JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Manejo de errores
  }
};
