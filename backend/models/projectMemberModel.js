const db = require("../config/db");


module.exports = {

    getMembers: (projectId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT u.user_id, u.firstname, u.lastname, u.profile_image_url, u.username,u.email from users as u inner join project_members as m on u.user_id=m.user_id where m.project_id=?', [projectId],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            )
        })
    },

    addMember: (projectId, userId) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO project_members(project_id,user_id) VALUE (?, ?)', [projectId, userId],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            )
        })
    }


}


