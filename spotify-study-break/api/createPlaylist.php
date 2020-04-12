<?php
/**
 * Returns the list of policies.
 */
require 'index.php';
// Get posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if(trim($request->number) === '' || (float)$request->amount < 0)
  {
    return http_response_code(400);
  }

  // Sanitize.
  $playlistID = mysqli_real_escape_string($con, trim($request->playlistID));

  $step1search = mysqli_real_escape_string($con, trim($request->step1search));
  $step1choice = mysqli_real_escape_string($con, trim($request->step1choice));
  $step2choice = mysqli_real_escape_string($con, trim($request->step2choice));

  $step2search = mysqli_real_escape_string($con, trim($request->step2search));
  $breaktime = mysqli_real_escape_string($con, (int)($request->breaktime);

  $studytime = mysqli_real_escape_string($con, (int)$request->studytime);



  // Create.
  //$sql = "INSERT INTO `playlists`(`step1choice`,`step1search`,`step2choice`, `step2search`, `studytime`, `breaktime`) VALUES (null,'{$number}','{$amount}')";

  $sql = "INSERT INTO `playlists` (`step1choice`, `step1search`, `step2choice`, `step2search`, `studytime`, `breaktime`, `playlistID`) VALUES ('{$step1choice}', '{$step1search}', '{$step2choice}', '{$step2search}', '{$studytime}', '{$breaktime}', '{$playlistID}')";
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $playlist = [
      'playlistID' => $number,
      'step1choice' => $amount,
      'step1search' => $step1search,
      'step2choice' => $step2choice,
      'step2search' => $step2search,
      'breaktime' => $breaktime,
      'studytime' => $playlistID
    ];
    echo json_encode($playlist);
  }
  else
  {
    http_response_code(422);
  }
}
/*
if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $playlists[$i]['playlistID']    = $row['playlistID'];
    $playlists[$i]['step1choice'] = $row['step1choice'];
    $playlists[$i]['step1search'] = $row['step1search'];
    $playlists[$i]['step2search'] = $row['step2search'];
    $playlists[$i]['step2choice'] = $row['step1choice'];
    $playlists[$i]['breaktime'] = $row['breaktime'];
    $playlists[$i]['studytime'] = $row['studytime'];
    $i++;
  }

  echo json_encode($playlists);
}
else
{
  http_response_code(404);
}*/
?>