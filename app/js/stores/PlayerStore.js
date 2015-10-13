var PicksAppDispatcher = require('../dispatcher/PicksAppDispatcher');
var PicksConstants = require('../constants/PicksConstants');
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

  // Sort?

  getAll: function() {
    return _players;
  }
});

PlayerStore.dispatchToken = PicksAppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.RECEIVE_PLAYERS:
      _addPlayers(action.players);
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