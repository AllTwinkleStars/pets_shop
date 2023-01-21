const { Schema, model, SchemaTypes } = require("mongoose");

const Joi = require("joi");

const codeRegexp = /^[0-9]{9}$/;

const clothesSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for clothes"],
      minlength: 2,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: [true, "price must be exist"],
      min: 0.01,
    },

    active: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["basic", "sale", "stock"],
      default: "basic",
    },
    code: {
      type: String,
      required: true,
      unique: true,
      match: codeRegexp,
      // регулярные выражения выучить
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "admin",
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0.01).required(),
  active: Joi.bool(),
  status: Joi.string().valid("basic", "sale", "stock"),
  code: Joi.string().pattern(codeRegexp).required(),
});

const statusJoiSchema = Joi.object({
  status: Joi.string().valid("basic", "sale", "stock").required(),
});

const Cloth = model("clothes", clothesSchema);

module.exports = { Cloth, joiSchema, statusJoiSchema };
