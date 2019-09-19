const Components = require('./_resources');
const Event = require('../objects/event');
const {
  getFromId,
  getAll,
  get,
  set,
  search,
} = require('./_methods')(Event);

class Events extends Components {
  constructor(request) {
    super([getFromId, getAll, get, set, search]);
    this.request = request;
    this.apiPath = 'events';
    this.ResConstructor = Event;
  }
}

module.exports = Events;
