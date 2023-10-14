const projectModel = require("../models/projectModel");

function createProject(req, res) {
  const projectData = req.body;
  projectModel.createProject(projectData, (err, result) => {
    if (err) {
      console.error("Error creating project:", err);
      res.status(500).json({ error: "Error creating project" });
    } else {
      res.status(201).json({ message: "Project created successfully" });
    }
  });
}

module.exports = {
  createProject,
};
