const fs = require("fs/promises");
const filePath = require("./filePath");

const listClothes = async () => {
  const data = await fs.readFile(filePath);
  const clothes = JSON.parse(data);
  return clothes;
};

module.exports = listClothes;
