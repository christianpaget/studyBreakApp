<?php

	include('index.php');
	if (!isset($_SESSION)){
		session_start();
	}

	$_SESSION['variable'] = "hello world";

	$sessions = array();

	$sessions['variable'] = $_SESSION['variable'];

	echo json_encode($sessions);

?>