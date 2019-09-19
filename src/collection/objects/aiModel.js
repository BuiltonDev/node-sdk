const Component = require('./_objects');
const {
  get,
  refresh,
  del,
} = require('./_methods');

class AIModel extends Component {
  constructor(request, props) {
    super(request, props, [get, refresh, del]);
    this.apiPath = 'ai/models';
  }

  getRecommendations(body, { urlParams } = {}, done) {
    return this.query({
      type: 'post', resource: 'invoke', body, urlParams, ResConstructor: null,
    }, done);
  }

  train({ urlParams, json } = {}, done) {
    return this.query({
      type: 'post', resource: 'train', urlParams, json,
    }, done);
  }

  createVersion({ urlParams, json } = {}, done) {
    return this.query({
      type: 'post', urlParams, json,
    }, done);
  }
}

module.exports = AIModel;
