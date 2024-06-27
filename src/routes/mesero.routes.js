const express = require('express');
const router = express.Router();
const meseroController = require('../controller/meseroController');
const multer = require("multer")

const upload = multer({ dest: 'public/mesero' });

router.post('/api/v1/meseros', upload.single('foto'), meseroController.createMesero);
router.get('/api/v1/meseros', meseroController.getAllMeseros);
router.get('/api/v1/meseros/:id', meseroController.getMeseroById);
router.put('/api/v1/meseros/:id', upload.single('foto'), meseroController.updateMeseroById);
router.delete('/api/v1/meseros/:id', meseroController.deleteMeseroById);

module.exports = router;
