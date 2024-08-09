const mongoose = require("mongoose");

const imgScheme = new mongoose.Schema({
  id: {
    type: String,
    default: null,
  },
  parend_id: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: null,
  },
  level: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  connect: {
    type: String,
    require: true,
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

const img = mongoose.model("img", imgScheme);
module.exports = img;