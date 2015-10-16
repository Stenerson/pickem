var PicksAppDispatcher = require('../dispatcher/PicksAppDispatcher');
var PicksConstants = require('../constants/PicksConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = PicksConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _games = [];


function _addGames(games) {
  _games = games;
}

var GameStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  newGame: function(attrs) {
    return $.extend({
      id: null,
      favorite: null,
      underdog: null,
      spread: null,
      isOver: false,
      winner: null,
      originalWinner: null,
      userSelected: false,
    }, attrs);
  },

  userSelectGameWinner: function(game, team) {
    if (game.isOver && !game.originalWinner) {
      game.originalWinner = game.winner;
    };
    if (team === null) { // Reset
      game.userSelected = false;
      if (game.isOver) {
        game.winner = game.originalWinner;
      } else {
        game.winner = null;
      }
    } else {
      game.winner = team;
      game.userSelected = !(game.winner === game.originalWinner);
    }
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