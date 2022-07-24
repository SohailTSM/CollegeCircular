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
      type: String,
      required: true,
    },
    semester: {
      typee: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Circular', circularSchema);
