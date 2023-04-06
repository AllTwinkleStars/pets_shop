const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");

const commentsSchema = Schema(
  {
    text: {
      type: String,
      maxlength: 300,
      required: true,
    },
    authorId: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    author: {
      type: String,
      ref: "user",
      required: true,
    },

    product: {
      type: SchemaTypes.ObjectId,
      ref: "cloth",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const commentsJoiSchema = Joi.object({
  text: Joi.string().max(300).required(),
});

const Comment = model("comments", commentsSchema);

module.exports = { Comment, commentsJoiSchema };
