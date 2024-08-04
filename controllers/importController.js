const Brand = require("../models/brand");
const Car = require("../models/car");
const axios = require("axios");


/////Import brands from an external API//////////
exports.importBrands = async (req, res) => {
  try {
    // Fetch data from external API
    const response = await axios.get(
      "https://external-database-api.com/brands"
    );
    const brands = response.data;

    // Insert data into MongoDB
    await Brand.insertMany(brands);

    res.status(200).json({
      status: "success",
      message: "Brands imported successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

///////Import cars from an external API
exports.importCars = async (req, res) => {
  try {
    // Fetch data from external API
    const response = await axios.get("https://external-database-api.com/cars");
    const cars = response.data;

    // Insert data into MongoDB
    await Car.insertMany(cars);

    res.status(200).json({
      status: "success",
      message: "Cars imported successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
