<?php
  

  require('index.php');

  $tableName = 'Users';
  $request = json_decode(file_get_contents('php://input'));
  
  //TODO: disallow repeat usernames
  $username = $request->user;
  $password = $request->pwd;
  $password = password_hash($password, PASSWORD_DEFAULT);
  $userID = rand(10000,99999);
  //TODO: Encrypt password
  
  $item = $marshaler->marshalJson('
      {
          "username": "' . $username . '",
          "password": "' . $password . '",
          "userID": "' . $userID . '"
      }
  ');

  $params = [
      'TableName' => 'Users',
      'Item' => $item
  ];


  try {
      $result = $dynamodb->putItem($params);
      echo "Added item: $username\n";

  } catch (DynamoDbException $e) {
      echo "Unable to add item:\n";
      echo $e->getMessage() . "\n";
  }

?>