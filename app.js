/**
 * Created by kina on 1/31/18.
 */

const express = require('express');
const bodyParser = require('body-parser');

const frontController = require('./lib/controllers/front-controller');
const uberController = require('./lib/controllers/uber-controller');
const googleController = require('./lib/controllers/google-controller');

const app = express();
const port = 3599;

app.listen(port);


app.use(bodyParser.json({ type: 'application/json'}));
app.use(express.static(__dirname + '/public'));

app.get('/', frontController.index);
app.get('/afteruber/prices', uberController.uberGet);
app.get('/:language/address/:address', googleController.geocoding);


