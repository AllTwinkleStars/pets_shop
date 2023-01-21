const { v4: uuidv4 } = require("uuid");
// const fs = require("fs/promises");
const getAll = require("./listClothes");
const updateProducts = require("./updateProducts");

const addClothes = async (body) => {
  const clothes = await getAll();
  const newClothes = { ...body, id: uuidv4() };
  clothes.push(newClothes);
  await updateProducts(clothes);
  return newClothes;
};

module.exports = addClothes;
