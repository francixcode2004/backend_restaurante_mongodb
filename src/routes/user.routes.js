const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/userController');

router.post("/api/v1/login",usuarioController.loginUser);
router.post("/api/v1/register", usuarioController.register);
router.use(usuarioController.authenticate);
router.put("/api/v1/usuarios/:id", usuarioController.updateUserById);

module.exports = router;
