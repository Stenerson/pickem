// var MessageSection = require('./MessageSection.react');
var React = require('react');
var PicksTable = require('./PicksTable.jsx');
var PicksConstants = require('../constants/PicksConstants');

var PicksApp = React.createClass({

  render: function() {
    return (
      <div className={PicksConstants.picksClasses.appWrapper}>
        <PicksTable />
      </div>
    );
  }

});

module.exports = PicksApp;