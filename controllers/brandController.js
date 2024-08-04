// controllers/brandController.js
const Brand = require("../models/brands");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Create a new brand
exports.createBrand = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new AppError("Brand name is required", 400));
  }

  const newBrand = await Brand.create({ name });
  res.status(201).json({
    status: "success",
    data: {
      brand: newBrand,
    },
  });
});

// Get all brands
exports.getAllBrands = catchAsync(async (req, res, next) => {
  const brands = await Brand.find();
  res.status(200).json({
    status: "success",
    results: brands.length,
    data: {
      brands,
    },
  });
});

// Get a single brand by ID
exports.getBrandById = catchAsync(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    return next(new AppError("No brand found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      brand,
    },
  });
});

// Update a brand
exports.updateBrand = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return next(new AppError("Brand name is required", 400));
  }

  const updatedBrand = await Brand.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true, runValidators: true }
  );

  if (!updatedBrand) {
    return next(new AppError("No brand found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      brand: updatedBrand,
    },
  });
});

// Delete a brand
exports.deleteBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);

  if (!brand) {
    return next(new AppError("No brand found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
