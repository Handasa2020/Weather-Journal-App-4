// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
/* Dependencies */
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server - Check activity with port indicator
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
});

// Create Primary GET route which gets all data 
// localhost:8080/all 
app.get('/all', (req, res) => {
    res.send(projectData)
});

// Create Secondary POST route to hold the values
// localhost:8080/all
app.post('/all', (req, res) => {
    console.log(req.body);
    // projectData = {};
    let newEntry = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    };
    projectData = newEntry;
});