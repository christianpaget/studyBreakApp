<?php
	require('index.php');

	session_start();

	$request = json_decode(file_get_contents('php://input'));
	//echo $request->session;
	

	//echo json_encode($request);
	$username = $request->username;
	$password = $request->password;
	$password = password_hash($password, PASSWORD_BCRYPT);
	//echo($request->password);
	//$pwd = password_hash($pwd, PASSWORD_BCRYPT);

	$tableName = 'Users';

	//$userID = rand(10000,99999);
	//$username = ;
	//$password = "pd";
	
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
	    //make log-in check logic
	    echo $result['Item'];
	    if($result['Item']['password'] == $password){
			$out['message'] = 'Success';
			$out['user'] = $username;
		}

	} catch (DynamoDbException $e) {
	    echo "Unable to get item:\n";
	    echo $e->getMessage() . "\n";
	}

	//echo json_encode($out);

?>