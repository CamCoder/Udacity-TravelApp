const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')
const dotenv = require('dotenv');
dotenv.config();

// Setup express
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Load website from this folder
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
    console.log('App listening on port 8082!')
})

const GEO_KEY = process.env.GEO_KEY;
const WBIT_KEY = process.env.WBIT_KEY;

// API
app.post('/travel', async (req, res) => {
    console.log(req.body.loc);
    const response = await fetch(`http://api.geonames.org/searchJSON?q=${req.body.loc}&maxRows=1&username=${GEO_KEY}`);
    try {
        const data = await response.json();
        res.send(data)
    } catch (error) {
        console.log("Error: ", error)
    }
} )

app.post('/weather', async (req, res) => {

    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.body.lat}&lon=${req.body.lng}&units=I&days=7&key=${WBIT_KEY}`);
    try {
        const data = await response.json();
        res.send(data)
    } catch (error) {
        console.log("Error: ", error)
    }
} )


