const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const authMiddleware = require("../middleware/authMiddleware");












router.get("/brands", carController.getAllBrands);

// Route to get all cars of a selected brand
router.get("/cars/:brandId", carController.getCarsByBrand);

module.exports = router;
