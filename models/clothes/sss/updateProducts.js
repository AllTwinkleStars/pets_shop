const filePath = require("./filePath");
const fs = require("fs/promises");

const updateClothes = async (products) => {
  await fs.writeFile(filePath, JSON.stringify(products));
};

module.exports = updateClothes;
