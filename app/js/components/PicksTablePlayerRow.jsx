var React = require('react');
var PlayerActionCreator = require('../actions/PlayerActionCreator');


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
      return 'success';
    }
    if (pick.isCorrect === false) {
      return 'danger';
    }
    return '';
  },

  _rowClick: function(e) {
    PlayerActionCreator.highlightPlayer(this.props.player);
  },

  render: function() {
    var columns = this.props.player.picks.map(this.getColumn)
    var rowClass = this.props.player.highlight ? 'warning' : '';
    return (
      <tr className={rowClass} onClick={this._rowClick}>
        <td>
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