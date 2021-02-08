<?php
	require('index.php');

	session_start();

	$request = json_decode(file_get_contents('php://input'));
	//echo $request->session;
	

	//echo json_encode($request);
	$username = $request->username;
	$password = $request->password;
	//$password = password_hash($password, PASSWORD_DEFAULT);
	//echo($request->password);
	//$pwd = password_hash($pwd, PASSWORD_BCRYPT);

	$tableName = 'Users';
	
	$key = $marshaler->marshalJson('
	    {
	        "username": "' . $username . '"
	    }
	');

	$params = [
	    'TableName' => $tableName,
	    'Key' => $key
	];
	$out = [];
	try {
	    $result = $dynamodb->getItem($params);
	    //TODO: Implement hashing
	    //$result = json_encode($result);
	    //make log-in check logic
	    $result = json_decode($marshaler->unmarshalJson($result['Item']));
	    
	    $pwd = $result->password;
	    //$pwd = $result['Item']['password'];
	    //echo($pwd);
	    //echo $password;
	    if($pwd == $password){
			$out['message'] = 'Success';
			$out['user'] = $username;
		}

	} catch (DynamoDbException $e) {
	    echo "Unable to get item:\n";
	    echo $e->getMessage() . "\n";
	}

	echo json_encode($out);

?>