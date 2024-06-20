const db = require("../config/db");

module.exports = {
  getTaskById: (taskId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks WHERE task_id = ?', [taskId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  getTasksByUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM tasks WHERE fk_user = ?', [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  getTaskDetails: (taskId, assigneTo) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT t.task_id, t.name, t.description, t.status, t.due_date, t.priority, t.project_id, t.fk_user, t.created_by, u.firstname, u.lastname, u.username, u.email, u.profile_image_url FROM tasks AS t INNER JOIN users AS u ON t.fk_user = u.user_id WHERE t.task_id = ?', [taskId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  addTask: (taskData) => {
    return new Promise((resolve, reject) => {
      const { name, description, status, due_date, priority, project_id, fk_user, created_by } = taskData;
      db.query('INSERT INTO tasks (name, description, status, due_date, priority, project_id, fk_user, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [name, description, status, due_date, priority, project_id, fk_user, created_by], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  updateTaskById: (taskData) => {
    const { taskId, name, description, status, due_date, priority, project_id, fk_user } = taskData;
    return new Promise((resolve, reject) => {
      db.query('UPDATE tasks SET name = ?, description = ?, status = ?, due_date = ?, priority = ?, project_id = ?, fk_user = ? WHERE task_id = ?', [name, description, status, due_date, priority, project_id, fk_user, taskId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  deleteTaskById: (taskId) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM tasks WHERE task_id = ?', [taskId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
};
