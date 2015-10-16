var React = require('react');
var PicksConstants = require('../constants/PicksConstants');

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
        className = PicksConstants.picksClasses.userSelected;
      } else {
        className = PicksConstants.yahooClasses.gameWinner;
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
      <tr className={PicksConstants.yahooClasses.tr}>
        <td className={PicksConstants.yahooClasses.tdFirst}>
          {this.props.title}
        </td>
        {columns}
        <td></td>
      </tr>
    );
  }

});

module.exports = PicksTableRow;