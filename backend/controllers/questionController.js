const Question =
  require("../models/Question");

const getQuestions =
  async (req, res) => {
    try {
      const {
        category,
        difficulty,
      } = req.query;

      let filter = {};

      if (category) {
        filter.category =
          category;
      }

      if (difficulty) {
        filter.difficulty =
          difficulty;
      }

      let questions =
        await Question.find(
          filter
        );

      questions =
        questions.sort(
          () =>
            0.5 -
            Math.random()
        );

      questions =
        questions.slice(
          0,
          10
        );

      res.json(
        questions
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  getQuestions,
};