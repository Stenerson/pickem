var React = require('react');
var AppStateStore = require('../stores/AppStateStore');
var GameStore = require('../stores/GameStore');
var PlayerStore = require('../stores/PlayerStore');
var GameActionCreator = require('../actions/GameActionCreator');
var PicksTableRow = require('./PicksTableRow.jsx')
var PicksTablePlayerRow = require('./PicksTablePlayerRow.jsx')
var PicksConstants = require('../constants/PicksConstants');


function getStateFromStores() {
  return {
    games: GameStore.getAll(),
    players: PlayerStore.getAll(),
    activePlayer: PlayerStore.getActivePlayer(),
    appState: AppStateStore.getAppState()
  };
}


var PicksTableBody = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    GameStore.addChangeListener(this._onChange);
    PlayerStore.addChangeListener(this._onChange);
    AppStateStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    GameStore.removeChangeListener(this._onChange);
    PlayerStore.removeChangeListener(this._onChange);
    AppStateStore.removeChangeListener(this._onChange);
  },

  playerRows: function(player) {
    return(
      <PicksTablePlayerRow key={player.id} player={player} activePlayer={this.state.activePlayer} />
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  _userPickGame: function(game, team, e) {
    // Only allow the user to change the winner if the game is not over
    // or the app is in an unlocked state
    if (!game.isOver || !this.state.appState.isLocked) {
      GameActionCreator.userSelectGameWinner(game, team);
    };
  },

  _resetUserPickGame: function(game) {
    GameActionCreator.userSelectGameWinner(game, null);
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
          clickHandler={this._resetUserPickGame}
          games={this.state.games}
          field='spread'
          />
        <PicksTableRow
          title='Underdog:'
          clickHandler={this._userPickGame}
          games={this.state.games}
          field='underdog'
          />
        <tr className={PicksConstants.yahooClasses.playersHeaderRow}>
          <th colSpan={this.state.games.length+1} className={PicksConstants.yahooClasses.tdFirst}>
            Players
          </th>
          <th>
            Points
          </th>
        </tr>
        {players}
      </tbody>
    );
  }
});

module.exports = PicksTableBody;
