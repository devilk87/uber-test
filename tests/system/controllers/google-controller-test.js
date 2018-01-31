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

describe('Google Controller class', () => {
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

    describe('Google api available', () => {
        const dataset = {
            "results":[
                {
                    "address_components":[
                        {"long_name":"Kyiv","short_name":"Kyiv","types":["locality","political"]},
                        {"long_name":"Kyiv City","short_name":"Kyiv City","types":["administrative_area_level_2","political"]},
                        {"long_name":"Ukraine","short_name":"UA","types":["country","political"]},
                        {"long_name":"02000","short_name":"02000","types":["postal_code"]}
                        ],
                    "formatted_address":"Kyiv, Ukraine, 02000",
                    "geometry":{
                        "bounds": {"northeast":{"lat":50.590798,"lng":30.825941},"southwest":{"lat":50.213273,"lng":30.2394401}},
                        "location":{"lat":50.4501,"lng":30.5234},
                        "location_type":"APPROXIMATE",
                        "viewport":{
                            "northeast":{"lat":50.590798,"lng":30.825941},
                            "southwest":{"lat":50.213273,"lng":30.2394401}
                        }
                    },
                    "place_id":"ChIJBUVa4U7P1EAR_kYBF9IxSXY",
                    "types":["locality","political"]}],
            "status":"OK"};

        const firstResultExpected = {
            "formatted_address":"Kyiv, Ukraine, 02000",
            "location":{"lat":50.4501,"lng":30.5234}
        };

        beforeEach(() => {
            const googleRepository = require('../../../lib/repositories/google-repository');
            sinonSandbox.stub(googleRepository, 'getCoordinates').value(() => Promise.resolve(dataset));
        });

        it('should return array of products', done => {
            chai.request(app).get(`/ru/address/kiev`).query().end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.hasException).to.not.be.ok;
                expect(res.body.ok).to.be.true;
                expect(res.body.addresses).to.be.an('array').that.have.lengthOf(1);
                expect(res.body.addresses[0]).to.deep.include(firstResultExpected);
                done();
            });
        });
    });
});
