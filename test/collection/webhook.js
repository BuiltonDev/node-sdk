const assert = require('assert');
const nock = require('nock');
const Builton = require('../../src/main.js');

const endpoint = 'https://example.com';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const sa = new Builton({ apiKey: 'dummy', bearerToken, endpoint });

const webhooksFile = require('../fetchmock/webhooks.json');

describe('Webhook related tests', () => {
  it('Should return all the webhooks', (done) => {
    const [page, size] = [0, 100]; // defaults
    nock(endpoint)
      .get('/webhooks')
      .query({ size, page })
      .reply(200, webhooksFile);
    sa.webhooks.getAll({}, (err, pagedWebhooks) => {
      assert.ok(Array.isArray(pagedWebhooks.current));
      assert.ok(webhooksFile[0]._id.$oid === pagedWebhooks.current[0].id);
      done();
    });
  });
  it('Should create a webhooks', (done) => {
    nock(endpoint)
      .post('/webhooks')
      .reply(200, webhooksFile[0]);
    const whEndpoint = 'https://www.google.com';
    sa.webhooks.create({ endpoint: whEndpoint, event_type: 'order.created' }, {}, (err, wh) => {
      assert.ok(wh.endpoint === whEndpoint);
      done();
    });
  });
});
