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
  verificationCodeExpiresAt: {
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
    trim: true,
  },
  name: {
    type: String,
    //required: true,
    trim: true,
  },
  storeName: {
    type: String,
    //unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    //required: true,
    //unique: true,
    trim: true,
  },
  province: {
    type: String,
    // required: true,
    trim: true,
  },
  city: {
    type: String,
    // required: true,
    trim: true,
  },
  address: {
    type: String,
    // required: true,
    trim: true,
  },
  photo: {
    type: String,
    default: "default.png",
  },
  description: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  rate: {
    type: Number,
    default: 5,
  },
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});
userSchema.pre("save", async function (next) {
  const user = this;

  console.log("just befor savaing");

  next();
});
userSchema.virtual("profileImageUrl").get(function () {
  // Base URL for images
  const baseUrl = "http://localhost:3000/public/img/uploads/";

  // Return the complete URL
  return `${baseUrl}${this.photo}`;
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("user", userSchema);
