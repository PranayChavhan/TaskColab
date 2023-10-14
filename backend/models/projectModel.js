const db = require("../config/db");

// Create a new project
function createProject(projectData, callback) {
  const { name, description, image, project_head } = projectData;
  const sql =
    "INSERT INTO projects (name, description, image, project_head) VALUES (?, ?, ?, ?)";
  const values = [name, description, image, project_head];

  db.query(sql, values, callback);
}

module.exports = {
  createProject,
};
