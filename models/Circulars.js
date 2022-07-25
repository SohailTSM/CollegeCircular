const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const circularSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    branch: {
      type: Array,
      of: String,
      required: true,
    },
    semester: {
      type: Array,
      of: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports.circularModel = mongoose.model('Circular', circularSchema);
