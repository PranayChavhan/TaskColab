const express = require('express')
const cors = require('cors')



const app = express()

const con = require('./db/connect')

con.connect((err) => {
    if (err) console.log(err);
    console.log("Connected!");
});



//Test Route
app.get('', (req, res) => {
    res.json({ message: 'Hello App!' })
})


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`)
})