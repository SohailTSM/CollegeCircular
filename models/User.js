const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

function validateUser(user) {
  const JoiSchema = Joi.object({
    name: Joi.string().required(),
    name: Joi.string().required(),
    name: Joi.string().required(),
    name: Joi.string().required(),
    name: Joi.string().required(),
    name: Joi.string().required(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(user);
}

module.exports.userModel = mongoose.model('User', userSchema);
module.exports.validateUser = validateUser;
