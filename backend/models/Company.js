const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Service Based",
        "Product Based",
      ],
      required: true,
    },

    hiringProcess: {
      type: [String],
      default: [],
    },

    interviewPattern: {
      type: [String],
      default: [],
    },

    preparationTips: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Company",
  companySchema
);