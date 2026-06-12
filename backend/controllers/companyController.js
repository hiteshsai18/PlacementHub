const Company = require("../models/Company");

const getCompanies = async (req, res) => {
  try {
    const companies =
      await Company.find();

    res.json(companies);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCompanyById = async (
  req,
  res
) => {
  try {
    const company =
      await Company.findById(
        req.params.id
      );

    if (!company) {
      return res.status(404).json({
        message:
          "Company not found",
      });
    }

    res.json(company);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCompanies,
  getCompanyById,
};