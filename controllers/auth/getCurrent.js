// const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { name, email, type } = req.user;
  res.json({
    status: "success",
    code: 200,
    user: {
      name,
      email,
      type,
    },
  });
};

module.exports = getCurrent;
