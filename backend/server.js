//create backend server with mysql connection
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());

//connect to mysql
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

//run server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Server started on port 8000');
});