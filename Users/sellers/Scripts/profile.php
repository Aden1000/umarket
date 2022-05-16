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
if(isset($_FILES['NewProfilePic'])) NewProfilePic();
if($_POST['AdjustProfilePic']==true) AdjustProfilePic();
if($_POST['DeleteProfilePic']==true) DeleteProfilePic();
if($_POST['EditAboutBus']==true) EditAboutBus($_POST['text']);
if($REQUEST_URI!=="/Users/sellers/Scripts/index.php" && $REQUEST_URI!=="/Users/sellers/"){
  $script="<script>
  window.location.replace('$http://$host/Scripts/login.php')
  </script>";
  echo $script;
}
$profile=file_get_contents("../Pages/profile.html");
$profile=str_replace(array("\n","\r"),"",$profile);
if(!file_exists("../$Uname/Profile/profile.txt") && !file_exists("../$Uname/Profile/profile_position.txt")){
  $profilePic="<img src='../Images/avatar.svg' class='AvatarSvg'>";
  
}
else{
  $filename=file_get_contents("../$Uname/Profile/profile.txt");
  $profilePic="<img src='../$Uname/Profile/$filename'>";
  $top=file_get_contents("../$Uname/Profile/profile_position.txt");
}
if(!file_exists("../$Uname/Profile/about_business.txt")){
  $aboutBusiness="N/A";
}
else{
  $aboutBusiness=file_get_contents("../$Uname/Profile/about_business.txt");
  $aboutBusiness=htmlentities($aboutBusiness);
  $aboutBusiness=str_replace("\r","<br>",$aboutBusiness);
  $aboutBusiness=str_replace("\n","<br>",$aboutBusiness);
}
if(!file_exists("../$Uname/Profile/about_you.txt")){
  $aboutYou="N/A";
}
else{
  $aboutYou=file_get_contents("../$Uname/Profile/description.txt");
}
if(!file_exists("../$Uname/Profile/about_you_profile.txt")){
  $ownerProfilePic="<img src='../Images/Avatar.svg' class='AvatarSvg'>";
}
$script=<<<_END
  <script>
  $("#ProfilePage").html("$profile");
  $('#ProfileHead .ProfilePic').html("$profilePic");
  $("#ProfileHead .ProfilePic img").css('bottom',$top);
  $("#ProfilePage #BusName").html("<h3>$BusName</h3>");
  $("#ProfilePage #Uname").html("@$Uname");
  $("#ProfilePage #CreationTime").html("Joined $CreationTime");
  $("#BusDescription>div:nth-child(2)").html("$aboutBusiness");
  $("#ProfilePage #AboutOwner .ProfilePic").html("$ownerProfilePic");
  $("#ProfilePage #AboutOwner #Fullname").html("<h3>$Fname $Lname</h3>");
  $("#ProfilePage #AboutOwner #email").html("$Email");
  $("#ProfilePage #AboutOwner").append("$aboutYou");
  setTimeout(function(){
    $("#MainContent>.LoadingImg").addClass('hidden');
    if($("#ProfilePage .ProfilePic img").eq(0).height()>120){
    $("#ProfilePage .ProfilePic").css("justify-content","flex-start");
    }
    $("#ProfilePage").attr('class','');
  },2000);
  </script>
  _END;
