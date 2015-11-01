var PicksAppDispatcher = require('../dispatcher/PicksAppDispatcher');
var PicksConstants = require('../constants/PicksConstants');
var AppStateStore = require('../stores/AppStateStore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = PicksConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _games = [];


function _addGames(games) {
  _games = games;
}

function _resetGames() {
  _games.forEach(function(game) {
    _resetGame(game);
  });
}

function _resetGame(game) {
  game.userSelected = false;
  if (game.isOver) {
    game.winner = game.originalWinner;
  } else {
    game.winner = null;
  }
}

function _selectPicksFor(player) {
  isLocked = AppStateStore.isLocked();
  _games.forEach(function(game) {
    if (!game.isOver || !isLocked) {
      _userSelectGameWinner(game, player.picks[game.id].pick);
    }
  });
}

function _userSelectGameWinner(game, team) {
  if (game.isOver && !game.originalWinner) {
    game.originalWinner = game.winner;
  };
  if (team === null) { // Reset
    _resetGame(game);
  } else {
    game.winner = team;
    game.userSelected = !(game.winner === game.originalWinner);
  }
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
      _userSelectGameWinner(action.data.game, action.data.team);
      GameStore.emitChange();
      break;

    case ActionTypes.RESET_GAMES:
      _resetGames();
      GameStore.emitChange();
      break;

    case ActionTypes.SELECT_ALL_PLAYER_PICKS:
      _selectPicksFor(action.data.player);
      GameStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = GameStore;