/**
 * Created by kina on 1/31/18.
 */

const express = require('express');
const bodyParser = require('body-parser');
const process = require('process');
const config = require('config');
const expressValidator = require('express-validator');

const controllersLoader = require('./lib/helpers/controllers-loader');

const app = express();
const port = config.port;

app.listen(port);

console.log(`App started at port:${port} ENV:${process.env.NODE_ENV}`);

app.use(bodyParser.json({ type: 'application/json'}));
app.use(express.static(__dirname + '/public'));
app.use(expressValidator());


controllersLoader.gatherControllers(app, __dirname);

exports.app = app;

