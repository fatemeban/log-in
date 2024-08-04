const jwt = require("jsonwebtoken");
const User = require("../models/user");
const request = require("request");
const dotenv = require("dotenv");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

dotenv.config();

exports.requestCode = catchAsync(async (req, res, next) => {
  const { mobileNumber } = req.body;
  if (!mobileNumber) {
    return next(new AppError("Mobile number is required", 400));
  }

  let user = await User.findOne({ mobileNumber });
  if (!user) {
    user = new User({ mobileNumber });
  }
  const verificationCode = Math.floor(1000 + Math.random() * 9999).toString();
  user.verificationCode = verificationCode;

  await user.save();

  const apiKey = process.env.KAVENEGAR_API_KEY;
  const sUrl = `https://api.kavenegar.com/v1/${apiKey}/verify/lookup.json`;
  console.log(sUrl); /////test

  request.post(
    sUrl,
    {
      form: {
        receptor: mobileNumber,
        token: verificationCode,
        template: "verificodeaseman",
      },
    },
    (err, response, body) => {
      if (err) {
        console.log("ERROR WHEN CALLING SMS API", err);
        return next(new AppError("Error sending SMS", 500));
      }
      if (response.statusCode !== 200) {
        console.error("Unexpected response status:", response.statusCode);
        return next(new AppError("Error sending SMS", 500));
      }
      console.log(body);
      res.status(200).json({ message: "Verification code sent" });
    }
  );
});

exports.verifyCode = catchAsync(async (req, res, next) => {
  const { mobileNumber, verificationCode } = req.body;
  if (!mobileNumber || !verificationCode) {
    return next(
      new AppError("Mobile number and verification code are required", 400)
    );
  }

  const user = await User.findOne({ mobileNumber, verificationCode });

  if (!user) {
    return next(new AppError("Invalid verification code", 400));
  }

  if (user.verificationCode !== verificationCode) {
    return next(new AppError("Invalid verification code", 400));
  }
  ///////return error if the verification code is not valid

  user.verified = true;
  user.verificationCode = undefined;
  await user.save();

  const token = jwt.sign({ mobileNumber }, process.env.JWT_SECRET, {});

  res.status(200).json({ message: "User verified successfully", token });
});
