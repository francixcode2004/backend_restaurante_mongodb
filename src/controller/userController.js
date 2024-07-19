const Usuario = require("../models/user");
const jwt = require("jsonwebtoken");
const secretKey = "secret_key";

// Middleware de autenticación
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Token de autorización no proporcionado" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
    req.userId = decoded.id;
    next();
  });
};

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const nuevoUsuario = new Usuario({
      email,
      password,
    });
    await nuevoUsuario.save();
    const token = jwt.sign({ id: nuevoUsuario._id }, secretKey);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Función para iniciar sesión
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email, password });
    if (!usuario) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }
    if (usuario.email !== email)
      return res.status(401).json({ error: "email incorrecto" });
    if (usuario.password !== password)
      return res.status(401).json({ error: "Contraseña incorrecta" });
    const token = jwt.sign({ id: usuario._id }, secretKey);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Función para actualizar un usuario
exports.updateUserById = async (req, res) => {
  try {
    const { email, password } = req.body;
    const updatedData = { email };
    if (password) {
      updatedData.password = password;
    }

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const token = jwt.sign({ id: usuario._id }, secretKey);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
