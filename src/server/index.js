const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')
const dotenv = require('dotenv');
dotenv.config();

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Load website from this folder
app.use(express.static('dist'))

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('App listening on port 8082!')
})