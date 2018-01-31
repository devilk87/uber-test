const uberService = require('../services/uber-service');

exports.getPrices = function (req, res) {
    uberService.getPrices(req.query).then(prices => {
        res.json(prices);
    }, err => {
        res.json({err: err});
    });
};