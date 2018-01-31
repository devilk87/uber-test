/**
 * Created by kina on 1/31/18.
 */

const googleService = require('../services/google-service');

exports.geocoding = function (req, res) {
    googleService.getAddressess(req.params.language, req.params.address).then(addresses => {
        res.json({addresses});
    }, err => {
        res.json({err: err});
    });
};
