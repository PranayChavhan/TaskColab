const db = require('../config/db');

//Create User
module.exports = {

    //SQL Query to get all users
    getUsers: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT u.user_id, u.firstname, u.lastname, u.email,u.profile_image_url, u.username FROM users as u', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        })
    },

    //SQL Query to create a new user
    createUser: (userData) => {
        const { firstname, lastname, username, email, password_hash, profile_image_url, otp, phone } = userData;

        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (firstname, lastname, username, email, password_hash, profile_image_url, otp, phone) VALUE (?,?,?,?,?,?,?,?)',
                [firstname, lastname, username, email, password_hash, profile_image_url, otp, phone],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    },

    //SQL Query to gect user by email
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            })
        })
    },

    //SQL Query to Update otp
    updateOTP: (email, otp) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE users SET otp= ?, is_verified=? WHERE email = ?', [otp, 1, email], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });

        });
    },

    //SQL Query to update password
    updatePassword: (email, password) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE users SET password_hash = ? WHERE email = ?', [password, email], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });

    }
}