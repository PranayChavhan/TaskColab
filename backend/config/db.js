//Create Connection FOR MYSQL
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taskcollab'
});

module.exports = db;