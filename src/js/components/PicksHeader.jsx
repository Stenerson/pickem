var React = require('react');
var PicksAppUtils = require('../utils/PicksAppUtils');
var PicksHeaderBtns = require('./PicksHeaderBtns.jsx');
var PlayerStore = require('../stores/PlayerStore');

function getStateFromStores() {
  return {
    activePlayer: PlayerStore.getActivePlayer()
  };
}

var PicksHeader = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    PlayerStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PlayerStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    var activePlayer = this.state.activePlayer,
    spanStyle = {marginRight: "5px"};
    return (
      <div className="picks-header">
        <span className="lead" style={spanStyle}>
          {activePlayer.name}
        </span>
        {activePlayer.earnedPoints}pts, {PicksAppUtils.ordinalize(PlayerStore.getPlace(activePlayer))} place
        <PicksHeaderBtns />
      </div>
    );
  }
});

module.exports = PicksHeader;
