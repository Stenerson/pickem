var React = require('react');
var GameStore = require('../stores/GameStore');


function getStateFromStores() {
  return {
    games: GameStore.getAll()
  };
}

function getFavoritesColumns(game) {
  return getColumn(game.favorite)
}

function getSpreadColumns(game) {
  return getColumn(game.spread)
}

function getUnderdogColumns(game) {
  return getColumn(game.underdog)
}

function getColumn(item) {
  return (
    <td>
      {item}
    </td>
  );
}


var PicksTableGames = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  render: function() {
    var favorites = this.state.games.map(getFavoritesColumns)
    var spreads = this.state.games.map(getSpreadColumns)
    var underdogs = this.state.games.map(getUnderdogColumns)
    return (
      <tbody>
        <tr>
          <td>
            Favorite:
          </td>
          {favorites}
        </tr>
        <tr>
          <td>
            Spread:
          </td>
          {spreads}
        </tr>
        <tr>
          <td>
            Underdog:
          </td>
          {underdogs}
        </tr>
      </tbody>
    );
  }
});

module.exports = PicksTableGames;
