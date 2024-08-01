const User = require("../models/user");
const catchAsync = require("../utiles/catchAsync");
const AppError = require("../utiles/appError");

// Helper function to filter out allowed fields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Update user information route, including photo upload
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.verificationCode || req.body.mobileNumber) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyNumber.",
        400
      )
    );
  }

  const filteredBody = filterObj(
    req.body,
    "name",
    "city",
    "province",
    "storeName",
    "phoneNumber",
    "description"
  );

  if (req.file) {
    filteredBody.photo = req.file.filename;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

// Example of a protected route
exports.getProtected = catchAsync(async (req, res, next) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-_id -role -verified"); // Exclude sensitive information like password

  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateNum = catchAsync(async (req, res, next) => {});
