const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.get("/brands", authMiddleware, carController.getAllBrands);
// Route to get all cars of a selected brand
router.get("/cars/:brandId", carController.getCarsByBrand);

module.exports = router;
