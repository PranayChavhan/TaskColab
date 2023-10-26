const express = require("express");

const projectController = require("../controllers/projectController");
const multerUpload = require("../middleware/multerUpload")
const authMiddleware = require("../middleware/authMiddleware");


const router = express.Router();



//get Usetr Projects
router.get("/get-projects", authMiddleware, projectController.getUserProject);
// Create a new project
router.post("/add-project", authMiddleware, multerUpload.single('image'), projectController.createProject);

//Get project dettails by Id
router.get("/get-project/:id", authMiddleware, projectController.getPorjectDetails);

// // Update an existing project
// router.put("/update/:project_id", projectController.updateProject);

// // Get existing projects by id
// router.get("/show/:project_id", projectController.getProjectById);

// // Delete existing projects by id
// router.delete("/delete/:project_id", projectController.deleteProject);

// // Get all existing projects
// router.get("/getAll", projectController.getAllProjects);

// Add Members to Project
router.post("/add-member", authMiddleware, projectController.addMember);

module.exports = router;
