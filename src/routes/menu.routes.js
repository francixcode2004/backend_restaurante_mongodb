const express = require('express');
const router = express.Router();
const menuController = require('../controller/menuController');

router.post("/api/v1/menus", menuController.createMenu);
router.get("/api/v1/menus", menuController.getAllMenus);
router.get("/api/v1/menus/:id", menuController.getMenuById);
router.put("/api/v1/menus/:id", menuController.updateMenuById);
router.delete("/api/v1/menus/:id", menuController.deleteMenuById);

module.exports = router;
