//Create Connection FOR MYSQL
const mysql = require('mysql');

// Devwelopment
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'taskcollab',
//     port: 3308,
// });

// Production

const db = mysql.createPool("mysql://admin:AyUsDUrveshPraN@database-1.cqmmqqerazz0.ap-south-1.rds.amazonaws.com/taskcollab");

module.exports = db;