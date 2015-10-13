var PicksAppDispatcher = require('../dispatcher/PicksAppDispatcher');
var PicksConstants = require('../constants/PicksConstants');

var ActionTypes = PicksConstants.ActionTypes;

module.exports = {

  highlightPlayer: function(player) {
    PicksAppDispatcher.dispatch({
      type: ActionTypes.HIGHLIGHT_PLAYER,
      player: player
    });
  }

};