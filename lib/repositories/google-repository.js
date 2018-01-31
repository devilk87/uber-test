/**
 * Created by kina on 1/31/18.
 */

const request = require('request');
const Promise = require('bluebird');
const rocess = require('process');
const config = require('config');

const apiKey = process.env.googleApiKey;
const apiUrl = config.googleApiUrl;

exports.getCoordinates = function (language, address) {
    return new Promise((resolve, reject) => {
        request.get({
            url: apiUrl,
            qs: {
                key: apiKey,
                address: address,
                language: language
            },
            json:true
        }, function (err, res, body) {
            if (err) {
                reject(err);
            } else if (res.statusCode === 200) {
                resolve(body);
            } else {
                reject(body);
            }
        });
    });
};
