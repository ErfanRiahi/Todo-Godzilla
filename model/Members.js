const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'field "title" is required'],
  },
  age: {
    type: number,
  },
  linkedIn: {
    type: String,
  },
  gitHub: {
    type: String,
  },
  skill: {
    type: Array,
  },
  language: {
    type: Array,
  },
});

module.exports = mongoose.model("Member", MemberSchema);
