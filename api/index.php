<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
	header("Access-Control-Allow-Headers: Origin, X-Requested-Wth, Content-Type, Accept");
	

	require 'C:/xampp/htdocs/api/awsphp/aws-autoloader.php';
	

/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/
date_default_timezone_set('UTC');

use Aws\DynamoDb\Exception\DynamoDbException;
use Aws\DynamoDb\Marshaler;

$sdk = new Aws\Sdk([
    'region'   => 'us-east-1',
    'version'  => 'latest'
]);

$dynamodb = $sdk->createDynamoDb();
$marshaler = new Marshaler();
/*
$tableName = 'Users';

$userID = 2015;
$username = 'fat';
$password = "pd";

$item = $marshaler->marshalJson('
    {
        "userID": "' . $userID . '",
        "username": "' . $username . '",
        "password": "' . $password . '"
    }
');

$params = [
    'TableName' => $tableName,
    'Item' => $item
];


try {
    $result = $dynamodb->putItem($params);
    echo "Added item: $username\n";

} catch (DynamoDbException $e) {
    echo "Unable to add item:\n";
    echo $e->getMessage() . "\n";
}
//*/



	/*header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
	header("Access-Control-Allow-Headers: Origin, X-Requested-Wth, Content-Type, Accept");

	
	define('DB_HOST', 'localhost:3306');
	define('DB_NAME', 'spotify-study-break-lh');
	define('DB_USER', 'web4640');
	define('DB_PASS', 'password');
	//*/
	/*
	define('DB_HOST', 'spotify-study-break-db-aws.ccnlyynzfef9.us-east-1.rds.amazonaws.com:3306');
	define('DB_NAME', 'spotify_studybreak');
	define('DB_USER', 'adminCPES');
	define('DB_PASS', 'MGJEwgCynexWGgn7K8Qg');
	*/
	//$dbhost = 'spotify-studybreak-db-aws.ccnlyynzfef9.us-east-1.rds.amazonaws.com';
	//$dbport = "3306";
	//$dbname = 'spotify-studybreak-db-aws';
	//$charset = 'utf8';

	//$dsn = "mysql:host={$dbhost};port={$dbport};dbname={$dbname}";
	//$username = 'adminCPES';
	//$password = 'efT8VwpgDpLAieZdMn1O';

	//$pdo = new PDO($dsn, $username, $password);
	//$pdo =
	//session_start();
	/*
function connect(){
	//$connect = mysql_connect("$")
	$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
	if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
    
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();
*/?>