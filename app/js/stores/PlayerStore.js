var PicksAppDispatcher = require('../dispatcher/PicksAppDispatcher');
var PicksConstants = require('../constants/PicksConstants');
var GameStore = require('../stores/GameStore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = PicksConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _players = [];


function _addPlayers(players) {
  players.forEach(function(player) {
    if (!_players[player.id]) {
      _players[player.id] = player
    }
  });
  _tallyPoints(true);
}

function _highlightPlayer(player) {
  player.highlight = !player.highlight;
}

function _tallyPoints(sort) {
  var games = GameStore.getAll();
  _players.forEach(function(player) {
    var sum;
    sum = player.picks.reduce(function(previousValue, pick, index, picksArray) {
      var game = games[pick.gameId];
      if (pick.pick === game.winner) {
        return previousValue + pick.points;
      } else {
        return previousValue;
      }
    },0); // initial value
    player.earnedPoints = sum;
  });

  if (sort===true) {
    _sortPlayers();
  };
}

function _sortPlayers() {
  _players.sort(function(a,b) {
    if (a.earnedPoints > b.earnedPoints) {
      return -1;
    }
    if (a.earnedPoints < b.earnedPoints) {
      return 1;
    }
    return 0;
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
      _tallyPoints(true);
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