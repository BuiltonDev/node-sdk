const Components = require('./_resources');
const AiModel = require('../objects/aiModel');
const {
  create,
  getFromId,
  getAll,
  get,
  search,
  set,
  del,
} = require('./_methods')(AiModel);

class AIModels extends Components {
  constructor(request) {
    super([create, getFromId, getAll, get, search, set, del]);
    this.request = request;
    this.apiPath = 'ai/models';
    this.ResConstructor = AiModel;
  }

  getRecommendations(id, ...params) {
    const obj = new AiModel(this.request, id);
    return obj.getRecommendations(...params);
  }

  train(id, ...params) {
    const obj = new AiModel(this.request, id);
    return obj.train(...params);
  }

  createVersion(id, ...params) {
    const obj = new AiModel(this.request, id);
    return obj.createVersion(...params);
  }
}

module.exports = AIModels;
