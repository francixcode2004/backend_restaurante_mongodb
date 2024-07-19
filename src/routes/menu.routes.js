// routes/menu.routes.js
const express = require('express');
const router = express.Router();
const menuController = require('../controller/menuController'); // Asegúrate de que esta ruta sea correcta

// Rutas para manejar los pedidos
router.post('/api/v1/ordenes', menuController.createOrder);
router.get('/api/v1/pedidos', menuController.getAllOrders);

module.exports = router;
