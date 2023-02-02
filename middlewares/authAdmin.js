// извлекает токе , проверяет его валидность  и его время..
// извлекает из токена айди и находит пользователя в базе по айди и прикрепляет к запросу req

const { User } = require("../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { JWT_KEY } = process.env;

const authAdmin = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, JWT_KEY);

    const user = await User.findOne({ _id: id, user: "admin" });

    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};
module.exports = authAdmin;

// const { Admin } = require("../models");
// const { Unauthorized } = require("http-errors");
// const jwt = require("jsonwebtoken");

// const { JWT_KEY } = process.env;

// const authAdmin = async (req, res, next) => {
//   const { authorization = "" } = req.headers;
//   const [bearer, token] = authorization.split(" ");
//   try {
//     if (bearer !== "Bearer") {
//       throw new Unauthorized("Not authorized");
//     }
//     const { id } = jwt.verify(token, JWT_KEY);

//     const admin = await Admin.findById(id);

//     if (!admin || !admin.token) {
//       throw new Unauthorized("Not authorized");
//     }
//     req.admin = admin;
//     next();
//   } catch (error) {
//     if (error.message === "Invalid sugnature") {
//       error.status = 401;
//     }
//     next(error);
//   }
// };
// module.exports = authAdmin;
