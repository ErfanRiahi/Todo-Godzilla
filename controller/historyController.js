const History = require("../model/History");

// @desc - all tasks
// @route - GET '/'
// @access - public
const getAllHistories = async (req, res) => {
  try {
    const histories = await History.find();
    if (!histories)
      return res.status(204).json({ message: "No history found" });
    res.json(histories);
  } catch (err) {
    console.log(err);
  }
};

// @desc - create a task
// @route - POST '/'
// @access - public
const addToHistory = async (req, res) => {
  const history = new History(req.body);
  try {
    await History.create(history);
    const allHistories = await History.find();
    res.json(allHistories);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllHistories, addToHistory };
