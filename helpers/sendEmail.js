const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, to: "borrline@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error.message;
  }
};
// const email = {
//   to: "borrline@gmail.com",
//   from: "yasya.loy@gmail.com",
//   subject: "Новая заявка сайта",
//   html: "<p>C сайта пришла новая заявка</p>",
// };

module.exports = sendEmail;
