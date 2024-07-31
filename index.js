const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRouter");
const path = require("path");

dotenv.config();
//connestDB();

const app = express();
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));

////////Routes///////////
app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const PORT = process.env.POPRT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
