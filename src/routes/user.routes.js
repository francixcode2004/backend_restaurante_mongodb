const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/userController');

router.post("/api/v1/usuarios", usuarioController.registerUser);
router.put("/api/v1/usuarios/:id", usuarioController.updateUserById);

module.exports = router;
