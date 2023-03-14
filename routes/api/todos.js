const express = require("express");
const {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
} = require("../../controller/memberController");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../../controller/taskController");

const router = express.Router();

router
  .route("/")
  .get(getAllTasks)
  .post(createTask)
  .put(updateTask)
  .delete(deleteTask);

router
  .route("/members")
  .get(getAllMembers)
  .post(createMember)
  .put(updateMember)
  .delete(deleteMember);

module.exports = router;
