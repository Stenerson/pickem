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

    default:
      // do nothing
  }

});

module.exports = GameStore;