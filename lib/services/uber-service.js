/**
 * Created by kina on 1/31/18.
 */
const uberRepo = require('../repositories/uber-repository');
const getSymbolFromCurrency = require('currency-symbol-map');

const promise = require('bluebird');

function calculateDiscount(price) {
    return Math.round(price * 0.8);
}

function formatEstimation(price, currencyCode) {
    if (currencyCode == 'UAH') {
        return `${price}${getSymbolFromCurrency(currencyCode)}`;
    } else {
        return `${getSymbolFromCurrency(currencyCode)}${price}`;
    }
}

exports.estimatesPrice = function (geoCoordinates) {
    return new promise((resolve, reject) => {
        uberRepo.estimatesPrice(geoCoordinates).then(prices => {
            console.log(prices[0]);
            resolve(prices.map(item => {
                const highEstimate = calculateDiscount(item.high_estimate);
                return {
                    display_name: `After${item.localized_display_name}`,
                    distance: `${item.distance}km`,
                    product_id: item.product_id,
                    estimate: formatEstimation(highEstimate, item.currency_code)
                }
            }))
        },
        err => {
            reject(err);
        });
    });
};
