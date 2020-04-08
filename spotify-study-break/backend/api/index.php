<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
	header("Access-Control-Allow-Headers: Origin, X-Requested-Wth, Content-Type, Accept");

	define('DB_HOST', 'localhost:3306');
define('DB_NAME', 'spotify-study-break-lh');
define('DB_USER', 'web4640');
define('DB_PASS', 'password');

function connect(){
	$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

	if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();
}
?>