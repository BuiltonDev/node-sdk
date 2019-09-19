const Component = require('./_objects');
const Subscription = require('./subscription');
const {
  get,
  refresh,
  del,
  update,
} = require('./_methods');

class Plan extends Component {
  constructor(request, props) {
    super(request, props, [get, refresh, del, update]);
    this.apiPath = 'plans';
  }

  getSubscriptions({ urlParams, json = false } = {}, done) {
    return this.query({
      type: 'get', resource: 'subscriptions', urlParams, json, ResConstructor: Subscription,
    }, done);
  }
}

module.exports = Plan;
