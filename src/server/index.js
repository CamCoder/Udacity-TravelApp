const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')
const dotenv = require('dotenv');
const app = express()
const path = require("path")

dotenv.config();

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Load website from this folder
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile(path.resolve('./dist/index.html') );
})

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('App listening on port 8082!')
})

