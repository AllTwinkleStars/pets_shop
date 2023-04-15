const { Schema, model } = require("mongoose");
// const db = require('mongodb').Db
const Joi = require("joi");
const bcrypt = require("bcrypt");

const usersSchema = Schema(
  {
    name: { type: String, required: true },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // math:
    },
    user: {
      type: String,
      enum: ["user", "admin", "wholesaler"],
      default: "user",
    },
    password: { type: String, required: true, minlength: 6 },
    token: {
      type: String,
      default: null,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verifyToken: {
    //   type: String,
    //   required: [true, `Verify token is required`],
    // },
  },
  { versionKey: false, timestamps: true }
);

usersSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

usersSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const joiSignUpSchema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  user: Joi.string().valid("user", "admin", "wholesaler"),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  remember: Joi.boolean(),
});

const User = model("user", usersSchema);

module.exports = { User, joiSignUpSchema, joiLoginSchema };

// db.userSchema.createIndex({ "email": 1 } { unique: true });
