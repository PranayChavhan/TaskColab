const mysql = require('mysql')


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ayush2413',
    database: 'mydb'
});

module.exports = con;