const User = require("../models/User");
const Company = require("../models/Company");
const Challenge = require("../models/Challenge");
const Question = require("../models/Question");
const Experience = require("../models/Experience");

const getDashboard =
  async (req, res) => {
    try {
      const users =
        await User.countDocuments();

      const companies =
        await Company.countDocuments();

      const challenges =
        await Challenge.countDocuments();

      const questions =
        await Question.countDocuments();

      const experiences =
        await Experience.countDocuments();

      res.json({
        users,
        companies,
        challenges,
        questions,
        experiences,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  getDashboard,
};