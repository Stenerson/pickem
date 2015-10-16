var PicksAppDispatcher = require('../dispatcher/PicksAppDispatcher');
var PicksConstants = require('../constants/PicksConstants');

var ActionTypes = PicksConstants.ActionTypes;

module.exports = {

  receiveGames: function(games) {
    PicksAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_GAMES,
      games: games
    });
  },

  receivePlayers: function(players) {
    PicksAppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_PLAYERS,
      players: players
    });
  }

};