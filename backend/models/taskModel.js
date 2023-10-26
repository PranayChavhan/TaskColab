const db = require("../config/db");



module.exports = {

    getTaskById: (TaskId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROm tasks WHERE user_id = ?', [TaskId],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
        })
    },
    gettasksByUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM tasks WHERE Task_head=?', [userId],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
        })
    },
    getTaskDetails: (TaskId, headId) => {
        return new Promise((resolve, reject) => {
            db.query('select p.Task_id,p.name,p.description,p.image , p.Task_head, u.firstname,u.lastname,u.username,u.email,u.profile_image_url from tasks as p inner join Task_members as m on p.Task_id=m.Task_id inner join users as u on u.user_id=m.user_id where p.Task_id=?', [TaskId,],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
        })
    },
    addTask: (TaskData) => {
        return new Promise((resolve, reject) => {
            const { name, description, image, userId } = TaskData;
            db.query('INSERT INTO tasks (name, description, image, Task_head) value (?,?,?,?);', [name, description, image, userId],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
        })
    },

    updateTaskById: (TaskData) => {
        const { TaskId, name, description } = TaskData;
        return new Promise((resolve, reject) => {
            db.query('UPDATE tasks SET name=?, description=? WHERE Task_id=?', [TaskId, name, description],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
        })
    },
    deleteTaskById: (TaskId) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM  tasks WHERE Task_id=?', [TaskId],
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




// // // Create a new Task
// // function createTask(TaskData, callback) {

// // }

// // // Update an existing Task by Task_id
// // function updateTask(TaskId, updatedTaskData, callback) {
// //   const { name, description, image, Task_head } = updatedTaskData;

// //   const sql = `
// //     UPDATE tasks 
// //     SET 
// //       name = ?,
// //       description = ?,
// //       image = ?,
// //       Task_head = ?
// //     WHERE Task_id = ?`;

// //   const values = [name, description, image, Task_head, TaskId];

// //   db.query(sql, values, callback);
// // }

// // // Retrieve a Task by ID
// // function getTaskById(TaskId, callback) {
// //   const sql = "SELECT * FROM tasks WHERE Task_id = ?";
// //   db.query(sql, TaskId, (err, result) => {
// //     if (err) {
// //       callback(err, null);
// //     } else {
// //       callback(null, result[0]); // Assuming you want to return a single Task
// //     }
// //   });
// // }

// // // Delete a Task by ID
// // function deleteTask(TaskId, callback) {
// //   const sql = "DELETE FROM tasks WHERE Task_id = ?";
// //   db.query(sql, TaskId, callback);
// // }

// // // Retrieve all tasks
// // function getAlltasks(callback) {
// //   const sql = "SELECT * FROM tasks";
// //   db.query(sql, (err, results) => {
// //     if (err) {
// //       callback(err, null);
// //     } else {
// //       callback(null, results);
// //     }
// //   });
// // }


// // // Assign Roles
// // function linkUserToRole(userId, roleName, TaskId, callback) {
// //   const sql = `
// //     INSERT INTO user_roles (user_id, role_id, Task_id)
// //     SELECT ?, roles.role_id, ?
// //     FROM roles
// //     WHERE role_name = ?;
// //   `;

// //   const values = [userId, roleName, TaskId ];

// //   db.query(sql, values, callback);
// // }

// // module.exports = {
// //   createTask,
// //   updateTask,
// //   getTaskById,
// //   deleteTask,
// //   getAlltasks,
// //   link
// // Create a new Task
// function createTask(TaskData, callback) {

// }

// // Update an existing Task by Task_id
// function updateTask(TaskId, updatedTaskData, callback) {
//   const { name, description, image, Task_head } = updatedTaskData;

//   const sql = `
//     UPDATE tasks 
//     SET 
//       name = ?,
//       description = ?,
//       image = ?,
//       Task_head = ?
//     WHERE Task_id = ?`;

//   const values = [name, description, image, Task_head, TaskId];

//   db.query(sql, values, callback);
// }

// // Retrieve a Task by ID
// function getTaskById(TaskId, callback) {
//   const sql = "SELECT * FROM tasks WHERE Task_id = ?";
//   db.query(sql, TaskId, (err, result) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, result[0]); // Assuming you want to return a single Task
//     }
//   });
// }

// // Delete a Task by ID
// function deleteTask(TaskId, callback) {
//   const sql = "DELETE FROM tasks WHERE Task_id = ?";
//   db.query(sql, TaskId, callback);
// }

// // Retrieve all tasks
// function getAlltasks(callback) {
//   const sql = "SELECT * FROM tasks";
//   db.query(sql, (err, results) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// }


// // Assign Roles
// function linkUserToRole(userId, roleName, TaskId, callback) {
//   const sql = `
//     INSERT INTO user_roles (user_id, role_id, Task_id)
//     SELECT ?, roles.role_id, ?
//     FROM roles
//     WHERE role_name = ?;
//   `;

//   const values = [userId, roleName, TaskId ];

//   db.query(sql, values, callback);
// }

// module.exports = {
//   createTask,
//   updateTask,
//   getTaskById,
//   deleteTask,
//   getAlltasks,
//   linkUserToRole
// };
// UserToRole
// // };
