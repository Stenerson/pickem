// var MessageSection = require('./MessageSection.react');
var React = require('react');
var PicksTable = require('./PicksTable.jsx');

var PicksApp = React.createClass({

  render: function() {
    return (
      <div className="picksApp">
        <PicksTable />
      </div>
    );
  }

});

module.exports = PicksApp;