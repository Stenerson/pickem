# Pick'em Scenarios
A Chrome extension, built with [React](https://facebook.github.io/react/), to run what-if 
scenarios in a Yahoo Pro Football Pick'em league.

![Pick'em Scenarios](https://github.com/stenerson/pickem/blob/master/ExtensionPreview.png)

## Installing the extension
**TODO**: Find it on the Chrome Web Store  
-or-  
To install the extension in developer mode:

1. Clone or download this repository
2. Navigate to `chrome://extensions` in your Chrome browser
3. Check the "Developer mode" check box (top right as of Chrome 48)
4. Click "Load unpacked extension..."
5. Select the extension directory


## Using the extension
Once installed, go to your group picks page in a Yahoo Pro Football Pick'em league. 
If all goes well the standard group picks table will be quickly replaced 
with an enhanced table. That's the extension.

You can toggle the extension off and on by clicking the little football icon 
in the right side of Chrome's omni bar.

### Selecting Winners

* Click a team at the top of the table to select as the winner
* Click the spread (between teams) to reset the game's winner  
(will reset to no winner if the game is not final)
* Use the unlock setting to change the outcome of games that have finished  
(what IF Houston would have won?)
* Click the reset button to reset all games

### Sorting
You can sort by points (default) or potential. The potential sort is useful 
early on a game day to see who has lost the fewest amount of points.

**Notes on Sorting**:
* The app doesn't handle tiebreakers because they are not scrape-able from Yahoo's HTML
* Potential sort/lost points are incorrect if players are missing picks (see TODOs below)
* Sorting by points is different that Yahoo's default sorting
  * App uses points, then possible points to break ties (opposite when sorting by potential)
  * I'm not sure how Yahoo decides how to "break ties" before the game is over for sorting


### Selecting Players
When the page loads, you will be the selected player. You can click on any user 
row to change the selected player. The extension will show how many points they 
have earned and what place that player is in.


## Hacking
Hacking is encouraged!

I've wanted something like this since I started playing in my confidence pool league 
in 2010. I built this extension as a way to learn [React](https://facebook.github.io/react/) 
and [Flux](https://facebook.github.io/flux/). Building a Chrome extension seemed to 
be the best way to get the data I needed from Yahoo (scraping and replacing DOM elements 
using jQuery.)

### Building

You must have [npm](https://www.npmjs.org/) installed on your computer.
From the root project directory run these commands from the command line:

`npm install`

This will install all dependencies.

To build the project, first run this command:

`npm start`

This will perform an initial build and start a watcher process that will
update bundle.js with any changes you wish to make.  This watcher is
based on [Browserify](http://browserify.org/) and
[Watchify](https://github.com/substack/watchify), and it transforms
React's JSX syntax into standard JavaScript with
[Reactify](https://github.com/andreypopp/reactify).

To build a minified js file run:

`npm run-script build`

## TODO

### Functionality
* Select buttons
  * My picks
  * Favorites
  * Dogs
  * Iterate through all remaining games to find highest possible finish
* Determine missing points for players that are missing picks
* Open a github issue if you'd like to see a feature added


### Technical
* Use CSS precompiler (SCSS)
* Use localstorage to save sort/etc settings

--

Pick'em icon made by [Freepik](http://www.freepik.com) from [www.flaticon.com](http://www.flaticon.com)
and is licensed by [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)