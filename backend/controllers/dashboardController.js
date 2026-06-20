const Result = require("../models/Result");
const Experience = require("../models/Experience");

const getDashboardStats =
  async (req, res) => {
    try {
      const results =
        await Result.find({
          user: req.user._id,
        });

      const experiences =
        await Experience.find({
          user: req.user._id,
        });

      const testsTaken =
        results.length;

      const bestScore =
        testsTaken > 0
          ? Math.max(
              ...results.map(
                (result) =>
                  result.score
              )
            )
          : 0;

      const averageScore =
        testsTaken > 0
          ? (
              results.reduce(
                (
                  total,
                  result
                ) =>
                  total +
                  result.score,
                0
              ) / testsTaken
            ).toFixed(2)
          : 0;

      res.json({
        name: req.user.name,
        testsTaken,
        bestScore,
        averageScore,
        experiencesShared:
          experiences.length,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  getDashboardStats,
};