//Create Connection FOR MYSQL
const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME
// });

const con = mysql.createPool("mysql://admin:AyUsDUrveshPraN@database-1.cqmmqqerazz0.ap-south-1.rds.amazonaws.com/taskcollab");




module.exports = con;