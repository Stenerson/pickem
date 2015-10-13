var React = require('react');
var GameStore = require('../stores/GameStore');
var GameActionCreator = require('../actions/GameActionCreator');
var PicksTableRow = require('./PicksTableRow.jsx')

function getStateFromStores() {
  return {
    games: GameStore.getAll()
  };
}

var PicksTableBody = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    GameStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  _userPickGame: function(game, team, e) {
    GameActionCreator.userSelectGameWinner(game, team);
  },

  render: function() {
    return (
      <tbody>
        <PicksTableRow
          title='Favories:'
          clickHandler={this._userPickGame}
          games={this.state.games}
          field='favorite'
          />
        <PicksTableRow
          title='Spread:'
          games={this.state.games}
          field='spread'
          />
        <PicksTableRow
          title='Underdog:'
          clickHandler={this._userPickGame}
          games={this.state.games}
          field='underdog'
          />
      </tbody>
    );
  }
});

module.exports = PicksTableBody;