if($profilePic=="<img src='../Images/avatar.svg' id='AvatarSvg'>"){
  $script.=<<<_END
    <script>
    $("#ProfilePicOptions label:nth-child(3)").attr('class','locked');
    $("#ProfilePicOptions label:nth-child(3)").attr('onclick','');
    $("#ProfilePicOptions label:nth-child(4)").attr('class','locked');
    $("#ProfilePicOptions label:nth-child(4)").attr('onclick','');
    </script>
    _END;
}
echo $script;
function NewProfilePic(){
  $Uname=$_SESSION['Uname'];
  $img=$_FILES['NewProfilePic']['tmp_name'];
   switch($_FILES['NewProfilePic']['type']){
    case "image/jpeg":
        $ext="jpeg";
        break;
    case "image/png":
      $ext="png";
      break;
    case "image/jpg":
      $ext="jpg";
      break;
    default:
      echo<<<_END
      $("#alert #content").html("<div class='error'>You uploaded an unsupported image type. Only jpeg and png images are allowed</div>");
      $("#alert").attr('class','shown');
      _END;
      die();
  };

  //delete the previously uploaded profile pic
  if(file_exists("../$Uname/Profile/profile.txt")){
    unlink("../$Uname/Profile/".file_get_contents("../$Uname/Profile/profile.txt"));
  }
  //create the cuttable profile pic
  $filename="profile_".time();
  rename("$img","../$Uname/Profile/$filename".".$ext");
  $profileTxt=fopen("../$Uname/Profile/profile.txt",'w');
  $profilePositionTxt=fopen("../$Uname/Profile/profile_position.txt","w");
  fwrite($profileTxt,$filename.".$ext");
  fwrite($profilePositionTxt,"0");
  fclose($profileTxt);
  fclose($profilePositionTxt);
  echo <<<_END
  <script>
  $("#ProfilePage .ProfilePic").html("<img src='../$Uname/Profile/$filename.$ext'>");
  $(".ProfilePic img").eq(0).css('opacity','0');
  setTimeout(function(){
  if($(".ProfilePic img").eq(0).height()>120){
  $(".ProfilePic").css('justify-content','flex-start');}
  $(".ProfilePic img").eq(0).css('opacity','1');
  },2000);
  $("#ProfilePicOptions label:nth-child(3)").attr('class','');
  $("#ProfilePicOptions label:nth-child(3)").attr('onclick','adjustProfilePic(false)');
  $("#ProfilePicOptions label:nth-child(4)").attr('class','');
  $("#ProfilePicOptions label:nth-child(4)").attr('onclick','deleteProfilePic()');
  </script>
  _END;
  exit;
}
function AdjustProfilePic(){
  $Uname=$_SESSION['Uname'];
  $top=sanitizeString($_POST['top']);
  $profilePositionTxt=fopen("../$Uname/Profile/profile_position.txt","w");
  fwrite($profilePositionTxt,$top);
  fclose($profilePositionTxt);
  echo <<<_END
  <script>
  $("#ProfileHead .ProfilePic img").css('bottom',$top);
  if($("#ProfilePage .ProfilePic img").eq(0).height()>120){
    $("#ProfilePage .ProfilePic").css("justify-content","flex-start");
  }
  $("#AdjustPic").attr('class','hidden');
  </script>
  _END;
  exit;
}
function DeleteProfilePic(){
  $Uname=$_SESSION['Uname'];
  if(file_exists("../$Uname/Profile/profile.txt") && file_exists("../$Uname/Profile/profile_position.txt")){
    unlink("../$Uname/Profile/".file_get_contents("../$Uname/Profile/profile.txt"));
    unlink("../$Uname/Profile/profile.txt");
    unlink("../$Uname/Profile/profile_position.txt");
  }
  $img="<img src='../Images/avatar.svg' id='AvatarSvg'>";
  echo<<<_END
  <script>
  $(".ProfilePic").html("$img");
  $("#ProfilePicOptions label:nth-child(3)").attr('class','locked');
  $("#ProfilePicOptions label:nth-child(3)").attr('onclick','');
  $("#ProfilePicOptions label:nth-child(4)").attr('class','locked');
  $("#ProfilePicOptions label:nth-child(4)").attr('onclick','');
  </script>
  _END;
  exit;
}
function EditAboutBus($text){
  $Uname=$_SESSION['Uname'];
  if(strlen($text)<=1000){
    $aboutTxt=fopen("../$Uname/Profile/about_business.txt","w");
    fwrite($aboutTxt,$text);
    fclose($aboutTxt);
    $text=htmlentities($text);
    $text=str_replace("\n","<br>",$text);
    $text=str_replace("\r","<br>",$text);
    $script=<<<_END
      <script>
      $("#BusDescription>div:nth-child(2)").html("$text");
      $("#BusDescription>div:nth-child(3)").attr('class','hidden');
      $("#BusDescription>div:nth-child(2)").attr('class','');
      </script>
      _END;
    echo $script;
  }
  else{
    $script=<<<_END
    <script>
      $("#alert #content").html("Your description must not be more than 1000 characters");
    </script>
    _END;
    echo $script;
  }
  exit;
}
?>