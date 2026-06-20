const Challenge =
  require("../models/Challenge");

const Submission =
  require("../models/Submission");

const getCodingStats =
  async (req, res) => {
    try {
      const totalChallenges =
        await Challenge.countDocuments();

      const solved =
        await Submission.countDocuments({
          user:
            req.user._id,
          status:
            "Solved",
        });

      const progress =
        totalChallenges > 0
          ? (
              (solved /
                totalChallenges) *
              100
            ).toFixed(2)
          : 0;

      res.json({
        totalChallenges,
        solved,
        progress,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  getCodingStats,
};