const Components = require('./_resources');
const Webhook = require('../objects/webhook');
const {
  getFromId,
  getAll,
  get,
  search,
  set,
  del,
  update,
  create,
} = require('./_methods')(Webhook);

class Webhooks extends Components {
  constructor(request) {
    super([getFromId, getAll, get, search, set, del, update, create]);
    this.request = request;
    this.apiPath = 'webhooks';
    this.ResConstructor = Webhook;
  }
}

module.exports = Webhooks;
