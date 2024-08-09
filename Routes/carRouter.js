const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");
const authMiddleware = require("../middleware/authMiddleware");
//const userController = require("../controllers/userController");

router.get("/brands", authMiddleware, carController.getAllBrands);
// Route to get all cars of a selected brand
router.get("/carsbybrandId/:id", authMiddleware, carController.getCarsByBrand);
// router.get("/cars", authMiddleware, carController.getCars);
// router.patch("/cars", authMiddleware, carController.updateCar);

module.exports = router;
