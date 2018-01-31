const uberService = require('../services/uber-service');

exports.uberGet = function (req, res) {
    uberService.estimatesPrice(req.query).then(prices => {
        res.json(prices);
    }, err => {
        res.json({err: err});
    });
};