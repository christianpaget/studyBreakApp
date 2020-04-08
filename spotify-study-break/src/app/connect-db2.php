<?php
$hostname = 'spotify-study-break-db.ccnlyynzfef9.us-east-1.rds.amazonaws.com:3306';
$dbname = 'spotify-study-break-db';
$username = 'adminCPES';
$password = 'Y63sZqxF2e8YjWuFDZEV
';

// PDO(dsn, username, password)
// dsn = "mysql:host=hostname;dbname=dbname"

$dsn = "mysql:host=$hostname;dbname=$dbname";

try
	{
		$db = new PDO($dsn, $username, $password);
		echo "<p> You connected. </p>";
	}
catch(PDOException $e){
	$error_message = $e -> getMessage();
	echo $error_message;
}
catch(Exception $e){
	$error_message = $e ->getMessage();
	echo $error_message;
}


?>
<?php 
if (isset($_GET['btnaction']))
{	
   try 
   { 	
      switch ($_GET['btnaction']) 
      {
         case 'create': createTable(); break;
         case 'insert': insertData();  break;
         case 'select': selectData();  break;
         case 'update': updateData();  break;
         case 'delete': deleteData();  break;
         case 'drop':   dropTable();   break;      
      }
   }
   catch (Exception $e)       // handle any type of exception
   {
      $error_message = $e->getMessage();
      echo "<p>Error message: $error_message </p>";
   }   
}
?>



<?php
// require('connect-db.php');

// require: if a required file is not found, reqire() produces a fatal error, the rest of the script won't run
// include: if a required file is not found, include() thorws a warning, the rest of the script will run
?>


<?php  
/*************************/
/** get data **/
function selectData()
{

	
	
	
	
	
	
	
	
	
}
?>

<?php 
/*************************/
/** create table **/
function createTable()
{
 require('connect-db.php');

 $query = "CREATE TABLE courses (courseID VARCHAR(8) PRIMARY KEY, course_desc VARCHAR(20) NOT NULL)";
 $statement = $db->prepare($query);
 $statement->execute();
 $statement->closeCursor();
	
	
	
	
	
	
	
	
	
}
?>


<?php 
/*************************/
/** drop table **/
function dropTable()
{
  
	
	
	
	
	
	
	
	
}
?>

<?php 
/*************************/
/** insert data **/
function insertData()
{
   
	
	
	
	
	
	
	
	
}
?>


<?php
/*************************/
/** update data **/
function updateData()
{
  
	
	
	
	
	
	
	
	
	
}
?>

<?php
/*************************/
/** delete data **/
function deleteData()
{
	
	
	
	
	
	
	
	
	
	
}
?>