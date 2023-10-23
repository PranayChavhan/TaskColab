const express = require("express");
const projectController = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();

//get Usetr Projects
router.get("/get-projects",authMiddleware, projectController.getUserProject);
// Create a new project
router.post("/add-project",authMiddleware, projectController.createProject);

// // Update an existing project
// router.put("/update/:project_id", projectController.updateProject);

// // Get existing projects by id
// router.get("/show/:project_id", projectController.getProjectById);

// // Delete existing projects by id
// router.delete("/delete/:project_id", projectController.deleteProject);

// // Get all existing projects
// router.get("/getAll", projectController.getAllProjects);

module.exports = router;
