var PicksAppDispatcher = require('../dispatcher/PicksAppDispatcher');
var PicksConstants = require('../constants/PicksConstants');

var ActionTypes = PicksConstants.ActionTypes;

module.exports = {

  userSelectGameWinner: function(game, team) {
    PicksAppDispatcher.dispatch({
      type: ActionTypes.USER_SELECT_GAME_WINNER,
      data: {game: game, team: team}
    });
  },

  resetGames: function() {
    PicksAppDispatcher.dispatch({
      type: ActionTypes.RESET_GAMES,
      data: {}
    });
  }

};