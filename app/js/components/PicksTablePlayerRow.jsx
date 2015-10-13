var React = require('react');

var PicksTablePlayerRow = React.createClass({

  getColumn: function(pick) {
    var className = '';
    //var className = pickClassName(pick);
    return (
      <td
        key={this.props.player.id+pick.game.id}
        className={className}
        >
        {pick.pick}<br />
        ({pick.points})
      </td>
    );
  },

  selectableClassName: function(game,team) {
    var className = '';
    if (game.winner === team) {
      if (game.userSelected === true) {
        className = 'warning';
      } else {
        className = 'success';
      }
    }
    return className;
  },


  render: function() {
    var columns = this.props.player.picks.map(this.getColumn)
    return (
      <tr>
        <td>
          {this.props.player.name}
        </td>
        {columns}
        <td>
          {this.props.player.earned_points}
        </td>
      </tr>
    );
  }

});

module.exports = PicksTablePlayerRow;