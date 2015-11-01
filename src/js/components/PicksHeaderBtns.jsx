var React = require('react');
var GameActionCreator = require('../actions/GameActionCreator');
var AppStateActionCreator = require('../actions/AppStateActionCreator');
var AppStateStore = require('../stores/AppStateStore');
var PlayerStore = require('../stores/PlayerStore');
var PicksConstants = require('../constants/PicksConstants');


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

  groupBtnClass: function(btnValue, compValue) {
    var className = "btn btn-sm ";
    if (btnValue === compValue) {
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

  _clickPlayerPicks: function(player) {
    GameActionCreator.selectPicksFor(player);
  },

  _clickSort: function(sortOption) {
    AppStateActionCreator.sort(sortOption);
  },

  render: function() {
    var divStyle = {float: "right"},
    activePlayer = PlayerStore.getActivePlayer();
    return (
      <div style={divStyle}>
      <span className="pad-right">Select:</span>
        <div className="btn-group pad-right">
          <button className="btn btn-sm btn-default"
            onClick={this._clickPlayerPicks.bind(null,activePlayer)}>
            {activePlayer.name}'s Picks
          </button>
        </div>
        <span className="pad-right">Sort:</span>
        <div className="btn-group pad-right">
          <button className={this.groupBtnClass(PicksConstants.SortOptions.POINTS, this.state.appState.sort)}
            onClick={this._clickSort.bind(null,PicksConstants.SortOptions.POINTS)}>
            Points
          </button>
          <button className={this.groupBtnClass(PicksConstants.SortOptions.POTENTIAL,this.state.appState.sort)}
            onClick={this._clickSort.bind(null,PicksConstants.SortOptions.POTENTIAL)}>
            Potential
          </button>
        </div>
        <div className="btn-group pad-right">
          <button
            className={this.groupBtnClass(true, this.state.appState.isLocked)}
            onClick={this._clickLock.bind(null,true)}>
            <i className="fa fa-lock" />
          </button>
          <button
            className={this.groupBtnClass(false, this.state.appState.isLocked)}
            onClick={this._clickLock.bind(null,false)}>
            <i className="fa fa-unlock" />
          </button>
        </div>
        <button className="btn btn-sm btn-default" onClick={this._resetGames}>
          <i className="fa fa-undo" /> Reset
        </button>
      </div>
    );
  }
});

module.exports = PicksHeaderBtns;
