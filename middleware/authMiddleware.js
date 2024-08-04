const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
const AppError = require("../utils/appError");

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer", "");

  if (!token) {
    return next(new AppError("No token, authorization failed", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //  const user = await User.findById(decoded._id);
    const user = await User.findOne({ mobileNumber: decoded.mobileNumber });

    if (!user) {
      return next(new AppError("User not found", 401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new AppError("Token is not valid", 401));
  }
};

module.exports = authMiddleware;
