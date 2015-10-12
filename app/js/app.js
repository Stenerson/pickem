var PicksApp = require('./components/PicksApp.jsx');
var PicksAppAPIUtils = require('./utils/PicksAppAPIUtils');
var GameData = require('./GameData');
var React = require('react');
window.React = React; // export for http://fb.me/react-devtools
var ReactDOM = require('react-dom');

// global.__base = __dirname + '/';

// Load game data
GameData.init();
PicksAppAPIUtils.getGames();


ReactDOM.render(
    <PicksApp />,
    document.getElementById('react')
);
