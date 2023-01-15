const clothesOperations = require("../../models/clothes");

const getAll = async (req, res) => {
  const clothes = await clothesOperations.listClothes();
  res.json({
    status: "success",
    code: 200,
    data: { result: clothes },
  });
};

module.exports = getAll;
