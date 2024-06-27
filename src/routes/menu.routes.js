const express = require('express');
const router = express.Router();
const menuController = require('../controller/menuController');
const multer = require('multer');

const upload = multer({ dest: 'public/menu' });
router.post("/api/v1/menus", upload.single('foto'), menuController.createMenu);
router.get("/api/v1/menus", menuController.getAllMenus);
router.get("/api/v1/menus/:id", menuController.getMenuById);
router.put("/api/v1/menus/:id", upload.single('foto'), menuController.updateMenuById);
router.delete("/api/v1/menus/:id", menuController.deleteMenuById);

module.exports = router;
