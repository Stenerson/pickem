var PicksAppDispatcher = require('../dispatcher/PicksAppDispatcher');
var PicksConstants = require('../constants/PicksConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = PicksConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _games = [];


function _addGames(games) {
  games.forEach(function(game) {
    if (!_games[game.id]) {
      _games[game.id] = game
    }
  });
}

var GameStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  userSelectGameWinner: function(game, team) {
    var _game = _games[game.id];
    if (game.isOver && !_game.originalWinner) {
      _game.originalWinner = _game.winner;
    };
    _game.winner = team;
    _game.userSelected = !(_game.winner === _game.originalWinner);

    _games[_game.id] = _game;
  },

  getAll: function() {
    return _games;
  }
});

GameStore.dispatchToken = PicksAppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.RECEIVE_GAMES:
      _addGames(action.games);
      GameStore.emitChange();
      break;

    case ActionTypes.USER_SELECT_GAME_WINNER:
      GameStore.userSelectGameWinner(action.data.game, action.data.team);
      GameStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = GameStore;