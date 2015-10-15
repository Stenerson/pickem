var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_GAMES: null,
    RECEIVE_PLAYERS: null,
    USER_SELECT_GAME_WINNER: null,
    HIGHLIGHT_PLAYER: null
  }),

  yahooClasses: {
    pickTableWrapperId: 'ysf-group-picks',
    pickTableWrapper: 'data-table',
    table: 'yspNflPickGroupPickTable yspNflPickGroupPickTablePadded',
    tbody: 'ysptblcontent1',
    playersHeaderRow: 'ysptblhead',
    tr: 'data-row',
    oddRow: 'odd',
    evenRow: 'even',
    tdFirst: 'l',
    gameWinner: 'yspNflPickWin',
    correct: 'correct',
    incorrect: 'incorrect',
    differentPick: 'ysf-pick-opponent',
    playerClass: 'user-row'
  },

  picksClasses: {
    appWrapper: 'picksApp',
    picksContainer: 'picks-container',
    userSelected: 'user-highlight',
    playerHighlight: 'user-highlight'
  }

};
