<?php
/**
 * Returns the list of policies for a specific user.
 */
require 'index.php';
session_start();
//echo $_SESSION['user'];
$playlists = [];
$request = json_decode(file_get_contents('php://input'));
$username = $request->user;
$sql = "SELECT * FROM `spotify_studybreak`.`playlists` WHERE userID='". $username . "'";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $playlists[$i]['playlistID'] = $row['playlistID'];
    $playlists[$i]['step1choice'] = $row['step1choice'];
    $playlists[$i]['step1search'] = $row['step1search'];
    $playlists[$i]['step2search'] = $row['step2search'];
    $playlists[$i]['step2choice'] = $row['step1choice'];
    $playlists[$i]['breaktime'] = $row['breaktime'];
    $playlists[$i]['studytime'] = $row['studytime'];
    $playlists[$i]['userID'] = $row['userID'];
    $i++;
  }

  echo json_encode($playlists);
}
else
{
  http_response_code(404);
}
?>