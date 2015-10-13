var React = require('react');

var PicksTableRow = React.createClass({

  getColumn: function(game) {
    var value = game[this.props.field];

    return (
      <td
        key={game.id+value}
        className={this.selectableClassName(game,value)}
        onClick={this._onClick.bind(null,game,value)}
        >
        {value}
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

  _onClick: function(game,team,e) {
    if (typeof(this.props.clickHandler) === 'function') {
      this.props.clickHandler(game,team,e);
    }
  },

  render: function() {
    var columns = this.props.games.map(this.getColumn)
    return (
      <tr>
        <td>
          {this.props.title}
        </td>
        {columns}
      </tr>
    );
  }

});

module.exports = PicksTableRow;