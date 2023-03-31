const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
  to: "borrline@gmail.com",
  from: "yasya.loy@gmail.com",
  subject: "Новая заявка сайта",
  html: "<p>C сайта пришла новая заявка</p>",
};

sgMail
  .send(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));
