/**
 * Created by kina on 1/31/18.
 */

const express = require('express');
const bodyParser = require('body-parser');
const process = require('process');
const config = require('config');
const expressValidator = require('express-validator');

const frontController = require('./lib/controllers/front-controller');
const uberController = require('./lib/controllers/uber-controller');
const googleController = require('./lib/controllers/google-controller');

const app = express();
const port = config.port;

app.listen(port);

console.log(`App started at port:${port} ENV:${process.env.NODE_ENV}`);

app.use(bodyParser.json({ type: 'application/json'}));
app.use(express.static(__dirname + '/public'));
app.use(expressValidator());

frontController.controller(app);
uberController.controller(app);
googleController.controller(app);

exports.app = app;

