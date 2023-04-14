const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");
const moment = require("moment-timezone");

const commentsSchema = Schema(
  {
    text: {
      type: String,
      maxlength: 300,
      required: true,
    },
    parentId: {
      type: String,
      default: "",
    },
    authorId: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    authorLastName: {
      type: String,
      ref: "user",
      required: true,
    },

    authorName: {
      type: String,
      ref: "user",
      required: true,
    },

    product: {
      type: SchemaTypes.ObjectId,
      ref: "cloth",
      required: true,
    },

    createdAt: {
      type: String,
      default: moment().tz("Ukraine/Kyiv").format(),
    },
  },
  // { versionKey: false, timestamps: true }
  {
    versionKey: false,
    timestamps: {
      createdAt: false,
      updatedAt: true,
    },
  }
);

const commentsJoiSchema = Joi.object({
  text: Joi.string().max(300).required(),
});
// commentsSchema.createdAt(moment().tz("Ukraine/Kyiv").format());

const Comment = model("comments", commentsSchema);

module.exports = { Comment, commentsJoiSchema };
