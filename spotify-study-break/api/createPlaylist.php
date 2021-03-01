<?php
/**
 * Returns the list of policies.
 */
require 'index.php';
// Get posted data.
$postdata = file_get_contents("php://input");
echo $postdata;
if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if(trim($request->step1search) === '' || trim($request->step1choice) === '' || trim($request->step2search) === ''  || trim($request->step2choice) === '' || (float)$request->breaktime < 0 || (float)$request->studytime < 0)
  {
    return http_response_code(400);
  }

  // Sanitize.
  /*
  $playlistID = mysqli_real_escape_string($con, (int)($request->playlistID));

  $step1search = mysqli_real_escape_string($con, trim($request->step1search));
  $step1choice = mysqli_real_escape_string($con, trim($request->step1choice));
  $step2choice = mysqli_real_escape_string($con, trim($request->step2choice));

  $step2search = mysqli_real_escape_string($con, trim($request->step2search));
  $breaktime = mysqli_real_escape_string($con, (int)($request->breaktime));

  $studytime = mysqli_real_escape_string($con, (int)($request->studytime));
  $userID = mysqli_escape_string($con, trim($request->userID));

  $playlistID = rand(10000,99999);

  // Create.*/
  //$sql = "INSERT INTO `playlists`(`step1choice`,`step1search`,`step2choice`, `step2search`, `studytime`, `breaktime`) VALUES (null,'{$number}','{$amount}')";

  $playlistID = (int)($request->playlistID);

  $step1search = trim($request->step1search);
  $step1choice = trim($request->step1choice);
  $step2choice = trim($request->step2choice);

  $step2search = trim($request->step2search);
  $breaktime = (int)($request->breaktime);

  $studytime = (int)($request->studytime);
  $userID = trim($request->userID);

  $playlistID = rand(10000,99999);
  $newPlaylist = $marshaler->marshalJson('
      {
          "playlistID": "'. $playlistID . '",
          "step1choice": "'. $step1choice . '",
          "step1search": "'. $step1search . '",
          "step2choice": "'. $step2choice . '",
          "step2search": "'. $step2search . '",
          "breaktime": "'. $breaktime . '",
          "studytime": "'. $studytime . '",
          "userID": "'. $userID . '" 
      }
  ');

  $params = [
      'TableName' => 'playlists',
      'Item' => $newPlaylist
  ];
  $out = [];
  try {
        $result = $dynamodb->putItem($params);
        echo $result;
        $result = json_decode($marshaler->unmarshalJson($result['Item']));
      
      $status = $result->status;
      //$pwd = $result['Item']['password'];
      //echo($pwd);
      //echo $password;
      if($status == 202){
      $out['message'] = 'Success';
      //$out['user'] = $username;
    }

    } catch (DynamoDbException $e) {
        echo "Unable to add playlist:\n";
        echo $e->getMessage() . "\n";
        $out['message'] = 'Failed';
    }

    echo $out;
  }
  /*
  $sql = "INSERT INTO `spotify_studybreak`.`playlists` (`step1choice`, `step1search`, `step2choice`, `step2search`, `studytime`, `breaktime`, `userID`) VALUES ('{$step1choice}', '{$step1search}', '{$step2choice}', '{$step2search}', '{$studytime}', '{$breaktime}', '{$userID}')";
  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $playlist = [
      'playlistID' => $playlistID,
      'step1choice' => $step1choice,
      'step1search' => $step1search,
      'step2choice' => $step2choice,
      'step2search' => $step2search,
      'breaktime' => $breaktime,
      'studytime' => $studytime,
      'userID' => $userID
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