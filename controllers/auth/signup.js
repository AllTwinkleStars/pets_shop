const { User } = require("../../models");
const { Conflict } = require("http-errors");
// const bcrypt = require("bcrypt");
// const { sendEmail } = require("../../helpers");
// const { v4: uuidv4 } = require("uuid");

const signup = async (req, res) => {
  const { name, lastName, email, password, user } = req.body;
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

  // const verificationToken = uuidv4();
  const newUser = new User({
    name,
    lastName,
    email,
    user,

    // verificationToken
  });

  newUser.setPassword(password);
  await newUser.save();
  // const mail = {
  //   to: email,
  //   subject: "Подтверждение email",
  //   html: `<a target="_blank" href:"http://localhost:3000/api/auth/verify/${verificationToken}">Подтвердить email</a>`,
  // };

  // await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        name,
        lastName,
        // verificationToken,
      },
    },
  });
};

module.exports = signup;
