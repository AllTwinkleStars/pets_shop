const Joi = require("joi");

const clothesSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0.01).required(),
  location: Joi.string().required(),
});


module.exports =  clothesSchema