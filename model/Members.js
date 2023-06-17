const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: [true, 'field "title" is required'],
  },
  lastName: {
    type: String,
  },
  birthday: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  language: {
    type: Array,
  },
  skill: {
    type: Array,
  },
  isAdmin: {
    type: Boolean,
  },
  profileImage: {
    type: String,
  },
  tasks: {
    type: Array,
  },
});

const Item = mongoose.model("Member", MemberSchema);
module.exports = Item;
