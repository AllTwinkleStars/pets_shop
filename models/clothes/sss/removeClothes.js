const getAll = require("./listClothes");
const updateProducts = require("./updateProducts");

const removeClothes = async (id) => {
  const products = await getAll();
  const idx = products.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  //   const [removeProduct] = products.splice(idx, 1);
  //   await updateProducts(products);
  //   return removeProduct;

  const newClothes = products.filter((_, index) => index !== idx);
  await updateProducts(newClothes);
  return products[idx];
};

module.exports = removeClothes;
