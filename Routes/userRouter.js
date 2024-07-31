const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
const request = require("request");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authMiddleware = require("../middleware/authMiddleware");

dotenv.config();
const uploadDir = path.join(__dirname, "public", "img", "uploads");
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

// Handle request for verification code
router.post("/request-code", async (req, res) => {
  const { mobileNumber } = req.body;
  if (!mobileNumber) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  try {
    let user = await User.findOne({ mobileNumber });
    if (!user) {
      user = new User({ mobileNumber });
    }
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    user.verificationCode = verificationCode;

    await user.save();

    // Send verification code via SMS
    const apiKey = process.env.KAVENEGAR_API_KEY;
    const sUrl = `https://api.kavenegar.com/v1/${apiKey}/verify/lookup.json`;

    console.log(sUrl);

    request.post(
      sUrl,
      {
        form: {
          receptor: mobileNumber,
          token: verificationCode,
          template: "verificodeaseman",
        },
      },
      (err, response, body) => {
        if (err) {
          console.log("ERROR WHEN CALLING SMS API", err);
          return res.status(500).json({ message: "Error sending SMS" });
        }
        console.log(body); // Log the response body
        res.status(200).json({ message: "Verification code sent" });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

// Handle verification of code and JWT generation
router.post("/verify-code", async (req, res) => {
  const { mobileNumber, verificationCode } = req.body;
  if (!mobileNumber || !verificationCode) {
    return res
      .status(400)
      .json({ message: "Mobile number and verification code are required" });
  }

  try {
    const user = await User.findOne({ mobileNumber, verificationCode });

    if (!user) {
      return res.status(400).json({ message: "Invalid verification code" });
    }
    console.log(`Received verification code: ${verificationCode}`);
    console.log(`Stored verification code: ${user.verificationCode}`);

    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    user.verified = true;
    user.verificationCode = undefined; // Clear the verification code
    await user.save();

    const token = jwt.sign({ mobileNumber }, process.env.JWT_SECRET, {});

    res.status(200).json({ message: "User verified successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error verifying code", error });
  }
});

// Protected route example
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

// Update user information route, including photo upload
router.patch(
  "/updateMe",
  authMiddleware,
  upload.single("photo"),
  async (req, res) => {
    try {
      if (req.body.password || req.body.passwordConfirm) {
        return res.status(400).json({
          message:
            "This route is not for password updates. Please use /updateMyPassword.",
        });
      }

      const updates = { ...req.body };
      if (req.file) {
        updates.photo = req.file.filename;
      }

      const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
        new: true,
        runValidators: true,
      });

      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  }
);

module.exports = router;
