<?php
require_once('./mysql.php');
require_once('./sanitize.php');
foreach($_SERVER as $key=>$value){
  $value=sanitizestring($value);
  $_SERVER[$key]=$value;
}
extract($_SERVER);
if($HTTPS=='on'){
  $http="https";
}
else{
  $http="http";
};
$host=$HTTP_HOST;
//check if the user had previously logged in
session_start();
if(isset($_COOKIE['PHPSESSID']) && $_SESSION['logged_in']==true && $_SESSION['initialized']==true){
  $LoginID=sanitizestring($_COOKIE['PHPSESSID']);
  $mysql=connect('select');
  $query="SELECT * FROM login WHERE LoginID=\"$LoginID\" and IP=\"$REMOTE_ADDR\"";
  $result=$mysql->query($query);
  if($result->num_rows==1){
   $row=$result->fetch_array();
   $uname=$row['Username'];
   $table=$row['AccountType'];
   $loginID=$row['LoginID'];
   //obtain the info about the user
    setcookie("PHPSESSID",session_id(),time()-1,"/");
    setcookie("PHPSESSID",session_id(),time()+60*60*24*7,"/",$host,true,true);
   $query="SELECT * FROM $table WHERE Username='$uname'";
   $result=$mysql->query($query);
   $row=$result->fetch_array();
   $_SESSION['initialized']=true;
   $_SESSION['logged_in']=true;
   $_SESSION['Fname']=$row['Firstname'];
   $_SESSION['Lname']=$row['Lastname'];
   $_SESSION['BusName']=$row['BusName'];
   $_SESSION['BusType']=$row['BusType'];
   $_SESSION['AccountType']=$table;
   $_SESSION['Uname']=$row['Username'];
   $_SESSION['Pwd']=$row['Password'];
   $script="
   <script>
   window.location.replace('$http://$host/Users/$table/Scripts/index.php');
   </script>";
   echo $script;
   die();
 }
};
//check where the call to this login.php is coming from
switch($HTTP_REFERER){
    //first log the user out of other previously logged in devices
  case "$http://$host/signup.html":
    session_start();
    foreach($_SESSION as $key=>$value){
      $value=sanitizestring($value);
      $_SESSION[$key]=$value;
    }
//    extract($_SESSION);
    if($_SESSION['logged_in']==true && $_SESSION['initialized']==true){
      extract($_SESSION);
      $mysql=connect('delete');
      $query="DELETE FROM login WHERE Username='$Uname'";
      $mysql->query($query);
      $mysql=connect('insert');
      //then create a new login
      $query="INSERT INTO login (Username,LoginID,IP,AccountType) VALUES (\"$Uname\",\"$LoginID\",\"$REMOTE_ADDR\",\"$AccountType\")";
      $mysql->query($query);
      $script="<script>
      window.location.replace('$http://$host/Users/$AccountType/index.php');
      </script>;";
      setcookie(session_name(),session_id(),time()+60*60*24*7,"/",$host,true,true);
      echo $script;
    }
    else{
      $script="<script>
      window.location.replace('$http://$host/login.html');
      </script>;";
    echo $script;
    };
    break;
    
  case "$http://$host/login.html":  
    foreach($_POST as $key=>$value){
      $value=sanitizestring($value);
      $_POST[$key]=$value;
    }
    extract($_POST);
    //authenticate the user
    $mysql=connect('select');
    $query="SELECT * FROM $AccountType WHERE Username=\"$Uname\"";
    $result=$mysql->query($query);
    $row=$result->fetch_array();
    $ConfirmPwd=$row['Password'];
    if(password_verify($Pwd,$ConfirmPwd)){
      session_start();
      //first delete previously logged in devices     
      $mysql=connect('delete');
      $query="DELETE FROM login WHERE Username=\"$Uname\"";
      $mysql->query($query);
      //then create a new login
      $mysql=connect('insert');
      $LoginID=session_id();
      $query="INSERT INTO login (Username,LoginID,IP,AccountType) VALUES (\"$Uname\",\"$LoginID\",\"$REMOTE_ADDR\",\"$AccountType\")";
      $mysql->query($query);
      //get all information about the user
      //create a new session cookie
//      setcookie("PHPSESSID",session_id(),time()-1,"/");
      setcookie("PHPSESSID",session_id(),time()+60*60*24*7,"/",$host,true,true);
      $mysql=connect('select');
      $query="SELECT * FROM $AccountType WHERE Username='$Uname'";
      $result=$mysql->query($query);
      $row=$result->fetch_array();
      $_SESSION['initialized']=true;
      $_SESSION['logged_in']=true;
      $_SESSION['Fname']=$row['Firstname'];
      $_SESSION['Lname']=$row['Lastname'];
      $_SESSION['BusName']=$row['BusName'];
      $_SESSION['BusType']=$row['BusType'];
      $_SESSION['AccountType']=$table;
      $_SESSION['Uname']=$row['Username'];
      $_SESSION['Pwd']=$_POST['Pwd'];
      $_SESSION['loginID']=$loginID;
      $script="<script>
      window.location.replace('$http://$host/Users/$AccountType/index.php');
      </script>;";
      echo $script;
    }
    else{
      $script="<script>
      $('.error').first().html('Sorry, no account was found. Please try again.');
      </script>";
      echo $script;
    };
    break;
    
  default:
    setcookie("PHPSESSID",session_id(),time()-1,"/");
    $script="<script>
    window.location.replace('$http://$host/login.html');
    </script>;";
    echo $script;
    break;
}
?>