// const { User } = require("../../models");

const getCurrent = async (req, res) => {
  try {
    const { name, email, user, lastName } = req.user;
    res.json({
      status: "success",
      code: 200,
      user: {
        name,
        lastName,
        email,
        user,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Current user not found" });
  }
};

module.exports = getCurrent;
