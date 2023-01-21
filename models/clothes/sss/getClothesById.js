const getAll = require("./listClothes");

const getClothesById = async (id) => {
  const clothes = await getAll();
  const result = clothes.find((item) => item.id === id);
  if (!result) {
    return null;
  }
  return result;
};

module.exports = getClothesById;
