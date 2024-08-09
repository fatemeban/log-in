const Brand = require("../models/brands");
const Car = require("../models/cars");
const Img = require("../models/img");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllBrands = catchAsync(async (req, res, next) => {
  const brands = await Brand.find();

  // Step 2: Find all images and create a map for quick lookup
  const images = await Img.find();
  console.log(images);

  const imageMap = images.reduce((map, image) => {
    if (image.level === "main") {
      map[image.connect] = image.name;
    }
    return map;
  }, {});

  // Step 3: Add image name to each brand
  const brandsWithImages = brands.map((brand) => ({
    ...brand.toObject(),
    imageName: imageMap[brand.connect] || null,
  }));
  res.json(brandsWithImages);
});

// Handler to get cars by brand
exports.getCarsByBrand = catchAsync(async (req, res, next) => {
  const brandsId = req.params.id;

  // const cars = await Car.find({ brand: brandId });
  const cars = await Car.find({ brand_id: brandsId });

  if (cars.length === 0) {
    return next(new AppError("No cars found for this brand", 404));
  }
  const images = await Img.find();

  /////////
  const imageMap = images.reduce((map, image) => {
    if (image.level === "main") {
      map[image.connect] = image.name;
    }
    return map;
  }, {});

  // Step 3: Add image name to each brand
  const CarsWithImages = cars.map((car) => ({
    ...car.toObject(),
    imageName: imageMap[car.connect] || null,
  }));

  res.status(200).json({
    status: "success",
    results: CarsWithImages.length,
    data: {
      CarsWithImages,
    },
  });
});
