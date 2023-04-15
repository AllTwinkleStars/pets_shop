const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = logout;

// const { User } = require("../../models");
// const { serialize } = require("cookie");

// const logout = async (req, res) => {
//   const { cookies } = req;
//   const { _id } = req.user;

//   const jwt = cookies.token;
//   if (!jwt) {
//     return res.status(401).json({
//       status: "error",
//       error: "Unauthorized",
//     });
//   }

//   await User.findByIdAndUpdate(_id, { token: null });

//   const serialized = serialize("token", null, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV,
//     sameSite: "strict",
//     maxAge: -1,
//     path: "/",
//   });

//   res.setHeader("Set-Cookie", serialized);
//   res.status(204).json();
// };

// module.exports = logout;
