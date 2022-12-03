const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  categoryId: { type: mongoose.Types.ObjectId },
});

module.exports = mongoose.model("Item", itemSchema);
