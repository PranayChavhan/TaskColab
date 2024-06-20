const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/get-tasks", authMiddleware, taskController.getUserTasks);

router.get("/get-task-details", authMiddleware, taskController.getTaskDetails);

router.post("/create-task", authMiddleware, taskController.createTask);

router.put("/update-task", authMiddleware, taskController.updateTask);

module.exports = router;
