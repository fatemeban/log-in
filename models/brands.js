const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
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
    }, // Mongoose uses String for text data
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
    image_url: {
      type: String,
      default: null,
    },
  }
  //{ timestamps: true }
);

// brandSchema.virtual("fullDescription").get(function () {
//   return `${this.smalldescription || ""} ${this.description || ""}`.trim();
// });

// brandSchema.set("toJSON", { virtuals: true });
// brandSchema.set("toObject", { virtuals: true });

// Optionally, you can add a custom method to the schema or use pre-save hooks here
module.exports = mongoose.model("Brand", brandSchema);
