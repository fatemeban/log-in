const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
const request = require("request"); // Import request module
const authMiddleware = require("../middleware/authMiddleware");

dotenv.config();

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
    const apiKey =
      "634E2F616E704968663855714B752B31636758586944637866544C384B4264485855786F62506830644D413D";
    const receptor = mobileNumber;
    const message = encodeURIComponent(`${verificationCode}این یک پیام تست`); // Persian message encoded

    const url = `https://api.kavenegar.com/v1/${apiKey}/sms/send.json?receptor=${receptor}`;
    console.log(url);

    request.post(
      url,
      {
        form: {
          receptor: mobileNumber,
          token: verificationCode,
          template: "arequest",
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

    user.verified = true;
    user.verificationCode = undefined; // Clear the verification code
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "User verified successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error verifying code", error });
  }
});

// Protected route example
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

module.exports = router;
