const { User, Admin } = require("../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { JWT_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log(token);
  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, JWT_KEY);

    const user = await User.findById(id);
    const admin = await Admin.findById(id);

    if ((!user || !user.token) && (!admin || !admin.token)) {
      throw new Unauthorized("Not authorized");
    }
    req.admin = admin || user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};
module.exports = auth;
