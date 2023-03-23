const { Cloth } = require("../../../models");
const getAll = async (req, res) => {
  // поиск своих товаров только определенному юзеру
  // const { _id, name, email } = req.admin;

  // const clothes = await Cloth.find({ owner: _id }).populate(
  //   "owner",
  //   "_id name email"
  // );
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const clothesAll = await Cloth.find({});
  const overalls = await Cloth.find({ model: "overalls" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const vest = await Cloth.find({ model: "vest" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const blanket = await Cloth.find({ model: "blanket" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const jacket = await Cloth.find({ model: "jacket" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const suits = await Cloth.find({ model: "suits" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const skinny = await Cloth.find({ model: "skinny" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const bomber = await Cloth.find({ model: "bomber" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const sweatshirt = await Cloth.find({ model: "sweatshirt" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const trousers = await Cloth.find({ model: "trousers" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const hats = await Cloth.find({ model: "hats" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const scarves = await Cloth.find({ model: "scarves" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const tShirt = await Cloth.find({ model: "tShirt" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const singlet = await Cloth.find({ model: "singlet" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const shirt = await Cloth.find({ model: "shirt" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const dress = await Cloth.find({ model: "dress" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const skirt = await Cloth.find({ model: "skirt" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  const briefs = await Cloth.find({ model: "briefs" }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");

  res.json({
    status: "success",
    code: 200,
    data: {
      overalls,
      vest,
      blanket,
      jacket,
      suits,
      skinny,
      bomber,
      sweatshirt,
      trousers,
      hats,
      scarves,
      tShirt,
      singlet,
      shirt,
      dress,
      skirt,
      briefs,
    },
    allElements: clothesAll.length,
  });
};

module.exports = getAll;
