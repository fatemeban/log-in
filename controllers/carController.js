const Brand = require("../models/brands");
const Car = require("../models/cars");
const Img = require("../models/img");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

//console.log(Brand);
///brand.find()
//url picture

//send brand.id

//find by brand.id

// Handler to get all brands

exports.getAllBrandsimg = catchAsync(async (req, res, next) => {
  // const brands = await Brand.findAll();
  const features = new APIFeatures(Brand.find(), req.query).filter();
  const brands = await features.query;
  try {
    const imgs = await Img.find().select("connect").exec();
    const connectValues = imgs.map((img) => img.connect);
    const features = new APIFeatures(
      Brand.find({ connect: { $in: connectValues } }),
      req.query
    ).filter();
    const brands = await features.query;

    if (img.connecte === Brand.connecte)
      res.status(200).json({
        status: "success",
        results: brands.length,
        data: {
          brands,
        },
      });
  } catch (err) {
    next(err); // Pass the error to the global error handler
  }
});

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
  const { brandsId } = req.params;

  // if (!brandId) {
  //   return next(new AppError("Brand ID is required", 400));
  // }
  if (!brandsId) {
    return next(new AppError("No brands found", 404));
  }
  const brand = await Brand.findById({ id: brandsId });

  if (!brand) {
    return next(new AppError("No brands found with this Id", 404));
  }

  // const cars = await Car.find({ brand: brandId });
  const cars = await Car.find({ brand_id: brandsId });

  if (cars.length === 0) {
    return next(new AppError("No cars found for this brand", 404));
  }

  res.status(200).json({
    status: "success",
    results: cars.length,
    data: {
      cars,
    },
  });

  exports.getCars = catchAsync(async (req, res, next) => {
    const cars = await Car.find();

    if (cars.length === 0) {
      return next(new AppError("No cars found", 404));
    }

    res.status(200).json({
      status: "success",
      results: cars.length,
      data: {
        cars,
      },
    });
  });
  // exports.updateCar = catchAsync(async (req, res, next) => {
  //   const { id } = req.params;
  //   const {
  //     title,
  //     description,
  //     keyword,
  //     goftino,
  //     connect,
  //     image_name,
  //   }
  // })
});
