const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST, PORT = 4001 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`DataBase connect. Use our API on port: ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
