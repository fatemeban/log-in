const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Helper function to filter out allowed fields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  //console.log("Filtered Fields:", newObj); // Debugging line
  return newObj;
};

// Update user information route, including photo upload

exports.userInfo = catchAsync(async (req, res, next) => {
  // Define the allowed fields
  const allowedFields = [
    "name",
    "city",
    "province",
    "storeName",
    "phoneNumber",
    "description",
    "address",
    "photo",
    "cars"
  ];

  // Filter the incoming request body
  const filteredBody = filterObj(req.body, ...allowedFields);

  // Handle file upload if present
  const photo = req.file ? req.file.path : undefined;
  //console.log(req.body);

  // Add the photo path to the filtered fields if a photo was uploaded
  if (photo) {
    filteredBody.photo = photo;
  }

  // Validate if at least one field is present
  if (Object.keys(filteredBody).length === 0) {
    return next(new AppError("No valid fields to update", 400));
  }

  // Update user
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id, // Assuming user ID is stored in req.user by authMiddleware
    filteredBody,
    { new: true } // Return the updated user
  );

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
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.mobileNumber) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyNumber.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "mobileNumber",
    "verificationCode",
    "verified",
    "name",
    "storeName",
    "city",
    "province",
    "rate",
    "cars"
  );
  
  if (req.file) filteredBody.photo = req.file.filename;
  console.log(req.body.cars);

  if (req.body.cars && Array.isArray(req.body.cars)) {
    filteredBody.cars = req.body.cars;
  }

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
    returnDocument: "after",
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
exports.getProtected = catchAsync(async (req, res, next) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

exports.deleteme = catchAsync(async (req, res, next) => {
  ///verify the mobile number
  await User.findByIdAndUpdate(req.user.id), { active: false };

  res.status(200).json({
    status: "success",
    message: "user deleted!",
  });
});

exports.updateNum = catchAsync(async (req, res, next) => {});

/////////virtule////////pre/post/
