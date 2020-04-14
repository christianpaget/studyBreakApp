<?php

	require('index.php');
	//require('login.php');

	//session_start();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$sessions = array();
	$session["user"] = "no";
	$data = [];
	echo $_SESSION['user'];
	if(isset($_SESSION['user'])){
		echo "auth";
	}
	else{
		echo "notAuth";
	}
	//if($request!=""){
		//$_SESSION['users'] = $request->username;
		//$_SESSION['password'] = password_hash($request->{'username'}, PASSWORD_BCRYPT);
		//$sessions = array();
		//$sessions['user'] = $_SESSION['user'];
	//*/
		/*foreach ($request as $k => $v) {
			$data[0]['get'.$k] = $v;
		}*/
		$sessions = $_SESSION;
	//}
	//$pwd = "hi";
	//$pwd = password_hash($pwd, PASSWORD_BCRYPT);
	//echo json_encode($pwd);


?>