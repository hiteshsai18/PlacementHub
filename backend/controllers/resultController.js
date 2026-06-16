const Result =
  require("../models/Result");

const createResult =
  async (req, res) => {
    try {
      const {
        score,
        totalQuestions,
      } = req.body;

      const result =
        await Result.create({
          user: req.user._id,
          score,
          totalQuestions,
        });

      res.status(201).json(
        result
      );

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

const getResults =
  async (req, res) => {
    try {
      const results =
        await Result.find({
          user: req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.json(results);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

const getAnalytics =
  async (req, res) => {
    try {
      const results =
        await Result.find({
          user: req.user._id,
        }).sort({
          createdAt: 1,
        });

      const testsTaken =
        results.length;

      const bestScore =
        testsTaken > 0
          ? Math.max(
              ...results.map(
                (r) => r.score
              )
            )
          : 0;

      const latestScore =
        testsTaken > 0
          ? results[
              results.length - 1
            ].score
          : 0;

      const averageScore =
        testsTaken > 0
          ? (
              results.reduce(
                (
                  sum,
                  result
                ) =>
                  sum +
                  result.score,
                0
              ) / testsTaken
            ).toFixed(2)
          : 0;

      res.json({
        testsTaken,
        bestScore,
        latestScore,
        averageScore,
        chartData:
          results.map(
            (
              result,
              index
            ) => ({
              test:
                index + 1,
              score:
                result.score,
            })
          ),
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  createResult,
  getResults,
  getAnalytics,
};