var React = require('react');
// var PicksAppUtils = require('../utils/PicksAppUtils');
var GameActionCreator = require('../actions/GameActionCreator');
var GameStore = require('../stores/GameStore');
var PlayerStore = require('../stores/PlayerStore');

// function getStateFromStores() {
//   return {
//     activePlayer: PlayerStore.getActivePlayer()
//   };
// }

var PicksHeaderBtns = React.createClass({
  // getInitialState: function() {
  //   return getStateFromStores();
  // },

  // componentDidMount: function() {
  //   PlayerStore.addChangeListener(this._onChange);
  // },

  // componentWillUnmount: function() {
  //   PlayerStore.removeChangeListener(this._onChange);
  // },

  // _onChange: function() {
  //   this.setState(getStateFromStores());
  // },

  _resetGames: function() {
    GameActionCreator.resetGames();
  },

  render: function() {
    var divStyle = {float: "right"};
    return (
      <div style={divStyle}>
        <button className="btn btn-sm btn-default" onClick={this._resetGames}>
          <i className="fa fa-undo" /> Reset
        </button>
      </div>
    );
  }
});

module.exports = PicksHeaderBtns;
