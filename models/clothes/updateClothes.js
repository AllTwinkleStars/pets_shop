const getAll = require("./listClothes");
const updateProducts = require("./updateProducts");

const updateClothes = async (id, body) => {
  const clothes = await getAll();
  const idx = clothes.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  clothes[idx] = { ...body, id };
  await updateProducts(clothes);
  return clothes[idx];
};

module.exports = updateClothes;
