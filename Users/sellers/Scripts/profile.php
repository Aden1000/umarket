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
if(isset($_FILES['NewProfilePic']) && $_POST['Business']==true) NewProfilePic("Business");
if(isset($_FILES['NewProfilePic']) && $_POST['Owner']==true) NewProfilePic("Owner");
if($_POST['AdjustProfilePic']==true && $_POST['Business']==true) AdjustProfilePic("Business");
if($_POST['AdjustProfilePic']==true && $_POST['Owner']==true) AdjustProfilePic("Owner");
if($_POST['DeleteProfilePic']==true && $_POST['Business']==true) DeleteProfilePic("Business");
if($_POST['DeleteProfilePic']==true && $_POST['Owner']==true) DeleteProfilePic("Owner");
if($_POST['EditAboutBus']==true) EditAbout($_POST['text'],"Business");
if($_POST['EditAboutOwner']==true) EditAbout($_POST['text'],"Owner");
if($REQUEST_URI!=="/Users/sellers/Scripts/index.php" && $REQUEST_URI!=="/Users/sellers/"){
  $script="<script>
  window.location.replace('$http://$host/Scripts/login.php')
  </script>";
  echo $script;
}
$profile=file_get_contents("../Pages/profile.html");
$profile=str_replace(array("\n","\r"),"",$profile);
if(!file_exists("../$Uname/Profile/business_profile.txt") && !file_exists("../$Uname/Profile/business_profile_position.txt")){
  $profilePic="<img src='../Images/avatar.svg' class='AvatarSvg'>";
  
}
else{
  $filename=file_get_contents("../$Uname/Profile/business_profile.txt");
  $profilePic="<img src='../$Uname/Profile/$filename'>";
  $top=file_get_contents("../$Uname/Profile/business_profile_position.txt");
}
if(!file_exists("../$Uname/Profile/owner_profile.txt") && !file_exists("../$Uname/Profile/owner_profile_position.txt")){
  $ownerProfilePic="<img src='../Images/Avatar.svg' class='AvatarSvg'>";
}
else{
  $filename=file_get_contents("../$Uname/Profile/owner_profile.txt");
  $ownerProfilePic="<img src='../$Uname/Profile/$filename'>";
  $top2=file_get_contents("../$Uname/Profile/owner_profile_position.txt");
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
if(!file_exists("../$Uname/Profile/about_owner.txt")){
  $aboutYou="N/A";
}
else{
  $aboutYou=file_get_contents("../$Uname/Profile/about_owner.txt");
  $aboutYou=htmlentities($aboutYou);
  $aboutYou=str_replace("\r","<br>",$aboutYou);
  $aboutYou=str_replace("\n","<br>",$aboutYou);
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
  $("#AboutOwner .ProfilePic").html("$ownerProfilePic");
  $("#AboutOwner .ProfilePic img").css("bottom",$top2);
  $("#AboutOwner #Fullname").html("<h3>$Title $Fname $Lname</h3>");
  $("#AboutOwner #email").html("$Email");
  $("#AboutOwner>div:nth-child(7)").html("$aboutYou");
  setTimeout(function(){
    $("#MainContent>.LoadingImg").addClass('hidden');
    if($("#ProfileHead .ProfilePic img").eq(0).height()>120){
      $("#ProfileHead .ProfilePic").css('justify-content','flex-start');
    }
    if($("#AboutOwner .ProfilePic img").eq(0).height()>60){
      $("#AboutOwner .ProfilePic").css("justify-content","flex-start");
    }
    $("#ProfilePage").attr('class','');
  },3000)
  </script>
  _END;
if($profilePic=="<img src='../Images/avatar.svg' class='AvatarSvg'>"){
  $script.=<<<_END
    <script>
    $("#ProfileHead .ProfilePicOptions label:nth-child(3)").attr('class','locked');
    $("#ProfileHead .ProfilePicOptions label:nth-child(3)").attr('onclick','');
    $("#ProfileHead .ProfilePicOptions label:nth-child(4)").attr('class','locked');
    $("#ProfileHead .ProfilePicOptions label:nth-child(4)").attr('onclick','');
    </script>
    _END;
}
if($ownerProfilePic=="<img src='../Images/Avatar.svg' class='AvatarSvg'>"){
  $script.=<<<_END
    <script>
    $("#AboutOwner .ProfilePicOptions label:nth-child(3)").attr('class','locked');
    $("#AboutOwner .ProfilePicOptions label:nth-child(3)").attr('onclick','');
    $("#AboutOwner .ProfilePicOptions label:nth-child(4)").attr('class','locked');
    $("#AboutOwner .ProfilePicOptions label:nth-child(4)").attr('onclick','');
    </script>
    _END;
}
echo $script;
function NewProfilePic($Type){
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
    case "image/gif":
      $ext="gif";
      break;
    default:
      echo<<<_END
      <script>
      $("#alert #content").html("<img src='../../../Images/Failure.svg'><div>You uploaded an unsupported image type. Only gif, jpeg and png images are allowed.</div>");
       $("#alert").attr('class','shown');
      </script>;
      _END;
      die();
  };
  switch($Type){
    case "Business":
      //delete the previously uploaded image
      if(file_exists("../$Uname/Profile/business_profile.txt")){
    unlink("../$Uname/Profile/".file_get_contents("../$Uname/Profile/business_profile.txt"));
  }
      //create the cuttable profile pic
      $filename="business_profile_".time();
      rename("$img","../$Uname/Profile/$filename".".$ext");
      $profileTxt=fopen("../$Uname/Profile/business_profile.txt",'w');
      $profilePositionTxt=fopen("../$Uname/Profile/business_profile_position.txt","w");
      fwrite($profileTxt,$filename.".$ext");
      fwrite($profilePositionTxt,"0");
      fclose($profileTxt);
      fclose($profilePositionTxt);
      echo <<<_END
      <script>
      $("#ProfileHead .ProfilePic").html("<img src='../$Uname/Profile/$filename.$ext'>");
      $("#ProfileHead .ProfilePic img").eq(0).css('opacity','0');
      setTimeout(function(){
      if($("#ProfileHead .ProfilePic img").eq(0).height()>120){
      $("#ProfileHead .ProfilePic").css('justify-content','flex-start');}
      $("#ProfileHead .ProfilePic img").eq(0).css('opacity','1');
      },2000);
      $("#ProfileHead .ProfilePicOptions label:nth-child(3)").attr('class','');
      $("#ProfileHead .ProfilePicOptions label:nth-child(3)").attr('onclick','adjustProfilePic(false,this.parentElement.parentElement)');
      $("#ProfileHead .ProfilePicOptions label:nth-child(4)").attr('class','');
      $("#ProfileHead .ProfilePicOptions label:nth-child(4)").attr('onclick','deleteProfilePic(this.parentElement.parentElement)');
      </script>
      _END;
      break;
      
    case "Owner":
      if(file_exists("../$Uname/Profile/owner_profile.txt")){
    unlink("../$Uname/Profile/".file_get_contents("../$Uname/Profile/owner_profile.txt"));
  }
      //create the cuttable profile pic
      $filename="owner_profile_".time();
      rename("$img","../$Uname/Profile/$filename".".$ext");
      $profileTxt=fopen("../$Uname/Profile/owner_profile.txt",'w');
      $profilePositionTxt=fopen("../$Uname/Profile/owner_profile_position.txt","w");
      fwrite($profileTxt,$filename.".$ext");
      fwrite($profilePositionTxt,"0");
      fclose($profileTxt);
      fclose($profilePositionTxt);
      echo <<<_END
      <script>
      $("#AboutOwner .ProfilePic").html("<img src='../$Uname/Profile/$filename.$ext'>");
      $("#AboutOwner .ProfilePic img").eq(0).css('opacity','0');
      setTimeout(function(){
      if($("#AboutOwner .ProfilePic img").eq(0).height()>60){
      $("#AboutOwner .ProfilePic").css('justify-content','flex-start');}
      $("#AboutOwner .ProfilePic img").eq(0).css('opacity','1');
      },2000);
      $("#AboutOwner .ProfilePicOptions label:nth-child(3)").attr('class','');
      $("#AboutOwner .ProfilePicOptions label:nth-child(3)").attr('onclick','adjustProfilePic(false,this.parentElement.parentElement)');
      $("#AboutOwner .ProfilePicOptions label:nth-child(4)").attr('class','');
      $("#AboutOwner .ProfilePicOptions label:nth-child(4)").attr('onclick','deleteProfilePic(this.parentElement.parentElement)');
      </script>
      _END;
      break;
  }
  exit;
}
function AdjustProfilePic($Type){
  $Uname=$_SESSION['Uname'];
  $top=sanitizeString($_POST['top']);
  switch($Type){
    case "Business":
      $profilePositionTxt=fopen("../$Uname/Profile/business_profile_position.txt","w");
      fwrite($profilePositionTxt,$top);
      fclose($profilePositionTxt);
      echo <<<_END
      <script>
      $("#ProfileHead .ProfilePic img").css('bottom',$top);
      if($("#ProfilePage .ProfilePic img").eq(0).height()>120){
        $("#ProfilePage .ProfilePic").css("justify-content","flex-start");
      }
      $("#ProfileHead .AdjustPic").addClass('hidden');
      </script>
      _END;
      exit;
      break;
      
    case "Owner":
      $profilePositionTxt=fopen("../$Uname/Profile/owner_profile_position.txt","w");
      fwrite($profilePositionTxt,$top);
      fclose($profilePositionTxt);
      echo <<<_END
      <script>
      $("#AboutOwner .ProfilePic img").css('bottom',$top);
      if($("#AboutOwner .ProfilePic img").eq(0).height()>60){
        $("#AboutOwner .ProfilePic").css("justify-content","flex-start");
      }
      $("#AboutOwner .AdjustPic").addClass('hidden');
      $("#alert>div:nth-child(1)>img").css('display','none');
      $("#alert #content").html("<img src='../../../Images/Success.svg'><div>Adjustment sucessful!</div>")
      $("#alert").attr('class','shown');
      setTimeout(function(){
      $("#alert").attr('class','hidden');
      setTimeout(function(){
      $("#alert>div:nth-child(1)>img").css('display','block');
      },700)
      },2500);
      </script>
      _END;
      exit;
      break;
  }
}
function DeleteProfilePic($Type){
  $Uname=$_SESSION['Uname'];
  switch($Type){
    case "Business":
      if(file_exists("../$Uname/Profile/business_profile.txt") && file_exists("../$Uname/Profile/business_profile_position.txt")){
      unlink("../$Uname/Profile/".file_get_contents("../$Uname/Profile/business_profile.txt"));
      unlink("../$Uname/Profile/business_profile.txt");
      unlink("../$Uname/Profile/business_profile_position.txt");
      }
      $img="<img src='../Images/avatar.svg' class='AvatarSvg'>";
      echo<<<_END
      <script>
      $("#ProfileHead .ProfilePic").html("$img");
      $("#ProfileHead .ProfilePicOptions label:nth-child(3)").attr('class','locked');
      $("#ProfileHead .ProfilePicOptions label:nth-child(3)").attr('onclick','');
      $("#ProfileHead .ProfilePicOptions label:nth-child(4)").attr('class','locked');
      $("#ProfileHead .ProfilePicOptions label:nth-child(4)").attr('onclick','');
      </script>
      _END;
      break;
      
    case "Owner":
      if(file_exists("../$Uname/Profile/owner_profile.txt") && file_exists("../$Uname/Profile/owner_profile_position.txt")){
      unlink("../$Uname/Profile/".file_get_contents("../$Uname/Profile/owner_profile.txt"));
      unlink("../$Uname/Profile/owner_profile.txt");
      unlink("../$Uname/Profile/owner_profile_position.txt");
      }
      $img="<img src='../Images/avatar.svg' class='AvatarSvg'>";
      echo<<<_END
      <script>
      $("#AboutOwner .ProfilePic").html("$img");
      $("#AboutOwner .ProfilePicOptions label:nth-child(3)").attr('class','locked');
      $("#AboutOwner .ProfilePicOptions label:nth-child(3)").attr('onclick','');
      $("#AboutOwner .ProfilePicOptions label:nth-child(4)").attr('class','locked');
      $("#AboutOwner .ProfilePicOptions label:nth-child(4)").attr('onclick','');
      </script>
      _END;
      break;
  }
  exit;
}
function EditAbout($text,$Type){
  $Uname=$_SESSION['Uname'];
  switch($Type){
    case "Business":
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
      break;
      
    case "Owner":
      if(strlen($text)<=100){
    $aboutTxt=fopen("../$Uname/Profile/about_owner.txt","w");
    fwrite($aboutTxt,$text);
    fclose($aboutTxt);
    $text=htmlentities($text);
    $text=str_replace("\n","<br>",$text);
    $text=str_replace("\r","<br>",$text);
    $script=<<<_END
      <script>
      $("#ProfilePage #AboutOwner>div:nth-child(7)").html("$text");
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
      break;
  }
  exit;
}
?>