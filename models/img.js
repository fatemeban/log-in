const mongoose = require("mongoose");

const imgScheme = new mongoose.Schema({
  id: {
    type: string,
  },
  parend_id: {
    type: String,
  },
  type: {
    type: String,
  },
  level: {
    type: string,
  },
  name: {
    type: String,
  },
  connect: {
    type: string,
  },

  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});
