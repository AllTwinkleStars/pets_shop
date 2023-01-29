// const clothesOperations = require("../../models/clothes");
const { Cloth } = require("../../models");
const getAll = async (req, res) => {
  // поиск своих товаров только определенному юзеру
  // const { _id, name, email } = req.admin;

  // const clothes = await Cloth.find({ owner: _id }).populate(
  //   "owner",
  //   "_id name email"
  // );
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const clothes = await Cloth.find({}, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const cat = clothes.filter((item) => item.status === "cat");
  const dog = clothes.filter((item) => item.status === "dog");
  res.json({
    status: "success",
    code: 200,
    data: { cat, dog },
  });
};

module.exports = getAll;
