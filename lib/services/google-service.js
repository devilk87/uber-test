/**
 * Created by kina on 1/31/18.
 */

const googleRepo = require('../repositories/google-repository');
const Promise = require('bluebird');

exports.getAddressess = function (lang, address) {
    return new Promise((resolve, reject) => {
        googleRepo.getCoordinates(lang, address).then(addresses => {
            let addr = addresses.results.map(item => {
                return {
                    formatted_address: item.formatted_address,
                    location: item.geometry.location
                }
            });
            resolve(addr);
        }, err => {
            reject(err);
        });
    });
};
