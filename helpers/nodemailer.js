const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465 , 2255
  secure: true,
  auth: {
    user: "borline@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);
// const emailOptions = {
//   to: "borline@meta.ua",
//   from: "borline@i.ua",
//   subject: "Nodemailer test",
//   html: "<p>Привет. Мы тестируем отправку писем!</p>",
// };

const nodeEmail = async (data) => {
  const email = { ...data, to: "borline@meta.ua" };
  try {
    await transporter.sendMail(email);
    return true;
  } catch (e) {
    console.log(e.message);
  }
};

// transporter
//   .sendMail(emailOptions)
//   .then(() => console.log("Email send succes"))
//   .catch((error) => console.log(error.message));

//

module.exports = nodeEmail;
