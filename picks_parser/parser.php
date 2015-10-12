<?php
define('ROOTPATH','/Users/Matt/Dropbox/Projects/picks/picks_parser/');
require_once(ROOTPATH.'simple_html_dom.php');

$week = 'week_5';

$file_path = ROOTPATH."data/$week.html";
$html_doc = file_get_html($file_path);

if (!is_a($html_doc, 'simple_html_dom')) {
  exit("ERROR: Could not parse HTML in file $file_path.\n");
}

$table = $html_doc->find('div[id=ysf-group-picks] table tbody',0);

if (!is_a($table, 'simple_html_dom_node')) {
  exit("ERROR: Could not find table in HTML document.\n");
}


$game_data = array_slice($table->find('tr.data-row'),0,3);
$user_data =  array_slice($table->find('tr.data-row'),3);

/******************
  Process Game Data
******************/
$favored_teams = $game_data[0]->find('td');
$spread = $game_data[1]->find('td');
$underdog_teams = $game_data[2]->find('td');

class Game {
  var $id;
  var $favorite;
  var $underdog;
  var $spread;
  var $isOver = false;
  var $winner = null;
}

$games = array();
$num_games = count($favored_teams)-2; // End at count -1 to avoid summary column
// Start at 1 to avoid first column's data
for ($i=1; $i <= $num_games; $i++) {
  $game = new Game;
  $game->id = $i;
  $game->favorite = $favored_teams[$i]->plaintext;
  $game->spread = $spread[$i]->plaintext;
  $game->underdog = $underdog_teams[$i]->plaintext;

  // See if the game is over and who won
  if (isset($favored_teams[$i]->attr) && $favored_teams[$i]->attr['class'] == 'yspNflPickWin'
      OR isset($underdog_teams[$i]->attr) && $underdog_teams[$i]->attr['class'] == 'yspNflPickWin') {
    $game->isOver = true;
    $game->winner = (isset($favored_teams[$i]->attr) && $favored_teams[$i]->attr['class'] == 'yspNflPickWin') ? $game->favorite : $game->underdog;
  }

  // Add to the array
  $games[] = $game;
}

// echo json_encode($games,JSON_PRETTY_PRINT);
// echo "\n ----------------------------- \n";


/******************
  Process Player Data
******************/
class User {
  var $name;
  var $picks;
  var $earned_points;

  function __construct() {
    $this->picks = array();
  }

}

class UserPick {
  var $game;
  var $pick;
  var $isCorrect = null; // values could be null, true or false
  var $points; // This is the points they put on the game, not the points the get
}

$users = array();
foreach ($user_data as $user_row) {
  $i = -1;
  $user = new User;
  foreach ($user_row->find('td') as $user_pick) {
    $i++;
    $plaintext = $user_pick->plaintext;
    // First column
    if ($i === 0) {
      $user->name = $plaintext;
      continue;
    }

    // last column
    if ($i === $num_games+1) {
      $user->earned_points = intval($plaintext);
      continue;
    }

    // All other columns
    // Create UserPick for this game
    $pick = new UserPick;
    $pick->game = $games[$i-1];
    $pick->pick = trim(substr($plaintext, 0, strpos($plaintext,"(")-1));
    if ($pick->game->isOver) {
      $pick->isCorrect = $pick->pick == $pick->game->winner;
    }
    $pick->points = intval(substr($plaintext, strpos($plaintext,"(")+1, strpos($plaintext,")")-1));

    $user->picks[] = $pick;
  }
  $users[] = $user;
}

// echo json_encode($users,JSON_PRETTY_PRINT);
// echo "\n ----------------------------- \n";


// Write to files
$game_data_filename = ROOTPATH."data/".$week."_game_data.json";
$user_data_filename = ROOTPATH."data/".$week."_user_data.json";
echo "Writing game data to [$game_data_filename]...\n";
if (!file_put_contents($game_data_filename,json_encode($games,JSON_PRETTY_PRINT))) {
  echo "Error writing game file!\n";
}
echo "Writing user data to [$user_data_filename]...\n";
if (!file_put_contents($user_data_filename,json_encode($users,JSON_PRETTY_PRINT))) {
  echo "Error writing user file!\n";
}

echo "Finished successfully! Good luck.\n";

// Echo a new line so the next terminal command starts on a new line
echo "\n";



