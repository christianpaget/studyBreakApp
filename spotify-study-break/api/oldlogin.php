
<?php
	/* sourcecodester.com
	*/

	require('index.php');
	session_start();

	$request = json_decode(file_get_contents('php://input'));
	//echo $request->session;
	

	//echo json_encode($request);
	$username = $request->username;
	$pwd = $request->password;
	//echo($request->password);
	//$pwd = password_hash($pwd, PASSWORD_BCRYPT);

	$out = [];
	//echo($username);
	//echo($pwd);
	$sql = "SELECT * FROM `spotify-study-break-lh`.`users` WHERE Username='". $username . "' AND Hashed_pwd='" .$pwd ."'";
	//echo($sql);
	$query = mysqli_query($con, $sql);
	//echo $query->num_rows;
	if($query->num_rows>0){
		$row = $query->fetch_array();
		$out['message'] = 'Success';
		$out['user'] = $username;
		$_SESSION['user'] = $username;
	}
	else{
		$out['error'] = true;
		$out['message'] = 'Invalid Login';
	}
	//var_dump($_SESSION);
	//echo session_id();
	//echo json_encode($_SESSION);
	echo json_encode($out);

?>