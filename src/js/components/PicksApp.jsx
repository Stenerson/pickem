// var MessageSection = require('./MessageSection.react');
var React = require('react');
var PicksTable = require('./PicksTable.jsx');
var PicksConstants = require('../constants/PicksConstants');

var PicksApp = React.createClass({

  render: function() {
    return (
      <div className={PicksConstants.picksClasses.appWrapper}>
        <h2>Pickem Scenarios - Put some buttons here</h2>
        <PicksTable />
      </div>
    );
  }

});

module.exports = PicksApp;