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
    default: null,
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

module.exports = mongoose.model("img", imgScheme);
