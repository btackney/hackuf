const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
require('dotenv').config();

/**
 * Express configuration.
 */
let httpServer = http.createServer(app);
// let httpsServer = https.createServer(credentials, app);

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
const pageController = require('./controllers/page');
const signController = require('./controllers/sign');


/**
 * Routes.
 */
app.get('/pickup', (req,res) => {
    console.log("sup");
    res.json("hi")
});

app.get('/pickup', signController.runSign);

/**
 * Start Express server.
 */
httpServer.listen(8080, () => {
    console.log('http server running.')
});
