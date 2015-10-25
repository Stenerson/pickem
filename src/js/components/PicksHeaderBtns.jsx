var React = require('react');
var GameActionCreator = require('../actions/GameActionCreator');
var AppStateActionCreator = require('../actions/AppStateActionCreator');
var AppStateStore = require('../stores/AppStateStore');

function getStateFromStores() {
  return {
    appState: AppStateStore.getAppState()
  };
}

var PicksHeaderBtns = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    AppStateStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStateStore.removeChangeListener(this._onChange);
  },

  lockGroupBtnClass: function(isLockBtn) {
    var className = "btn btn-sm ";
    if ((isLockBtn && this.state.appState.isLocked) || (!isLockBtn && !this.state.appState.isLocked) ) {
      className += "btn-primary";
    } else {
      className += "btn-default";
    }
    return className;
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  _resetGames: function() {
    GameActionCreator.resetGames();
  },

  _clickLock: function(lock) {
    AppStateActionCreator.lock(lock);
  },

  render: function() {
    var divStyle = {float: "right"};
    return (
      <div style={divStyle}>
        <div className="btn-group pad-right">
          <button ref="lock" className={this.lockGroupBtnClass(true)} onClick={this._clickLock.bind(null,true)}><i className="fa fa-lock" /></button>
          <button ref="unlock" className={this.lockGroupBtnClass(false)} onClick={this._clickLock.bind(null,false)}><i className="fa fa-unlock" /></button>
        </div>
        <button className="btn btn-sm btn-default" onClick={this._resetGames}>
          <i className="fa fa-undo" /> Reset
        </button>
      </div>
    );
  }
});

module.exports = PicksHeaderBtns;
