const createError = require("http-errors");
const { Cloth } = require("../../../models");

const getFilter = async (req, res) => {
  const { text } = req.body;
  console.log(text);
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const clothesName = await Cloth.find(
    {
      name: { $regex: text, $options: "i" },
    },
    "",
    {
      skip,
      limit: Number(limit),
    }
  );

  const clothesCode = await Cloth.find(
    {
      code: { $regex: text, $options: "i" },
    },
    "",
    {
      skip,
      limit: Number(limit),
    }
  );

  // const clothesName = await Cloth.find({ name: text }).populate(
  //   "owner",
  //   "_id name email"
  // );

  // const clothesCode = await Cloth.find({ code: text }, "", {
  //   skip,
  //   limit: Number(limit),
  // });
  // const clothesCode = await Cloth.find({ code: text }).populate(
  //   "owner",
  //   "_id name email"
  // );

  if (!clothesName) {
    throw createError(404, `Product ${text} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: clothesName.length === 0 ? clothesCode : clothesName,
  });
};

module.exports = getFilter;
