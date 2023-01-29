const fs = require("fs/promises");
const path = require("path");
// const cloudinary = require("cloudinary").v2;
// const { Cloth } = require("../../models");

const clothesDir = path.join(__dirname, "../../", "public", "clothes");

const clothes = [];

const addFiles = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;

  try {
    const resultUpload = path.join(clothesDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const image = path.join("clothes", originalname);

    clothes.push({ name: req.body.name, image });
    // const result = await Cloth.create({ name: req.body.name, image });
    res.status(201).json(clothes);
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};
module.exports = addFiles;
