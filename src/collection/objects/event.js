const Component = require('./_objects');
const {
  get,
  refresh,
} = require('./_methods');

class Event extends Component {
  constructor(request, props) {
    super(request, props, [get, refresh]);
    this.apiPath = 'events';
  }
}

module.exports = Event;
