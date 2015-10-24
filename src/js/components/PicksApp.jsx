var React = require('react');
var PicksTable = require('./PicksTable.jsx');
var PicksHeader = require('./PicksHeader.jsx');
var PicksConstants = require('../constants/PicksConstants');

var PicksApp = React.createClass({

  render: function() {
    return (
      <div className={PicksConstants.picksClasses.appWrapper}>
        <PicksHeader />
        <PicksTable />
      </div>
    );
  }

});

module.exports = PicksApp;