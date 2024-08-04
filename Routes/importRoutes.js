const express = require("express");
const router = express.Router();
const importController = require("../controllers/importController");


router.post("/import-brands", importController.importBrands);

router.post("/import-cars", importController.importCars);

module.exports = router;
