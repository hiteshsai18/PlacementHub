const Result =
require("../models/Result");

const createResult =
async (req, res) => {
  try {
    const {
      userName,
      score,
      totalQuestions,
    } = req.body;

    const result =
      await Result.create({
        userName,
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
      await Result.find()
        .sort({
          createdAt: -1,
        });

    res.json(results);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createResult,
  getResults,
};