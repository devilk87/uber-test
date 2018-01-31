/**
 * Created by kina on 1/31/18.
 */

const {getAddressess} = require('../services/google-service');

exports.controller = app => {
    app.get('/:language/address/:address', function (req, res) {
        req.checkParams('language', 'Parameter `language` should be 2 letters').notEmpty().isLength({min: 2, max: 2});
        req.checkParams('address', 'Please check `address` parameter').notEmpty();
        req.getValidationResult().then((validationResult) => {
            if (!validationResult.isEmpty()) {
                res.status(400).json({ok: false, errors: validationResult.array()});
                return;
            }
            getAddressess(req.params.language, req.params.address).then(addresses => {
                res.json({ok: true, addresses: addresses});
            }, err => {
                res.status(500).json({ok:false, err: err});
            });
        });
    });
};

