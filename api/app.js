const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();


/**
 * Express configuration.
 */
let httpServer = http.createServer(app);
// let httpsServer = https.createServer(credentials, app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Allow CORS all routes.
 */
app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    next();
});

/**
 * Controllers.
 */
const userController = require('./controllers/user');
const rentalController = require('./controllers/rental');
const boxController = require('./controllers/box');


/**
 * Routes.
 */
// app.post('/createUser', userController.createUser);
// app.post('/pickup', boxController.pickupRental);
app.get('/getBoxes', boxController.getBoxes);

app.post('/createBox', boxController.createBox);
app.post('/createRental', rentalController.createRental);
app.post('/pickup', rentalController.pickup);
app.post('/dropoff', rentalController.dropoff);

app.get('/hi', (req, res) => {
    console.log("hi");
    res.send('hi');
});
/**
 * Start Express server.
 */
httpServer.listen(8080, () => {
    console.log('http server running.')
});
