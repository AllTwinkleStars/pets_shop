// const productsOperations = require("./products");
// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");

// const invokeAction = async ({ action, id, data }) => {
//   switch (action) {
//     case "getAll":
//       const products = await productsOperations.getAll();
//       console.log(products);
//       break;
//     case "getById":
//       const product = await productsOperations.getById(id);
//       if (!product) {
//         throw new Error(`Product with id=${id} not found`);
//       }
//       console.log(product);
//       break;
//     case "add":
//       const newProducnt = await productsOperations.add(data);
//       console.log(newProducnt);
//       break;
//     case "updateById":
//       const updateProduct = await productsOperations.updateById(id, data);

//       if (!updateProduct) {
//         throw new Error(`Product with id=${id} not found`);
//       }
//       console.log(updateProduct);
//       break;

//     case "removeById":
//       const removeProduct = await productsOperations.removeById(id);

//       console.log(removeProduct);
//       break;
//     default:
//       console.log("Unknown action");
//   }
// };

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);

// invokeAction(argv);

//

// const fs = require("fs/promises");
// const moment = require("moment");
// const express = require("express");

// const products = require("./products/products.json");
// const productsRouter = require("./routes/api/products.js");

// app.use(async (req, res, next) => {
//   const { method, url } = req;
//   const date = moment().format("DD-MM-YYYY_hh:mm:ss");
//   await fs.appendFile("server.log", `\n${method} ${url} ${date}`);
//   next();
// });

//

// cюда записать адресс с которого будут делаться запросы

// app.get("/contacts", (request, response) => {
//   response.send("<h2>Contacts page</h2>");
// });

// app.get("/", (request, response) => {
//   response.json(products);
// });
const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const clothesRouter = require("./routes/api/clothes.js");
const DB_HOST = require("./config");

mongoose
  .connect(DB_HOST)
  .then(() => console.log("DataBase connect"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/clothes", clothesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
