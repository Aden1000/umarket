<?php
session_cache_limiter('nocache');
require_once('../../../Scripts/sanitize.php');
require_once('../../../Scripts/mysql.php');
foreach($_SERVER as $key=>$value){
  $value=sanitizeString($value);
  $_SERVER[$key]=$value;
};
extract($_SERVER);
$host=$HTTP_HOST;
if($HTTPS=='on'){
  $http='https';
  $referer="https://$host/signup.html";
}
else{
  $http='http';
  $referer="http://$host/signup.html";
}
//check if the user had previously logged in
session_start();
if(isset($_COOKIE['PHPSESSID']) && $_SESSION['initialized']==true && $_SESSION['logged_in']==true){
  $LoginID=$_COOKIE['PHPSESSID'];
  setcookie("PHPSESSID",$LoginID,time()-1,"/",TRUE,TRUE);
  $mysql=connect('select');
  $query="SELECT * FROM login WHERE LoginID=\"$LoginID\" and IP=\"$REMOTE_ADDR\"";
  $result=$mysql->query($query);
 if($result->num_rows==1){
   $row=$result->fetch_array();
   $uname=$row['Username'];
   $table=$row['AccountType'];
   $loginID=$row['LoginID'];
   setcookie("PHPSESSID",session_id(),time()-1,"/",TRUE,TRUE);
   setcookie("PHPSESSID",session_id(),time()+60*60*24*7,"/",TRUE,TRUE);
   //obtain the info about the user
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
   $_SESSION['loginID']=$loginID;
   $_SESSION['CreationTime']=$row['CreationTime'];
   $_SESSION['Email']=$row['Email'];
   extract($_SESSION);
   echo file_get_contents('../Pages/index.html');
   $script=<<<_END
     <script>
     document.head.getElementsByTagName('title').item(0).innerHTML='Welcome back $Fname!';
     </script>
   _END;
   echo $script;
   require_once("./profile.php");
 }
  else{
    //the current session id has not been logged in
    setcookie("PHPSESSID",session_id(),time()-1,"/",TRUE,TRUE);
    $script="<script>    window.location.replace('$http://$host/Scripts/login.php');
    </script>";
    echo $script;
  }
}
else{
  $script="<script>
  window.location.replace('$http://$host/Scripts/login.php');
  </script>";
  echo $script;
};
?>