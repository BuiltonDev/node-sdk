const Components = require('./_resources');
const Payment = require('../objects/payment');
const {
  create,
  getFromId,
  getAll,
  get,
  search,
  set,
  update,
  del,
} = require('./_methods')(Payment);

class Payments extends Components {
  constructor(request) {
    super([create, getFromId, getAll, get, search, set, update, del]);
    this.request = request;
    this.apiPath = 'payments';
    this.ResConstructor = Payment;
  }

  pay(id, ...params) {
    const obj = new Payment(this.request, id);
    return obj.pay(...params);
  }

  confirm(id, ...params) {
    const obj = new Payment(this.request, id);
    return obj.confirm(...params);
  }
}

module.exports = Payments;
