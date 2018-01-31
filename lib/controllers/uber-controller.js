const { getPrices } = require('../services/uber-service');
const { check, validationResult } = require('express-validator/check');

exports.controller = app => {
    app.get('/afteruber/prices',
        [
            check('start[location][lat]').isDecimal(),
            check('start[location][lng]').isDecimal(),
            check('end[location][lat]').isDecimal(),
            check('end[location][lng]').isDecimal()
        ],
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ ok: false, errors: errors.mapped() });
            }
            getPrices(req.query).then(prices => {
                res.json({ok: true, prices: prices});
            }, err => {
                res.status(500).json({ok: false, err: err});
            });
        }
    );
};
