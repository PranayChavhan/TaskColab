const taskModel = require("../models/taskModel");

class TaskController {
  //[GET] Get Tasks Assigned to User
  async getUserTasks(req, res) {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ "msg": "Please Login to get tasks!" });
    }
    try {
      const tasks = await taskModel.getTasksByUser(userId);
      console.log("Tasks Fetched!");
      console.log(tasks);
      return res.status(200).json({ "msg": "Tasks Fetched!", "tasks": tasks });
    } catch (err) {
      console.log("# ERROR: ", err);
      console.log(err);
      return res.status(400).json({ "msg": "Something went wrong!" });
    }
  }

  //[GET] Get Task Details From Id
  async getTaskDetails(req, res) {
    const taskId = req.query.id;
    const assignedTo = req.user.userId;

    console.log("TaskId:", taskId);
    if (!taskId) {
      return res.status(400).json({ "msg": "Task Id cannot be empty!" });
    }
    try {
      const queryResult = await taskModel.getTaskDetails(taskId, assignedTo);

      console.log("Task Query");
      console.log(queryResult);

      const task = {
        id: queryResult[0].task_id, // Assuming the first record contains task details
        name: queryResult[0].name,
        description: queryResult[0].description,
        status: queryResult[0].status,
        due_date: queryResult[0].due_date,
        priority: queryResult[0].priority,
        project_id: queryResult[0].project_id,
        assigne_to: queryResult[0].assigne_to,
        created_by: queryResult[0].created_by,
      };

      console.log(task);
      return res.status(200).json({ "msg": "Task Found!", "task": task });
    } catch (err) {
      console.log("# ERROR: ", err);
      return res.status(400).json({ "msg": "Something went wrong!" });
    }
  }

  // [POST] Create Task
  async createTask(req, res) {
    const { name, description, status, due_date, priority, project_id, assigne_to } = req.body;
    const userId = req.user.userId;

    if (!name || !description || !status || !due_date || !priority || !project_id || !assigne_to || !userId) {
      return res.status(400).json({ "msg": "Please provide all the fields!" });
    }

    try {
      // Create new Task
      const taskData = {
        name, description, status, due_date, priority, project_id, assigne_to, created_by: userId
      };

      const results = await taskModel.addTask(taskData);
      console.log(results);
      console.log(results.insertId);

      return res.status(200).json({ msg: "Task Created Successfully!" });
    } catch (err) {
      console.log("# ERROR: ", err);
      console.log("Error Occurred:", err);
      return res.status(500).json({ "msg": "An error occurred." });
    }
  }

  //[PUT] Update Task
  async updateTask(req, res) {
    const { task_id, name, description, status, due_date, priority, project_id, assigne_to } = req.body;

    if (task_id || !name || !description || !status || !due_date || !priority || !project_id || !assigne_to) {
      return res.status(400).json({ "msg": "Required fields cannot be empty!" });
    }

    // Update the task
    try {
      const taskData = {
        task_id, name, description, status, due_date, priority, project_id, assigne_to
      };
      await taskModel.updateTaskById(taskData);
      return res.status(201).json({ "msg": "Task Data Updated!" });
    } catch (err) {
      console.log("# ERROR: ", err);
      return res.status(400).json({ "msg": "Something went wrong!" });
    }
  }
}

module.exports = new TaskController();
