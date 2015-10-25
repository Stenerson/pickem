var PicksAppDispatcher = require('../dispatcher/PicksAppDispatcher');
var PicksConstants = require('../constants/PicksConstants');

var ActionTypes = PicksConstants.ActionTypes;

module.exports = {

  init: function() {
    PicksAppDispatcher.dispatch({
      type: ActionTypes.APP_INIT,
      data: {}
    });
  },

  lock: function(_lock) {
    PicksAppDispatcher.dispatch({
      type: ActionTypes.CLICK_LOCK,
      data: {lock: _lock}
    });
  }

};