var React = require('react');
var PlayerActionCreator = require('../actions/PlayerActionCreator');


var PicksTablePlayerRow = React.createClass({

  getColumn: function(pick) {
    var className = '';
    //var className = pickClassName(pick);
    return (
      <td
        key={this.props.player.id+pick.gameId}
        className={className}
        >
        {pick.pick}<br />
        ({pick.points})
      </td>
    );
  },

  // selectableClassName: function(game,team) {
  //   var className = '';
  //   if (game.winner === team) {
  //     if (game.userSelected === true) {
  //       className = 'warning';
  //     } else {
  //       className = 'success';
  //     }
  //   }
  //   return className;
  // },

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