var React = require('react');
var GameStore = require('../stores/GameStore');
var GameActionCreator = require('../actions/GameActionCreator');


function getStateFromStores() {
  return {
    games: GameStore.getAll()
  };
}

function getSpreadColumns(game) {
  return (
    <td key={game.id+"spread"}>
      {game.spread}
    </td>
  );
}


var PicksTableGames = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  _onClick: function(game,team,e) {
    GameActionCreator.userSelectGameWinner(game, team);
    this.setState(getStateFromStores());
  },

  getFavoritesColumns: function(game) {
    return this.getSelectableColumn(game, game.favorite)
  },

  getUnderdogColumns: function(game) {
    return this.getSelectableColumn(game, game.underdog)
  },

  selectableClassName: function(game,team) {
    var className = '';
    if (game.winner === team) {
      if (game.userSelected === true) {
        className = 'warning';
      } else {
        className = 'success';
      }
    }
    return className;
  },

  getSelectableColumn: function(game, team) {
    return (
      <td key={game.id+team} className={this.selectableClassName(game,team)} onClick={this._onClick.bind(null,game,team)}>
        {team}
      </td>
    );
  },

  render: function() {
    var favorites = this.state.games.map(this.getFavoritesColumns)
    var spreads = this.state.games.map(getSpreadColumns)
    var underdogs = this.state.games.map(this.getUnderdogColumns)
    return (
      <tbody>
        <tr>
          <td>
            Favorite:
          </td>
          {favorites}
          <td></td>
        </tr>
        <tr>
          <td>
            Spread:
          </td>
          {spreads}
          <td></td>
        </tr>
        <tr>
          <td>
            Underdog:
          </td>
          {underdogs}
          <td></td>
        </tr>
      </tbody>
    );
  }
});

module.exports = PicksTableGames;
