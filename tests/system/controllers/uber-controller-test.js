'use strict';

const Promise = require('bluebird');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

chai.should();
chai.use(chaiHttp);
const {expect} = chai;

let sinonSandbox = null;
let app;

describe('Uber Controller class', () => {
    before((done) => {
        app = require('../../../app').app;
        done();
    });

    beforeEach(() => {
        sinonSandbox = sinon.sandbox.create();
    });
    afterEach(() => {
        sinonSandbox.restore();
    });

    describe('UberApi available', () => {
        const dataset = [
            {
                localized_display_name: 'uber_X',
                distance: 8.21,
                display_name: 'uber_X',
                product_id: '44fb9080-5962-423d-8001-04b00a6b9b25',
                high_estimate: 124,
                low_estimate: 100,
                duration: 1320,
                estimate: 'UAH100-124',
                currency_code: 'UAH'
            },
            {
                localized_display_name: 'uberSELECT',
                distance: 8.21,
                display_name: 'uberSELECT',
                product_id: '2603131a-5bab-4d81-846f-29ce1ee569b5',
                high_estimate: 135,
                low_estimate: 109,
                duration: 1320,
                estimate: 'UAH109-135',
                currency_code: 'UAH'
            }];

        const firstResultExpected = {
            display_name: "Afteruber_X",
            distance: "8.21km",
            estimate:"99₴",
            product_id: "44fb9080-5962-423d-8001-04b00a6b9b25"
        };

        beforeEach(() => {
            const uberRepository = require('../../../lib/repositories/uber-repository');
            sinonSandbox.stub(uberRepository, 'estimatesPrice').value(() => Promise.resolve(dataset));
        });

        it('should return array of products', done => {
            chai.request(app).get(`/afteruber/prices`).query({
                start: {
                    location: {
                        lat: 50,
                        lng: 50
                    }
                },
                end: {
                    location: {
                        lat: 50,
                        lng: 50
                    }
                },
            }).end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.ok).to.be.true;
                expect(res.body.prices).to.be.an('array').that.have.lengthOf(2);
                expect(res.body.prices[0]).to.deep.include(firstResultExpected);
                done();
            });
        });

        it('should fails if no query params', done => {
            chai.request(app).get(`/afteruber/prices`).end((err, res) => {
                expect(res).to.have.status(422);
                expect(res.body.ok).to.be.false;
                expect(res.body.errors).to.have.keys('start.location.lat', 'start.location.lng','end.location.lat', 'end.location.lng');
                done();
            });
        });

        it('should fails if one of params not decimal', done => {
            chai.request(app).get(`/afteruber/prices`).query({
                start: {
                    location: {
                        lat: 50,
                        lng: 'dd90'
                    }
                },
                end: {
                    location: {
                        lat: 50,
                        lng: 50
                    }
                },
            }).end((err, res) => {
                expect(res).to.have.status(422);
                expect(res.body.ok).to.be.false;
                expect(res.body.errors).to.have.keys('start.location.lng');
                done();
            });
        });
    });

    describe('UberApi unavailable', () => {
        beforeEach(() => {
            const uberRepository = require('../../../lib/repositories/uber-repository');
            sinonSandbox.stub(uberRepository, 'estimatesPrice').value(() => Promise.reject({error_message: 'some'}));
        });

        it('should fails if uber not available', done => {
            chai.request(app).get(`/afteruber/prices`).end((err, res) => {
                expect(res).to.have.status(500);
                expect(res.body.ok).to.be.false;
                done();
            });
        });
    });
});
