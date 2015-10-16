var PicksAppDispatcher = require('../dispatcher/PicksAppDispatcher');
var PicksConstants = require('../constants/PicksConstants');
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
  player.highlight = !player.highlight;
}


function _updatePlayerPoints() {
  var games = GameStore.getAll();
  _players.forEach(function(player) {
    var sum = 0;
    player.picks.forEach(function(pick) {
      var game = games[pick.gameId];
      if (game.isOver === true || game.userSelected === true) {
        if (pick.pick === game.winner) {
          pick.isCorrect = true;
          sum += pick.points;
        } else {
          pick.isCorrect = false;
        }
      } else {
        pick.isCorrect = null;
      }
    });
    player.earnedPoints = sum;
  });
  _sortPlayers();
}

function _sortPlayers() {
  _players.sort(function(a,b) {
    if (a.earnedPoints > b.earnedPoints) {
      return -1;
    }
    if (a.earnedPoints < b.earnedPoints) {
      return 1;
    }
    // If they are equal, order by their original order (their ID)
    return a.id > b.id ? 1 : -1;
  });
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
      earnedPoints: 92,
      highlight: false
    }, attrs);
  },

  getAll: function() {
    return _players;
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
      PicksAppDispatcher.waitFor([GameStore.dispatchToken]);
      _updatePlayerPoints();
      PlayerStore.emitChange();
      break;

    case ActionTypes.HIGHLIGHT_PLAYER:
      _highlightPlayer(action.player);
      PlayerStore.emitChange();
      break;


    // TODO: reorder players
    // case ActionTypes.USER_SELECT_GAME_WINNER:
    //   PlayerStore.userSelectGameWinner(action.data.game, action.data.team);
    //   PlayerStore.emitChange();
    //   break;

    default:
      // do nothing
  }

});

module.exports = PlayerStore;