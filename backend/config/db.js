//Create Connection FOR MYSQL
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ayush2413',
    database: 'test_db'
});

module.exports = db;