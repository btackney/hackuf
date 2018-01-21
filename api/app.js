const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const express = require('express');
const fs        = require('fs');
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
 * Middle Ware.
 */
const auth = require('./middleware/auth');

/**
 * Routes.
 */
//User Management
app.post('/createUser', userController.preUser, userController.createUser);
// app.post('/updateUser', userController.updateUser);

//Box Controller
app.get('/getBoxes', boxController.getBoxes);
app.post('/createBox', boxController.createBox);

//Rental Controller
app.post('/createRental', rentalController.createRental);
app.post('/pickupPin', auth.checkPin, rentalController.pickup);
app.post('/pickupFace',  auth.checkFace, rentalController.pickup);
app.post('/dropoffPin', auth.checkPin, rentalController.dropoff);
app.post('/dropoffFace',  auth.checkFace, rentalController.dropoff);

/**
 * Start Express server.
 */
httpServer.listen(8080, () => {
    console.log('http server running.')
});
