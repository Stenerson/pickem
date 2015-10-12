var PicksAppDispatcher = require('../dispatcher/PicksAppDispatcher');
var PicksConstants = require('../constants/PicksConstants');

var ActionTypes = PicksConstants.ActionTypes;

module.exports = {

  receiveAll: function(games) {
    PicksAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_GAMES,
      games: games
    });
  }

};