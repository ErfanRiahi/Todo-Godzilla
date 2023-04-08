const Task = require("../model/Tasks");

// @desc - all tasks
// @route - GET '/'
// @access - public
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks) return res.status(204).json({ message: "No task found" });
    res.json(tasks);
  } catch (err) {
    console.log(err);
  }
};

// @desc - create a task
// @route - POST '/'
// @access - public
const createTask = async (req, res) => {
  // const { title, describe, userId } = req?.body;
  const task = new Task(req.body);

  // if (!title || !userId)
  //   return res.status(400).json({ message: "title and userId is required" });

  try {
    await Task.create(task);
    const allTasks = await Task.find();
    res.json(allTasks);
  } catch (err) {
    console.log(err);
  }
};

// @desc - update a task
// @route - PUT '/'
// @access - public
const updateTask = async (req, res) => {
  // const { id, title, describe, userId } = req?.body;
  const { id, task } = req?.body;
  if (!id) return res.status(400).json({ message: "Id parameter is required" });

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, task);
    if (!updatedTask)
      return res.status(204).json({ message: `No matches task with id:${id}` });

    const allTasks = await Task.find();
    res.json(allTasks);
  } catch (err) {
    console.log(err);
  }
};

// @desc - delete a task
// @route - DELETE '/'
// @access - public
const deleteTask = async (req, res) => {
  const { id } = req?.body;
  if (!id) return res.status(400).json({ message: "id parameter is required" });

  try {
    const task = Task.findOne({ _id: id });
    if (!task)
      return res.status(204).json({ message: `no matches task with id:${id}` });
    await task.deleteOne();
    const allTasks = await Task.find();
    res.json(allTasks);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
