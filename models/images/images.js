const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");
// const moment = require("moment-timezone");

const imagesSchema = Schema(
  {
    images: [
      {
        type: Object,
        required: true,
      },
    ],
    model: {
      type: String,
      enum: ["home"],
      unique: true,
      required: [true, "model is required"],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiImgSchema = Joi.object().keys({
  model: Joi.string().valid("home").required(),
});

const Image = model("images", imagesSchema);
module.exports = { Image, joiImgSchema };
