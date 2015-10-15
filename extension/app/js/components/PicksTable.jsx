var React = require('react');
var PicksConstants = require('../constants/PicksConstants');
var PicksTableBody = require('./PicksTableBody.jsx');

var PicksTable = React.createClass({
  render: function() {
    return (
      <div
        id={PicksConstants.yahooClasses.pickTableWrapperId}
        className={PicksConstants.yahooClasses.pickTableWrapper+" "+PicksConstants.picksClasses.picksContainer}
        >
        <table className={PicksConstants.yahooClasses.table}>
          <PicksTableBody className={PicksConstants.yahooClasses.tbody} />
        </table>
      </div>
    );
  }
});

module.exports = PicksTable;
