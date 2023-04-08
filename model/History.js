const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  taskId: {
    type: Number,
  },
  typeOfModification: {
    type: String,
  },
  username: {
    type: String,
  },
  dataTime: {
    type: String,
  },
});

const History = mongoose.model("History", HistorySchema);
module.exports = History;
