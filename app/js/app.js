var PicksApp = require('./components/PicksApp.jsx');
var PicksAppAPIUtils = require('./utils/PicksAppAPIUtils');
var PicksAppData = require('./PicksAppData');
var React = require('react');
window.React = React; // export for http://fb.me/react-devtools
var ReactDOM = require('react-dom');

// Load game data
PicksAppData.init();
PicksAppAPIUtils.getGames();
PicksAppAPIUtils.getPlayers();


ReactDOM.render(
    <PicksApp />,
    document.getElementById('react')
);
