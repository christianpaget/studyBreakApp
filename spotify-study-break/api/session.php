<?php

	include('index.php');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$sessions = array();
	$session["user"] = "no";
	$data = [];
	if($request!=""){
	
		if (!isset($_SESSION)){
			session_start();
		}

		$_SESSION['user'] = $request->{'username'};
		//$_SESSION['password'] = password_hash($request->{'username'}, PASSWORD_BCRYPT);

		//$sessions = array();

		//$sessions['user'] = $_SESSION['user'];
	//*/

		foreach ($request as $k => $v) {
	
			$data[0]['get'.$k] = $v;
		}
	}
	echo json_encode($_SESSION);


?>