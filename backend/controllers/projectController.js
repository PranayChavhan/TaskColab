const projectModel = require("../models/projectModel");

function createProject(req, res) {
  const projectData = req.body;

  projectModel.createProject(projectData, (err, result) => {
    if (err) {
      console.error("Error creating project:", err);
      res.status(500).json({ error: "Error creating project" });
    } else {
      const projectId = result.insertId; 
      const projectCreatorUserId = result.project_head; 

      projectModel.linkUserToRole(projectCreatorUserId, 'project_head', projectId, (linkErr) => {
        if (linkErr) {

          console.error("Error linking user to project_head role:", linkErr);
          res.status(500).json({ error: "Error creating project" });
        } else {
          res.status(201).json({ message: "Project created successfully" });
        }
      })
    }
  });
}



function updateProject(req, res) {
  const projectId = req.params.project_id;
  const updatedProjectData = req.body;

  projectModel.updateProject(projectId, updatedProjectData, (err, result) => {
    if (err) {
      console.error("Error updating project:", err);
      res.status(500).json({ error: "Error updating project" });
    } else {
      res
        .status(200)
        .json({ message: `Project with ID ${projectId} updated successfully` });
    }
  });
}

function getProjectById(req, res) {
  const projectId = req.params.project_id;
  projectModel.getProjectById(projectId, (err, project) => {
    if (err) {
      console.error("Error retrieving project:", err);
      res.status(500).json({ error: "Error retrieving project" });
    } else if (!project) {
      res.status(404).json({ message: "Project not found" });
    } else {
      res.status(200).json(project);
    }
  });
}

function deleteProject(req, res) {
  const projectId = req.params.project_id;
  projectModel.deleteProject(projectId, (err, result) => {
    if (err) {
      console.error("Error deleting project:", err);
      res.status(500).json({ error: "Error deleting project" });
    } else {
      res
        .status(200)
        .json({ message: `Project with ID ${projectId} deleted successfully` });
    }
  });
}

function getAllProjects(req, res) {
  projectModel.getAllProjects((err, projects) => {
    if (err) {
      console.error("Error retrieving projects:", err);
      res.status(500).json({ error: "Error retrieving projects" });
    } else {
      res.status(200).json(projects);
    }
  });
}

module.exports = {
  createProject,
  updateProject,
  getProjectById,
  deleteProject,
  getAllProjects,
};
