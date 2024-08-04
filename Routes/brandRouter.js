// routes/brandRoutes.js
const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure user is authenticated if needed

// Public routes
router
  .route("/")
  .get(brandController.getAllBrands) // Get all brands
  .post(authMiddleware, brandController.createBrand); // Create a new brand

router
  .route("/:id")
  .get(brandController.getBrandById) // Get a single brand by ID
  .patch(authMiddleware, brandController.updateBrand) // Update a brand
  .delete(authMiddleware, brandController.deleteBrand); // Delete a brand

module.exports = router;
