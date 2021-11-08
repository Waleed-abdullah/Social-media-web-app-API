require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const app = express()

const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    port: process.env.SQL_PORT
})

connection.connect((err) => {
    if (err) {
        throw err
    }
    else {
        console.log("Connected")
    }
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening to localhost:${port}`))

