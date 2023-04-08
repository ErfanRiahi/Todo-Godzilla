const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskId: {
    type: Number,
  },
  title: {
    type: String,
    // maxLength: [15, "maximum length is 15 characters"],
    // required: [true, 'field "title" is required'],
  },
  description: {
    type: String,
    // maxLength: [100, "maximum length is 100 character"],
  },
  completed: {
    type: Boolean,
  },
  person: {
    type: Object,
  },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
