const Components = require('./_resources');
const Plan = require('../objects/plan');
const {
  getFromId,
  getAll,
  get,
  search,
  set,
  del,
  update,
  create,
} = require('./_methods')(Plan);

class Plans extends Components {
  constructor(request) {
    super([getFromId, getAll, get, search, set, del, update, create]);
    this.request = request;
    this.apiPath = 'plans';
    this.ResConstructor = Plan;
  }

  getSubscriptions(id, ...params) {
    const obj = new Plan(this.request, id);
    return obj.getSubscriptions(...params);
  }
}

module.exports = Plans;
