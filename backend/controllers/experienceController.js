const Experience =
  require("../models/Experience");

const getExperiences =
  async (req, res) => {
    try {
      const experiences =
        await Experience.find({
          user: req.user._id,
        })
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.json(experiences);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

const createExperience =
  async (req, res) => {
    try {
      const {
        company,
        content,
      } = req.body;

      const experience =
        await Experience.create({
          user: req.user._id,
          company,
          content,
        });

      res.status(201).json(
        experience
      );

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  getExperiences,
  createExperience,
};