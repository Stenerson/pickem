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

function picksAppEntryPoint() {
  if ($('#react').length === 0) { // it's the first time, we need to create the react element
    var $picks_div = $('#ysf-group-picks'),
    react_div = document.createElement('div');

    react_div.setAttribute("id", "react");
    $picks_div.addClass('original-picks-container picks-hide');
    $picks_div.before(react_div);

    // Start up the app
    ReactDOM.render(
      <PicksApp />,
      react_div
    );
  } else {
    // Swap the IDs on the elements
    $('.original-picks-container').toggleClass('picks-hide');
    $('#react').toggleClass('picks-hide');
  }
}

// Subscribe to chrome extension click page action icon message
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  picksAppEntryPoint();
});

// Get it started!
picksAppEntryPoint();