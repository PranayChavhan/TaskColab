const db = require("../config/db");

// Create a new project
function createProject(projectData, callback) {
  const { name, description, image, project_head } = projectData;
  const sql =
    "INSERT INTO projects (name, description, image, project_head) VALUES (?, ?, ?, ?)";
  const values = [name, description, image, project_head];

  db.query(sql, values, callback);
}

// Update an existing project by project_id
function updateProject(projectId, updatedProjectData, callback) {
  const { name, description, image, project_head } = updatedProjectData;

  const sql = `
    UPDATE projects 
    SET 
      name = ?,
      description = ?,
      image = ?,
      project_head = ?
    WHERE project_id = ?`;

  const values = [name, description, image, project_head, projectId];

  db.query(sql, values, callback);
}

// Retrieve a project by ID
function getProjectById(projectId, callback) {
  const sql = "SELECT * FROM projects WHERE project_id = ?";
  db.query(sql, projectId, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result[0]); // Assuming you want to return a single project
    }
  });
}

// Delete a project by ID
function deleteProject(projectId, callback) {
  const sql = "DELETE FROM projects WHERE project_id = ?";
  db.query(sql, projectId, callback);
}

// Retrieve all projects
function getAllProjects(callback) {
  const sql = "SELECT * FROM projects";
  db.query(sql, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
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
