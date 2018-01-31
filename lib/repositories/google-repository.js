/**
 * Created by kina on 1/31/18.
 */

const request = require('request');
const promise = require('bluebird');

const apiKey = 'AIzaSyDfsN8gIgfA4Da7Sdwl8l8gK-uMAOzM_TM';
const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json`;

exports.getCoordinates = function (language, address) {
    return new promise((resolve, reject) => {
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
