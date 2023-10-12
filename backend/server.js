//create backend server with mysql connection
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const db = require('./config/db');
const dotenv = require('dotenv');
const router = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

//check connection
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB Connected!")
    }
});
//Test Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Taskcollab!' });
});

//Auth Routes
app.use(router);

//run server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Server started on port 8000');
});