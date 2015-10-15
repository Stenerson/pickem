var PicksServerActionCreators = require('../actions/PicksServerActionCreators');

// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

module.exports = {

  getGames: function() {
    // simulate retrieving data from a database
    var games = JSON.parse(localStorage.getItem('games'));

    // simulate success callback
    PicksServerActionCreators.receiveGames(games);
    // Trigger the action
  },

  getPlayers: function() {
    // simulate retrieving data from a database
    var players = JSON.parse(localStorage.getItem('players'));

    // simulate success callback
    PicksServerActionCreators.receivePlayers(players);
    // Trigger the action
  }

};
