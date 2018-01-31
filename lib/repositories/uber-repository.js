/**
 * Created by kina on 1/31/18.
 */

const request = require('request');
const Promise = require('bluebird');
const process = require('process');
const config = require('config');
const apiUrl = config.uberApiUrl;

const serverToken = process.env.uberServerToken;

exports.estimatesPrice = function estimatesPrice (geoCoordinates) {
    return new Promise((resolve, reject) => {
        request.get({
            url: `${apiUrl}/estimates/price`,
            qs: geoCoordinates,
            headers: {
                'Authorization': `Token ${serverToken}`
            },
            json:true
        }, function (err, res, body) {
            console.log(body.prices);
            if (err) {
                reject(err);
            } else if (res.statusCode === 200) {
                resolve(body.prices);
            } else {
                reject(body);
            }
        });
    });
};
