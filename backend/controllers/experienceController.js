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

const updateExperience =
  async (req, res) => {
    try {
      const experience =
        await Experience.findOne({
          _id: req.params.id,
          user: req.user._id,
        });

      if (!experience) {
        return res.status(404).json({
          message:
            "Experience not found",
        });
      }

      experience.company =
        req.body.company ||
        experience.company;

      experience.content =
        req.body.content ||
        experience.content;

      const updated =
        await experience.save();

      res.json(updated);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

const deleteExperience =
  async (req, res) => {
    try {
      const experience =
        await Experience.findOne({
          _id: req.params.id,
          user: req.user._id,
        });

      if (!experience) {
        return res.status(404).json({
          message:
            "Experience not found",
        });
      }

      await experience.deleteOne();

      res.json({
        message:
          "Experience deleted",
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};