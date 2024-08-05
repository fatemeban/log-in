const ErrorHandler = require("../utils/appError");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose Duplicate Key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire Error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

/////////////authError//////////////
if (err.name === "CastError") {
  err.message = `Invalid resource: ${err.path}`;
  err.statusCode = 400;
} else if (err.code === 11000) {
  err.message = "Duplicate field value entered";
  err.statusCode = 400;
} else if (err.name === "JsonWebTokenError") {
  err.message = "Invalid token";
  err.statusCode = 401;
} else if (err.name === "TokenExpiredError") {
  err.message = "Token expired";
  err.statusCode = 401;
}

//////////////////////

// const AppError = require("../utils/appError");

// const errorHandler = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });
// };

module.exports = ErrorHandler;
