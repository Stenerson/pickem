var PicksAppDispatcher = require('../dispatcher/PicksAppDispatcher');
var PicksConstants = require('../constants/PicksConstants');
var AppStateStore = require('../stores/AppStateStore');
var GameStore = require('../stores/GameStore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = PicksConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _players = [];


function _addPlayers(players) {
  _players = players;
  _updatePlayerPoints();
}

function _highlightPlayer(player) {
  _players.forEach(function(_player) {
    _player.highlight = false;
  });
  player.highlight = true;
}


function _updatePlayerPoints() {
  var games = GameStore.getAll();
  _players.forEach(function(player) {
    var sumEarned = 0,
    sumLost = 0;
    player.picks.forEach(function(pick) {
      var game = games[pick.gameId];
      if (game.isOver === true || game.userSelected === true) {
        if (pick.pick === game.winner) {
          pick.isCorrect = true;
          sumEarned += pick.points;
        } else {
          pick.isCorrect = false;
          sumLost += pick.points;
        }
      } else {
        pick.isCorrect = null;
      }
    });
    player.earnedPoints = sumEarned;
    player.lostPoints = sumLost;
  });
  _sortPlayers();
}

function _sortPlayers() {
  var sortOrder = AppStateStore.getSortOrder();
  _players.sort(function(a,b) {
    if (sortOrder === PicksConstants.SortOptions.POTENTIAL) {
      return _potentialSort(a,b,true);
    } else {
      // Default to POINTS for now
      return _pointsSort(a,b,true);
    }
  });
}

function _pointsSort(a,b,breakTie) {
  if (a.earnedPoints > b.earnedPoints) {
    return -1;
  }
  if (a.earnedPoints < b.earnedPoints) {
    return 1;
  }
  if (breakTie && a.lostPoints !== b.lostPoints) {
    return _potentialSort(a,b,false) // Add third param to avoid endless loop
  };
  // If we still don't have an outcome sort by their original order (their ID)
  return a.id > b.id ? 1 : -1;
}

function _potentialSort(a,b,breakTie) {
  if (a.lostPoints > b.lostPoints) {
    return 1;
  }
  if (a.lostPoints < b.lostPoints) {
    return -1;
  }
  if (breakTie && a.earnedPoints !== b.earnedPoints) {
    return _pointsSort(a,b,false) // Add third param to avoid endless loop
  };
  // If we still don't have an outcome sort by their original order (their ID)
  return a.id > b.id ? 1 : -1;
}

var PlayerStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  newPlayer: function(attrs) {
    return $.extend({
      id: null,
      name: null,
      picks: [],
      earnedPoints: 0,
      lostPoints: 0,
      highlight: false
    }, attrs);
  },

  getActivePlayer: function() {
    return _players.filter(function( player ) {
        return player.highlight === true;
    })[ 0 ];
  },

  getAll: function() {
    return _players;
  },

  getPlace: function(player) {
    return _players.indexOf(player) + 1;
  },

  getId: function(id) {
    return _players.filter(function( player ) {
        return player.id === id;
    })[ 0 ];
  }
});

PlayerStore.dispatchToken = PicksAppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.RECEIVE_PLAYERS:
      _addPlayers(action.players);
      PlayerStore.emitChange();
      break;

    case ActionTypes.USER_SELECT_GAME_WINNER:
    case ActionTypes.RESET_GAMES:
      PicksAppDispatcher.waitFor([GameStore.dispatchToken]);
      _updatePlayerPoints();
      PlayerStore.emitChange();
      break;

    case ActionTypes.HIGHLIGHT_PLAYER:
      _highlightPlayer(action.player);
      PlayerStore.emitChange();
      break;

    case ActionTypes.CLICK_SORT:
      PicksAppDispatcher.waitFor([AppStateStore.dispatchToken]);
      _sortPlayers();
      PlayerStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = PlayerStore;