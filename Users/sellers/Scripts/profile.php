<?php
session_start();
extract($_SESSION);
extract($_SERVER);
require_once("../../../Scripts/sanitize.php");
$host=sanitizeString($HTTP_HOST);
if($HTTPS=='on'){
  $http='https';
}
else{
  $http='http';
}
//check if the call to this script is from Users/sellers/Scripts/index.php
if($REQUEST_URI!=="/Users/sellers/Scripts/index.php"){
  $script="<script>
  window.location.replace('$http://$host/Scripts/login.php')
  </script>";
  echo $script;
}
$profile=file_get_contents("../Pages/profile.html");
$profile=str_replace(array("\n","\r"),"",$profile);
if(!file_exists("../$Uname/Profile/profile.png") && !file_exists("../$Uname/Profile/profile.jpg") && !file_exists("../$Uname/Profile/profile.jpeg")){
  $profilePic="<img src='../Images/avatar.svg'>";
}
elseif(file_exists("../$Uname/Profile/profile.png")){
  $profilePic="<img src='../$Uname/Proflie/profile.png'>";
}
elseif(file_exists("../$Uname/Profile/profile.jpg")){
  $profilePic="<img src='../$Uname/Profile/profile.jpg'>";
}
elseif(file_exists("../$Uname/Profile/profile.jpeg")){
  $profilePic="<img src='../$Uname/Profile/profile.jpeg'>";
}
if(!file_exists("../$Uname/Profile/description.txt")){
  $profileDescription="N/A";
}
else{
  $profileDescription=file_get_contents("../$Uname/Profile/description.txt");
}
$script=<<<_END
  <script>
  $("#ProfilePage").html("$profile");
  $("#ProfilePage #ProfilePic").html("$profilePic");
  $("#ProfilePage #BusName").html("<h3>$BusName</h3>")
  $("#ProfilePage #Uname").html("@$Uname");
  $("#ProfilePage #CreationTime").html("Joined $CreationTime");
  $("#ProfilePage #BusDescription").append("$profileDescription");
  setTimeout(function(){
  $("#LoadingImg").attr('class','hidden');
  $("#ProfilePage").attr('class','');
  },2000);
  </script>
  _END;
echo $script;
function createProfile(){
  $text=<<<_END
    Hello;
    _END;
  return $text;
}
?>