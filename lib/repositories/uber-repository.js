/**
 * Created by kina on 1/31/18.
 */

const request = require('request');
const promise = require('bluebird');

const apiUrl = 'https://sandbox-api.uber.com/v1.2';
// const apiUrl = 'https://api.uber.com/v1.2';
const clientId = 'v6segMoIpIuOPVZ8CPtZTqwn6QVK-1zV';
const clientSecret = 'g70zXI-qQdyb2jDdEE3m5u1clhl0a6Tf_LtbfzIw';
const serverToken = 'rXFtyR-_8FnRpknNVFkDlkb1Psi_B-bdVa2mD_Pf';

exports.estimatesPrice = function (query) {
    console.log(query);
    const geoCoordinates = {
        start_latitude: query.start.location.lat,
        start_longitude: query.start.location.lng,
        end_latitude: query.end.location.lat,
        end_longitude: query.end.location.lng
    };
    // const geoCoordinates = {
    //     start_latitude: 37.7752315,
    //     start_longitude: -122.418075,
    //     end_latitude: 37.7752415,
    //     end_longitude: -122.518075
    // };
    return new promise((resolve, reject) => {
        request.get({
            url: `${apiUrl}/estimates/price`,
            qs: geoCoordinates,
            headers: {
                'Authorization': `Token ${serverToken}`
            },
            json:true
        }, function (err, res, body) {
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
