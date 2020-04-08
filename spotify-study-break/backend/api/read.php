<?php
/**
 * Returns the list of policies.
 */
require 'index.php';

$playlists = [];
$sql = "SELECT * FROM playlists";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $playlists[$i]['createrID']    = $row['createrID'];
    $playlists[$i]['numSongs'] = $row['numSongs'];
    $playlists[$i]['genre'] = $row['genre'];
    $playlists[$i]['playlistID'] = $row['playlistID'];
    $i++;
  }

  echo json_encode($playlists);
}
else
{
  http_response_code(404);
}