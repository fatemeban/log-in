const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    //unique: true,
  },
  verificationCode: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
  storeName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  province: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  photo: { type: String, default: "default.png" },
  description: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("user", userSchema);
