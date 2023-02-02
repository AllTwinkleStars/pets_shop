const {
  User,

} = require("../../models");
const { Conflict } = require("http-errors");
// const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { name, email, password, user } = req.body;
  const utilizer = await User.findOne({ email });

  if (utilizer) {
    throw new Conflict(`User with ${email} already exist`);
  }
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // const result = await User.create({
  //   name,
  //   email,
  //   password: hashPassword,
  // });\

  const newUser = new User({ name, email, user });

  newUser.setPassword(password);
  await newUser.save();
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        name,
      },
    },
  });
};

module.exports = signup;
