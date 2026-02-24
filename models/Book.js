const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: [true, "Please provide book title"],
      maxlength: 50,
    },
    genre: {
      type: String,
      required: [true, "Please provide genre"],
      maxlength: 100,
    },
    author: {
      type: String,
      required: [true, "Please provide book author"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: "Rating must be a whole number",
      },
    },
    review: {
      type: String,
      maxlength: 800,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", BookSchema);
