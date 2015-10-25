var React = require('react');
var PlayerActionCreator = require('../actions/PlayerActionCreator');
var PicksConstants = require('../constants/PicksConstants');


var PicksTablePlayerRow = React.createClass({

  getColumn: function(pick) {
    var pickText;
    if (pick.pick) {
      pickText = <span>{pick.pick} <br /> ({pick.points})</span>;
    } else {
      pickText = "--";
    }
    return (
      <td
        key={this.props.player.id+pick.gameId}
        className={this.cellClass(pick)}
        >
        {pickText}
      </td>
    );
  },

  cellClass: function(pick) {
    var className = "";
    if (pick.isCorrect === true) {
      className += PicksConstants.yahooClasses.correct;
    } else if (pick.isCorrect === false) {
      className += PicksConstants.yahooClasses.incorrect;
    }

    if (pick.pick !== this.props.activePlayer.picks[pick.gameId].pick) {
      className += " " + PicksConstants.yahooClasses.differentPick;
    }

    return className;
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
          <span className="lead">{this.props.player.earnedPoints}</span>
          <br/>
          <small>Lost: {this.props.player.lostPoints}</small>
        </td>
      </tr>
    );
  }

});

module.exports = PicksTablePlayerRow;