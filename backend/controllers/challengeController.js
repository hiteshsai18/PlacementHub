const Challenge =
  require(
    "../models/Challenge"
  );

const getChallenges =
  async (req, res) => {
    try {
      const challenges =
        await Challenge.find();

      res.json(
        challenges
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

const getChallengeById =
  async (req, res) => {
    try {
      const challenge =
        await Challenge.findById(
          req.params.id
        );

      if (!challenge) {
        return res
          .status(404)
          .json({
            message:
              "Challenge not found",
          });
      }

      res.json(
        challenge
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  getChallenges,
  getChallengeById,
};