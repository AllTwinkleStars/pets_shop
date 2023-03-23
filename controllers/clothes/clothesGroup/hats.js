// const clothesOperations = require("../../models/clothes");
const { Cloth } = require("../../../models");
const getHats = async (req, res) => {
  // поиск своих товаров только определенному юзеру
  // const { _id, name, email } = req.admin;

  // const clothes = await Cloth.find({ owner: _id }).populate(
  //   "owner",
  //   "_id name email"
  // );
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const clothesAll = await Cloth.find({ model: "hats" });
  const hats = await Cloth.find({ model: "hats" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");

  res.json({
    status: "success",
    code: 200,
    hats,
    allElements: clothesAll.length,
  });
};

module.exports = getHats;
