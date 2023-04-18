const createError = require("http-errors");
const { Cloth } = require("../../../models");

const getFilter = async (req, res, next) => {
  const { text } = req.body;
  console.log(text);
  const { page = 1, limit = 30 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const clothesAllName = await Cloth.find({
      name: { $regex: text, $options: "i" },
    });
    const allPage = Math.ceil(clothesAllName.length / limit);
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

    const clothesAllCode = await Cloth.find({
      code: { $regex: text, $options: "i" },
    });

    console.log(clothesAllCode);
    // const clothesAllCode = await Cloth.find({
    //   code: { $regex: text, $options: "i" },
    // });
    const allPageCode = Math.ceil(clothesAllCode.length / limit);
    console.log();
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

    if (!clothesAllName || !clothesCode) {
      throw createError(404, `Product ${text} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: clothesAllName.length === 0 ? clothesCode : clothesName,
      allPage: clothesAllName.length === 0 ? allPageCode : allPage,
    });
  } catch (error) {
    throw createError(error, `Product ${text} not found`);
  }
};
module.exports = getFilter;
