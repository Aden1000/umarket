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
    $_SESSION['CreationTime']=$row['CreationTime'];
   $script="
   <script>
   window.location.replace('$http://$host/Users/$table');
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
      $stmt=$mysql->prepare("DELETE FROM login WHERE Username=?");
      $stmt->bind_param("s",$Uname);
      $stmt->execute();
      //then create a new login
      $mysql=connect('insert');
      $stmt=$mysql->prepare("INSERT INTO login (Username,LoginID,IP,AccountType) VALUES (?,?,?,?)");
      $stmt->bind_param("ssss",$Uname,$LoginID,$REMOTE_ADDR,$AccountType);
      $stmt->execute();
      //get the creation time
      $mysql=connect('select');
      $stmt=$mysql->prepare("SELECT CreationTime FROM $AccountType WHERE Username=?");
      $stmt->bind_param("s",$Uname);
      $stmt->execute();
      $result=$stmt->get_result();
      $row=$result->fetch_array();
      $_SESSION['CreationTime']=$row['CreationTime'];
      $mysql=disconnect();
      setcookie(session_name(),session_id(),time()+60*60*24*7,"/",$host,true,true);
      $mysql=disconnect();
      $stmt->close();
      $script="<script>
      window.location.replace('$http://$host/Users/$AccountType/');
      </script>;";
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
    $stmt=$mysql->prepare("SELECT * FROM $AccountType WHERE Username=?");
    $stmt->bind_param('s',$Uname);
    $stmt->execute();
    $result=$stmt->get_result();
    $row=$result->fetch_array();
    $ConfirmPwd=$row['Password'];
    if(password_verify($Pwd,$ConfirmPwd)){
      session_start();
      //first delete previously logged in devices     
      $mysql=connect('delete');
      $stmt=$mysql->prepare("DELETE FROM login WHERE Username=?");
      $stmt->bind_param('s',$Uname);
      $stmt->execute();
      //then create a new login
      $mysql=disconnect();
      $mysql=connect('insert');
      $LoginID=session_id();
      $stmt=$mysql->prepare("INSERT INTO login (Username,LoginID,IP,AccountType) VALUES (?,?,?,?)");
      $stmt->bind_param("ssss",$Uname,$LoginID,$REMOTE_ADDR,$AccountType);
      $stmt->execute();
      setcookie("PHPSESSID",session_id(),time()+60*60*24*7,"/",$host,true,true);
      $mysql=connect('select');
      $stmt=$mysql->prepare("SELECT * FROM $AccountType WHERE Username=?");
      $stmt->bind_param("s",$Uname);
      $stmt->execute();
      $result=$stmt->get_result();
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
      $_SESSION['CreationTime']=$row['CreationTime'];
      $mysql=disconnect();
      $stmt->close();
      $script="<script>
      window.location.replace('$http://$host/Users/$AccountType');
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