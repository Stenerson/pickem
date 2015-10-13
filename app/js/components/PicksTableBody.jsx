var React = require('react');
var GameStore = require('../stores/GameStore');
var PlayerStore = require('../stores/PlayerStore');
var GameActionCreator = require('../actions/GameActionCreator');
var PicksTableRow = require('./PicksTableRow.jsx')
var PicksTablePlayerRow = require('./PicksTablePlayerRow.jsx')

function getStateFromStores() {
  return {
    games: GameStore.getAll(),
    players: PlayerStore.getAll()
  };
}


var PicksTableBody = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    GameStore.addChangeListener(this._onChange);
    PlayerStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
    PlayerStore.removeChangeListener(this._onChange);
  },

  playerRows: function(player) {
    return(
      <PicksTablePlayerRow key={player.id} player={player} />
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  _userPickGame: function(game, team, e) {
    GameActionCreator.userSelectGameWinner(game, team);
  },

  render: function() {
    var players = this.state.players.map(this.playerRows)
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
        <tr><td colSpan={this.state.games.length+2} /></tr>
        {players}
      </tbody>
    );
  }
});

module.exports = PicksTableBody;
