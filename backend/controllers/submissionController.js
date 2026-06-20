const Submission =
  require(
    "../models/Submission"
  );

const createSubmission =
  async (req, res) => {
    try {
      const {
        challengeId,
        code,
        status,
      } = req.body;

      const submission =
        await Submission.create(
          {
            user:
              req.user._id,
            challenge:
              challengeId,
            code,
            status,
          }
        );

      res.status(201).json(
        submission
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getMySubmissions =
  async (req, res) => {
    try {
      const submissions =
        await Submission.find({
          user:
            req.user._id,
        })
          .populate(
            "challenge",
            "title difficulty"
          )
          .sort({
            createdAt: -1,
          });

      res.json(
        submissions
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  createSubmission,
  getMySubmissions,
};