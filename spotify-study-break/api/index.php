<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
	header("Access-Control-Allow-Headers: Origin, X-Requested-Wth, Content-Type, Accept");

	/*
	define('DB_HOST', 'localhost:3306');
	define('DB_NAME', 'spotify-study-break-lh');
	define('DB_USER', 'web4640');
	define('DB_PASS', 'password');
	//*/
	///*
	define('DB_HOST', 'spotify-study-break-db-aws.ccnlyynzfef9.us-east-1.rds.amazonaws.com:3306');
	define('DB_NAME', 'spotify_studybreak');
	define('DB_USER', 'adminCPES');
	define('DB_PASS', 'MGJEwgCynexWGgn7K8Qg');
	//*/
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
?>