//create backend server with mysql connection
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes');
const projectRoutes = require('./routes/projectRoutes');


const app = express();

app.use(cors());
app.use(express.json());

dotenv.config({ path: './.env' });

//Development
// //check connection
// db.connect((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("DB Connected!")
//     }
// });
//Test Route

//Production
const con = mysql.createPool("mysql://admin:AyUsDUrveshPraN@database-1.cqmmqqerazz0.ap-south-1.rds.amazonaws.com/taskcollab");


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Taskcollab!' });
});

app.use(router);



//run server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Server started on port 8000');
});