var PicksAppDispatcher = require('../dispatcher/PicksAppDispatcher');
var PicksConstants = require('../constants/PicksConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = PicksConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _appState = {};

function _setInitialAppState() {
  _appState = {
    isLocked: true,
    sort: PicksConstants.SortOptions.POINTS
  }
};

function _set_lock(lock) {
  _appState.isLocked = lock;
}

function _set_sort(sortOption) {
  _appState.sort = sortOption;
}


var AppStateStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAppState: function() {
    return _appState;
  },

  getSortOrder: function() {
    return _appState.sort;
  }

});

AppStateStore.dispatchToken = PicksAppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.APP_INIT:
      _setInitialAppState();
      AppStateStore.emitChange();
      break;

    case ActionTypes.CLICK_LOCK:
      _set_lock(action.data.lock);
      AppStateStore.emitChange();
      break;

    case ActionTypes.CLICK_SORT:
      _set_sort(action.data.sort);
      AppStateStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = AppStateStore;