/**
 * Created by kina on 1/31/18.
 */
const uberRepository = require('../repositories/uber-repository');
const getSymbolFromCurrency = require('currency-symbol-map');

const Promise = require('bluebird');

function calculateDiscount(price) {
    return Math.round(price * 0.8);
}

/**
 * @param moduleName
 * @param currencyCode
 * @returns string
 */
function formatEstimation(price, currencyCode) {
    if (currencyCode == 'UAH') {
        return `${price}${getSymbolFromCurrency(currencyCode)}`;
    } else {
        return `${getSymbolFromCurrency(currencyCode)}${price}`;
    }
}

exports.getPrices = function getPrices (query) {
    const geoCoordinates = {
        start_latitude: query.start.location.lat,
        start_longitude: query.start.location.lng,
        end_latitude: query.end.location.lat,
        end_longitude: query.end.location.lng
    };
    return new Promise((resolve, reject) => {
        uberRepository.estimatesPrice(geoCoordinates).then(prices => {
            resolve(prices.map(item => {
                let highEstimate = calculateDiscount(item.high_estimate);
                return {
                    display_name: `After${item.localized_display_name}`,
                    distance: `${item.distance}km`,
                    product_id: item.product_id,
                    estimate: formatEstimation(highEstimate, item.currency_code)
                }
            }))
        }, err => {
            reject(err);
        });
    });
};
