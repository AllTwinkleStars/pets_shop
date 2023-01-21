const { Admin } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.admin;
  await Admin.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = logout;
