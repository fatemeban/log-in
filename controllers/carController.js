const Brand = require("../models/brands");
const Car = require("../models/cars");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { Schema } = require("mongoose");
const APIFeatures = require("../utils/apiFeatures");

console.log(Brand);
///brand.find()
//url picture

//send brand.id

//find by brand.id

// Handler to get all brands
exports.getAllBrands = catchAsync(async (req, res, next) => {
  // const brands = await Brand.findAll();
  const features = new APIFeatures(Brand.find(), req.query).filter();
  const brands = await features.query;

  if (!brands) {
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
