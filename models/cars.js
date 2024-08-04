const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    supplier: { type: Schema.Types.ObjectId, ref: "user", required: true }, // Reference to the Brand model
    main_title: { type: String, required: true },
    title: { type: String, required: true },
    title_link: { type: String, required: true },
    smalldescription: { type: String, default: null }, // Mongoose uses String for text data
    description: { type: String, default: null },
    keyword: { type: String, required: true },
    goftino: { type: String, default: null },
    connect: { type: String, required: true },
    image_url: { type: String, default: null },
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
  },
  { timestamps: true }
);

// carSchema.virtual("formattedTitle").get(function () {
//   return `${this.main_title} - ${this.title}`;
// });

// carSchema.set("toJSON", { virtuals: true });
// carSchema.set("toObject", { virtuals: true });

// Optionally, you can add custom methods to the schema or use pre-save hooks here

const Car = new carSchema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  main_title: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  title_link: {
    type: String,
    required: true,
  },
  smalldescription: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  keyword: {
    type: String,
    required: true,
  },
  goftino: {
    type: String,
    default: null,
  },
  connect: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    default: null,
  },
});

Car.save()
  .then(() => {
    console.log(Car);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = mongoose.model("Car", carSchema);
