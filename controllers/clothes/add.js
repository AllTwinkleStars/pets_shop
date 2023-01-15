const clothesOperations = require("../../models/clothes");

const add = async (req, res) => {
  const result = await clothesOperations.addClothes(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result },
  });
};
module.exports = add;
