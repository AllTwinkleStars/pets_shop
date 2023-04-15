const { User } = require("../../models");
// const { Unauthorized } = require("http-errors");
const createError = require("http-errors");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { ErrorHandler } = require("../../utils/errorHandler");

const { JWT_KEY } = process.env;

const login = async (req, res) => {
  // try {
  const { email, password, remember } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw createError(
      401,
      "Email  is wrong or not verify,  or password is wrong  "
    );
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(
    payload,
    JWT_KEY,
    remember === true ? {} : { expiresIn: "1h" }
  );
  if (token) {
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      status: "success",
      code: 200,
      token,
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        user: user.user,
      },
    });
  }
  res.status(401).json({ message: "Email or password is wrong" });
  // } catch (error) {
  //   next(new ErrorHandler(error.statusCode || 500, error.message));
  // }
};

module.exports = login;

// const { User } = require("../../models");
// // const { Unauthorized } = require("http-errors");
// const createError = require("http-errors");
// // const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const { serialize } = require("cookie");
// // const { ErrorHandler } = require("../../utils/errorHandler");

// const { JWT_KEY, NODE_ENV } = process.env;

// const login = async (req, res) => {
//   // try {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !user.comparePassword(password)) {
//     throw createError(
//       401,
//       "Email  is wrong or not verify,  or password is wrong  "
//     );
//   }

//   const payload = {
//     id: user._id,
//   };

//   const token = jwt.sign(payload, JWT_KEY, { expiresIn: 60 * 60 * 24 * 30 });
//   if (token) {
//     await User.findByIdAndUpdate(user._id, { token });

//     const serialized = serialize("token", token, {
//       httpOnly: true,
//       secure: NODE_ENV,
//       sameSite: "strict",
//       maxAge: 60 * 60 * 24 * 30,
//       path: "/",
//     });
//     res.setHeader("Set-Cookie", serialized);
//     res.json({
//       status: "success",
//       code: 200,
//       token,
//       user: {
//         name: user.name,
//         lastName: user.lastName,
//         email: user.email,
//         user: user.user,
//       },
//     });
//     return;
//   }
//   res.status(401).json({ message: "Email or password is wrong" });
//   // } catch (error) {
//   //   next(new ErrorHandler(error.statusCode || 500, error.message));
//   // }
// };

// module.exports = login;
