// const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { name, email, user } = req.user;
  res.json({
    status: "success",
    code: 200,
    user: {
      name,
      email,
      user,
    },
  });
};

module.exports = getCurrent;
