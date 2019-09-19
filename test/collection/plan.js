const assert = require('assert');
const nock = require('nock');
const Builton = require('../../src/main.js');

const endpoint = 'https://example.com';
const bearerToken = 'SERVICE_ACCOUNT_KEY';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

const plansFile = require('../fetchmock/plans.json');

describe('Plan', () => {
  it('Should return all the plans', (done) => {
    nock(endpoint)
      .get(`/plans/${plansFile[0]._id.$oid}`)
      .reply(200, plansFile);
    sa.plans.set(plansFile[0]).get({}, (err, plans) => {
      assert.ok(Array.isArray(plans));
      assert.ok(plansFile[0]._id.$oid === plans[0].id);
      done();
    });
  });
});
