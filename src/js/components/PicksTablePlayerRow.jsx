var React = require('react');
var PlayerActionCreator = require('../actions/PlayerActionCreator');
var PicksConstants = require('../constants/PicksConstants');


var PicksTablePlayerRow = React.createClass({

  getColumn: function(pick) {
    return (
      <td
        key={this.props.player.id+pick.gameId}
        className={this.cellClass(pick)}
        >
        {pick.pick}<br />
        ({pick.points})
      </td>
    );
  },

  cellClass: function(pick) {
    if (pick.isCorrect === true) {
      return PicksConstants.yahooClasses.correct;
    }
    if (pick.isCorrect === false) {
      return PicksConstants.yahooClasses.incorrect;
    }
    return '';
  },

  _rowClick: function(e) {
    PlayerActionCreator.highlightPlayer(this.props.player);
  },

  render: function() {
    var columns = this.props.player.picks.map(this.getColumn)
    var rowClass = this.props.player.highlight ? PicksConstants.yahooClasses.playerClass : '';
    return (
      <tr className={PicksConstants.yahooClasses.tr+" "+rowClass} onClick={this._rowClick}>
        <td className={PicksConstants.yahooClasses.tdFirst}>
          {this.props.player.name}
        </td>
        {columns}
        <td>
          {this.props.player.earnedPoints}
        </td>
      </tr>
    );
  }

});

module.exports = PicksTablePlayerRow;