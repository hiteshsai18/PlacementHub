const Result = require("../models/Result");

const getLeaderboard = async (req, res) => {
  try {
    const results =
      await Result.find()
        .populate("user", "name");

    const scores = {};

    results.forEach((result) => {
      const name =
        result.user?.name;

      if (!name) return;

      scores[name] =
        (scores[name] || 0) +
        result.score;
    });

    const leaderboard =
      Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .map(
          ([name, score], index) => ({
            rank: index + 1,
            name,
            score,
          })
        );

    res.json(leaderboard);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getLeaderboard,
};