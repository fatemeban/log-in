const Brand = require("../models/brands");
const Car = require("../models/cars");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Handler to get all brands
exports.getAllBrands = catchAsync(async (req, res, next) => {
  const brands = await Brand.find();

  if (!brands.length) {
    return next(new AppError("No brands found", 404));
  }

  res.status(200).json({
    status: "success",
    results: brands.length,
    data: {
      brands,
    },
  });
});

// Handler to get cars by brand
exports.getCarsByBrand = catchAsync(async (req, res, next) => {
  const { brandId } = req.params;

  if (!brandId) {
    return next(new AppError("Brand ID is required", 400));
  }

  const cars = await Car.find({ brand: brandId });

  if (!cars.length) {
    return next(new AppError("No cars found for this brand", 404));
  }

  res.status(200).json({
    status: "success",
    results: cars.length,
    data: {
      cars,
    },
  });
});
