var PicksServerActionCreators = require('../actions/PicksServerActionCreators');
var PicksConstants = require('../constants/PicksConstants');
var GameStore = require('../stores/GameStore');
var PlayerStore = require('../stores/PlayerStore');


function _setWinner($column, team, game) {
  if ($column.hasClass(PicksConstants.yahooClasses.gameWinner)) {
    game.winner = team;
    game.isOver = true;
  }
}

module.exports = {

  getGames: function() {
    var games = [];

    // For each row in the table's body
    $("." + PicksConstants.yahooClasses.tbody + " tr").each(function(rowIndex,rowElement) {
      var $row = $(this),
      $columns = $row.find('td'),
      cont = true, // Use this later to break the outer loop
      gameCount = $columns.length-2; // The first column and last column are not games

      // Loop through the columns of this row
      $columns.each(function(columnIndex, columnElement) {
        var $column = $(this),
        gamesId = columnIndex-1, // Because we're skipping the first column
        value = $column.text();

        // The first column and last column are not games
        if (columnIndex === 0 || columnIndex > gameCount) { return; };

        // The first row is favorites
        if (rowIndex === 0) {
          // Create a game with the favorite value set
          var game = GameStore.newGame({id: gamesId, favorite: value})
          _setWinner($column, value, game);
          // Add the game to the array
          games.push(game);
        };

        // The second row is spreads
        if (rowIndex === 1) {
          // Update the game with spreads
          games[gamesId].spread = value;
        };

        // The third row is underdogs
        if (rowIndex === 2) {
          // Update the game with spreads
          games[gamesId].underdog = value;
          _setWinner($column, value, games[gamesId]);

          if (columnIndex > gameCount) {
            // ok, we're done, let's break out - set cont to false to break the outer loop
            cont = false
            return false;
          }
        };
      });
      return cont;
    });
    // console.log(games);

    // Send the games to the action creator
    PicksServerActionCreators.receiveGames(games);
  },

  getPlayers: function() {
    var players = [];

    // For each row in the table's body
    $("." + PicksConstants.yahooClasses.tbody + " tr").each(function(rowIndex,rowElement) {
      var $row = $(this),
      $columns = $row.find('td'),
      gameCount = $columns.length-2, // The first column and last column are not games
      highlighted = $row.hasClass('user-row');
      playerId = rowIndex-4; // The first four rows are not players

      // Loop through the columns of this row
      $columns.each(function(columnIndex, columnElement) {
        var $column = $(this),
        gameId = columnIndex-1, // Because games skip the first column
        value = $column.text();

        // The first four rows are not players
        if (rowIndex <=3 ) { return; };

        if (columnIndex === 0) {
          // Create a player
          var player = PlayerStore.newPlayer({id: playerId, name: value, highlight: highlighted});
          players.push(player);
        }

        if (columnIndex > 0 && columnIndex < $columns.length-1) {
          var team = null,
          points = null,
          delimiterIndex = value.indexOf("(");

          if (delimiterIndex > -1) {
            team = value.substring(0, delimiterIndex).trim();
            points = parseInt(value.substring(delimiterIndex+1,value.indexOf(")")));
          }

          pick = {
            gameId: gameId,
            pick: team,
            isCorrect: null,
            points: points
          };

          players[playerId].picks.push(pick);
        }
      }); // columns
    }); // rows
    // Send the players to the action creator
    PicksServerActionCreators.receivePlayers(players);
  }

};
