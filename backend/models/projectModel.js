const db = require("../config/db");



module.exports = {

  getProjectById: (projectId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROm projects WHERE project_id = ?', [projectId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
    })
  },
  getProjectsByUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM projects WHERE project_head=?', [userId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
    })
  },
  getProjectDetails: (projectId, headId) => {
    return new Promise((resolve, reject) => {
      db.query('select * from projects where project_id=?', [projectId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
    })
  },
  getProjectMembers: (projectId) => {
    return new Promise((resolve, reject) => {
      db.query('select u.user_id, u.firstname, u.lastname, u.email,u.profile_image_url from users u where u.user_id in ( select user_id from project_members where project_id=?)', [projectId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
    })
  },
  getProjectTasks: (projectId) => {
    return new Promise((resolve, reject) => {
      db.query('select t.*, u.firstname, u.email, u.profile_image_url from tasks t left join users u on u.user_id = t.fk_user where t.project_id=?', [projectId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
    })
  },
  addProject: (projectData) => {
    return new Promise((resolve, reject) => {
      const { name, description, image, userId } = projectData;
      db.query('INSERT INTO projects (name, description, image, project_head) value (?,?,?,?);', [name, description, image, userId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
    })
  },

  updateProjectById: (projectData) => {
    const { projectId, name, description } = projectData;
    return new Promise((resolve, reject) => {
      db.query('UPDATE projects SET name=?, description=? WHERE project_id=?', [projectId, name, description],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
    })
  },
  deleteProjectById: (projectId) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM  projects WHERE project_id=?', [projectId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
    })
  }
}




// // // Create a new project
// // function createProject(projectData, callback) {

// // }

// // // Update an existing project by project_id
// // function updateProject(projectId, updatedProjectData, callback) {
// //   const { name, description, image, project_head } = updatedProjectData;

// //   const sql = `
// //     UPDATE projects 
// //     SET 
// //       name = ?,
// //       description = ?,
// //       image = ?,
// //       project_head = ?
// //     WHERE project_id = ?`;

// //   const values = [name, description, image, project_head, projectId];

// //   db.query(sql, values, callback);
// // }

// // // Retrieve a project by ID
// // function getProjectById(projectId, callback) {
// //   const sql = "SELECT * FROM projects WHERE project_id = ?";
// //   db.query(sql, projectId, (err, result) => {
// //     if (err) {
// //       callback(err, null);
// //     } else {
// //       callback(null, result[0]); // Assuming you want to return a single project
// //     }
// //   });
// // }

// // // Delete a project by ID
// // function deleteProject(projectId, callback) {
// //   const sql = "DELETE FROM projects WHERE project_id = ?";
// //   db.query(sql, projectId, callback);
// // }

// // // Retrieve all projects
// // function getAllProjects(callback) {
// //   const sql = "SELECT * FROM projects";
// //   db.query(sql, (err, results) => {
// //     if (err) {
// //       callback(err, null);
// //     } else {
// //       callback(null, results);
// //     }
// //   });
// // }


// // // Assign Roles
// // function linkUserToRole(userId, roleName, projectId, callback) {
// //   const sql = `
// //     INSERT INTO user_roles (user_id, role_id, project_id)
// //     SELECT ?, roles.role_id, ?
// //     FROM roles
// //     WHERE role_name = ?;
// //   `;

// //   const values = [userId, roleName, projectId ];

// //   db.query(sql, values, callback);
// // }

// // module.exports = {
// //   createProject,
// //   updateProject,
// //   getProjectById,
// //   deleteProject,
// //   getAllProjects,
// //   link
// // Create a new project
// function createProject(projectData, callback) {

// }

// // Update an existing project by project_id
// function updateProject(projectId, updatedProjectData, callback) {
//   const { name, description, image, project_head } = updatedProjectData;

//   const sql = `
//     UPDATE projects 
//     SET 
//       name = ?,
//       description = ?,
//       image = ?,
//       project_head = ?
//     WHERE project_id = ?`;

//   const values = [name, description, image, project_head, projectId];

//   db.query(sql, values, callback);
// }

// // Retrieve a project by ID
// function getProjectById(projectId, callback) {
//   const sql = "SELECT * FROM projects WHERE project_id = ?";
//   db.query(sql, projectId, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result[0]); // Assuming you want to return a single project
//     }
//   });
// }

// // Delete a project by ID
// function deleteProject(projectId, callback) {
//   const sql = "DELETE FROM projects WHERE project_id = ?";
//   db.query(sql, projectId, callback);
// }

// // Retrieve all projects
// function getAllProjects(callback) {
//   const sql = "SELECT * FROM projects";
//   db.query(sql, (err, results) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// }


// // Assign Roles
// function linkUserToRole(userId, roleName, projectId, callback) {
//   const sql = `
//     INSERT INTO user_roles (user_id, role_id, project_id)
//     SELECT ?, roles.role_id, ?
//     FROM roles
//     WHERE role_name = ?;
//   `;

//   const values = [userId, roleName, projectId ];

//   db.query(sql, values, callback);
// }

// module.exports = {
//   createProject,
//   updateProject,
//   getProjectById,
//   deleteProject,
//   getAllProjects,
//   linkUserToRole
// };
// UserToRole
// // };
