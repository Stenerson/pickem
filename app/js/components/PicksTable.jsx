var React = require('react');
var PicksTableGames = require('./PicksTableGames.jsx');

var PicksTable = React.createClass({
  render: function() {
    return (
      <div className="picks-table">
        <table className="table">
          <PicksTableGames />
        </table>
      </div>
    );
  }
});

module.exports = PicksTable;
