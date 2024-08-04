const kavenegar = require("kavenegar");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const api = kavenegar.KavenegarApi({
  apikey: process.env.KAVENEGAR_API_KEY,
});

const sendVerificationCode = (mobileNumber, verificationCode) => {
  return new Promise((resolve, reject) => {
    api.Send(
      {
        message: `Your verification code is: ${verificationCode}`,
        sender: "1000596446",
        receptor: mobileNumber,
      },
      (response, status) => {
        if (status === 200) {
          resolve(response);
        } else {
          console.log(response);
          reject(new Error("Failed to send verification code"));
        }
      }
    );
  });
};

module.exports = { sendVerificationCode };
