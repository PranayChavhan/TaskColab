// services/UserService.js
const mysql = require('mysql');
const User = require('../models/User');

const dbConfig = {
    host: 'your-hostname',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database',
};

class UserService {
    constructor() {
        this.connection = mysql.createConnection(dbConfig);
        this.connection.connect(err => {
            if (err) throw err;
            console.log('Connected to MySQL database');
        });
    }

    createUser(user) {
        return new Promise((resolve, reject) => {
            const { username, email } = user;
            const query = 'INSERT INTO users (username, email) VALUES (?, ?)';
            this.connection.query(query, [username, email], (error, results) => {
                if (error) return reject(error);
                const userId = results.insertId;
                resolve(userId);
            });
        });
    }

    getUserById(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            this.connection.query(query, [userId], (error, results) => {
                if (error) return reject(error);
                if (results.length === 0) return resolve(null);
                const userData = results[0];
                const user = new User(userData);
                resolve(user);
            });
        });
    }

    // Implement other CRUD operations like updateUser, deleteUser, getAllUsers, etc.
}

module.exports = new UserService();
