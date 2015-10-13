var React = require('react');
var PicksTableBody = require('./PicksTableBody.jsx');

var PicksTable = React.createClass({
  render: function() {
    return (
      <div className="picks-table">
        <table className="table table-bordered">
          <PicksTableBody />
        </table>
      </div>
    );
  }
});

module.exports = PicksTable;
