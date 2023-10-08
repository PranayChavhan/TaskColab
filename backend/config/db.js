//Create Connection FOR MYSQL
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'https://macaronic-controls.000webhostapp.com/',
    user: 'id21370235_ayush',
    password: 'Pass@123',
    database: 'id21370235_taskcollab'
});

module.exports = db;