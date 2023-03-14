const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: [15, "maximum length is 15 characters"],
    required: [true, 'field "title" is required'],
  },
  describe: {
    type: String,
    maxLength: [100, "maximum length is 100 character"],
  },
  completed: {
    type: Boolean,
  },
  userId: {
    type: Array,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
