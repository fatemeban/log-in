const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const uploadDir = path.join(__dirname, "../public/img/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/uploads/"); // Set the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname); // Set the file name
  },
});

const upload = multer({ storage: storage });

router.use(authMiddleware); // Ensure the user is authenticated for all routes

router.patch("/updateMe", upload.single("photo"), userController.updateMe);
router.get("/protected", userController.getProtected);

module.exports = router;
