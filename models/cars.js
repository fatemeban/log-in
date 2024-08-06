const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  brand_id: {
    type: Number,
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
  created_at: {
    type: Date,
    default: null,
  },
  updated_at: {
    type: Date,
    default: null,
  },
});

// carSchema
//   .save()
//   .then(() => {
//     console.log(Car);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// carSchema.virtual("formattedTitle").get(function () {
//   return `${this.main_title} - ${this.title}`;
// });

// carSchema.set("toJSON", { virtuals: true });
// carSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Car", carSchema);
