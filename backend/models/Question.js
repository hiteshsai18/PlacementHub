const mongoose = require("mongoose");

const questionSchema =
  new mongoose.Schema(
    {
      question: {
        type: String,
        required: true,
      },

      options: {
        type: [String],
        required: true,
      },

      answer: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        enum: [
          "Quantitative",
          "Reasoning",
          "Verbal",
        ],
        required: true,
      },

      difficulty: {
        type: String,
        enum: [
          "Easy",
          "Medium",
          "Hard",
        ],
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Question",
  questionSchema
);