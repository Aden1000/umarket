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
if($_POST['NewProduct']==true) NewProduct();
if($_POST['ReloadProfile']==true) LoadProfile($Uname,$Fname,$Lname,$BusName,$CreationTime,$Email,$Title,true);
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
LoadProfile($Uname,$Fname,$Lname,$BusName,$CreationTime,$Email,$Title,false);
function LoadProfile($Uname,$Fname,$Lname,$BusName,$CreationTime,$Email,$Title,$Constant){
  $profile=file_get_contents("../Pages/profile.html");
  $profile=str_replace(array("\n","\r"),"",$profile);
  if(!(file_exists("../$Uname/Profile/business_profile.txt") && file_exists("../$Uname/Profile/business_profile_left.txt") && file_exists("../$Uname/Profile/business_profile_top.txt") && file_exists("../$Uname/Profile/business_profile_width.txt"))){
    $busProfilePic="<img src='Images/avatar.svg' class='AvatarSvg'>";  
  }
  else{
    $filename=file_get_contents("../$Uname/Profile/business_profile.txt");
    $busProfilePic="<img src='./$Uname/Profile/$filename' onload='checkProfilePic(this)'>";
    $top=file_get_contents("../$Uname/Profile/business_profile_top.txt");
    $left=file_get_contents("../$Uname/Profile/business_profile_left.txt");
    $width=file_get_contents("../$Uname/Profile/business_profile_width.txt");
  }
  $productJson=file_get_contents("../$Uname/Products/product.json");
  $productJson=json_decode($productJson,true);
  $maxProduct=$productJson['max'];
  $numberProduct=$productJson['numberProducts'];
  $maxProductPic=$productJson['max'];
  
  $serviceJson=file_get_contents("../$Uname/Services/service.json");
  $serviceJson=json_decode($serviceJson,true);
  $maxService=$serviceJson['max'];
  $numberService=$serviceJson['numberServices'];
  $maxServicePic=$serviceJson['max'];
  if(!(file_exists("../$Uname/Profile/owner_profile.txt") && file_exists("../$Uname/Profile/owner_profile_left.txt") && file_exists("../$Uname/Profile/owner_profile_top.txt") && file_exists("../$Uname/Profile/owner_profile_width.txt"))){
    $ownerProfilePic="<img src='Images/Avatar.svg' class='AvatarSvg'>";
  }
  else{
    $filename2=file_get_contents("../$Uname/Profile/owner_profile.txt");
    $ownerProfilePic="<img src='./$Uname/Profile/$filename2' onload='checkProfilePic(this)'>";
    $top2=file_get_contents("../$Uname/Profile/owner_profile_top.txt");
    $left2=file_get_contents("../$Uname/Profile/owner_profile_left.txt");
    $width2=file_get_contents("../$Uname/Profile/owner_profile_width.txt");  }

  if(!file_exists("../$Uname/Profile/about_business.txt")){
    $aboutBusiness="N/A";
  }
  else{
    $aboutBusiness=file_get_contents("../$Uname/Profile/about_business.txt");
    $aboutBusiness=htmlentities($aboutBusiness);
    $aboutBusiness=str_replace("\r","<br>",$aboutBusiness);
    $aboutBusiness=str_replace("\n","<br>",$aboutBusiness);
  }
  if(!file_exists("../$Uname/Profile/ratings.json")){
    $ratings="N/A";
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
  if($Constant!=true){
    $script=<<<_END
      <script>
      const max=$maxProduct;
    const productCount=$numberProduct;
    </script>
    _END;
  }
  $script.=<<<_END
    <script>
    $("#ProfilePage").append("$profile");
    $('#ProfileHead .ProfilePic').html("$busProfilePic");
    document.getElementsByClassName('ProfilePic').item(0).firstChild.style.right=$left;
    document.getElementsByClassName('ProfilePic').item(0).firstChild.style.bottom=$top;
    document.getElementsByClassName('ProfilePic').item(0).firstChild.style.width=$width;
    if($("#ProfileHead .ProfilePic img").css('width')=='120px'){
    $("#ProfileHead .ProfilePic img").css('width','');
    }
    $("#ProfilePage #BusName").html("<h3>$BusName</h3>");
    $("#ProfilePage #Uname").html("@$Uname");
    $("#ProfilePage #CreationTime").html("Joined $CreationTime");
    $("#BusDescriptionText").html("$aboutBusiness");
    $("#BusDescriptionText").parent().addClass("loaded");
    if($("#BusDescriptionText").height()>100){
        $("#BusDescriptionText").siblings(".SeeMore").removeClass('hidden');
      }
    $("#ProfilePage>#Products_Services>div:nth-child(3)>div:nth-child(1)>h4").after("($numberProduct/$maxProduct)");
    $("#ProfilePage>#Products_Services>div:nth-child(4)>div:nth-child(1)>h4").after("($numberService/$maxService)");
    var j;
    for(j=0;j<$maxProductPic;j++){
      var i=j+1;
      var text='AddProductPic'+i;
      if(j==0){
        $("#ProfilePage>#Products_Services>#AddProduct #AddProductPic").append("<div><label for='"+text+"' position='"+i+"'>Add product cover photo<div class='AddBtn'><img src='../../Images/Add.svg'></div></label><div class='hidden AddProductPicOptions'><img src='../../Images/Cancel.svg' onclick='editProductPic(this.parentElement,null)'><img src='../../Images/Ok.svg' onclick='editProductPic(this.parentElement,true)'></div><div class='hidden AddProductPicMenu'><div onclick='removeProductPic(this.parentElement)'>Delete</div><div onclick='editProductPic(this.parentElement,false)'>Edit</div></div></div>")
      }
      else{
         $("#ProfilePage>#Products_Services>#AddProduct #AddProductPic").append("<div><label for='"+text+"' position='"+i+"'>Add product photo<div class='AddBtn'><img src='../../Images/Add.svg'></div></label><div class='hidden AddProductPicOptions'><img src='../../Images/Cancel.svg' onclick='editProductPic(this.parentElement,null)'><img src='../../Images/Ok.svg' onclick='editProductPic(this.parentElement,true)'></div><div class='hidden AddProductPicMenu'><div onclick='removeProductPic(this.parentElement)'>Delete</div><div onclick='editProductPic(this.parentElement,false)'>Edit</div></div></div>")    
      }
    }
    for(j=0;j<$maxServicePic;j++){
      $("#ProfilePage>#Products_Services>#AddService>.ServicePic").append("<div><label>Click to add service image<div class='AddBtn'><img src='../../Images/Add.svg'></label></div>")
    }
    $("#Ratings>div:nth-child(2)").html("$ratings");
    $("#AboutOwner .ProfilePic").html("$ownerProfilePic");
    $("#AboutOwner .ProfilePic img").css("bottom",$top2);
    $("#AboutOwner .ProfilePic img").css("right",$left2);
    $("#AboutOwner .ProfilePic img").css("width",$width2);
    if($("#AboutOwner .ProfilePic img").css("width")=='60px'){
    $("#AboutOwner .ProfilePic img").css("width",'');
    }
    $("#AboutOwner #Fullname").html("<h3>$Title $Fname $Lname</h3>");
    $("#AboutOwner #email").html("$Email");
    $("#AboutOwner>div:nth-child(7)").html("$aboutYou");
    checkDevice();
    </script>
    _END;
  if($profilePic=="<img src='Images/avatar.svg' class='AvatarSvg'>"){
    $script.=<<<_END
    <script>
    $(".ProfilePicOptions").eq(0).children("label:nth-child(3),label:nth-child(4)").addClass('locked');
    $(".ProfilePicOptions").eq(0).children("label:nth-child(3),label:nth-child(4)").removeAttr('onclick');
    </script>
    _END;
  }
  if($ownerProfilePic=="<img src='Images/Avatar.svg' class='AvatarSvg'>"){
    $script.=<<<_END
    <script>
    $(".ProfilePicOptions").eq(1).children("label:nth-child(3),label:nth-child(4)").addClass('locked');
    $(".ProfilePicOptions").eq(1).children("label:nth-child(3),label:nth-child(4)").removeAttr('onclick');
    </script>
    _END;
  }
  echo $script;
  exit();
}
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
      failureAlert("You uploaded an unsupported image type. Only gif, jpeg and png images are allowed.");
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
      $filename="business_profile_".time();
      rename("$img","../$Uname/Profile/$filename".".$ext");
      $profileTxt=fopen("../$Uname/Profile/business_profile.txt",'w');
      $profileTop=fopen("../$Uname/Profile/business_profile_top.txt","w");
      $profileLeft=fopen("../$Uname/Profile/business_profile_left.txt","w");
      $profileWidth=fopen("../$Uname/Profile/business_profile_width.txt","w");
      fwrite($profileTxt,$filename.".$ext");
      fwrite($profileLeft,"");
      fwrite($profileTop,"");
      fwrite($profileWidth,"");
      fclose($profileTxt);
      fclose($profileLeft);
      fclose($profileTop);
      fclose($profileWidth);
      $type='update';
      echo <<<_END
      <script>
      $("#ProfileHead .ProfilePic").html("<img src='$Uname/Profile/$filename.$ext' onload='checkProfilePic(this,$type)'>");
      $("#ProfileHead .ProfilePicOptions label:nth-child(3)").attr('class','');
      $("#ProfileHead .ProfilePicOptions label:nth-child(3)").attr('onclick','adjustProfilePic(false,this.parentElement.parentElement)');
      $("#ProfileHead .ProfilePicOptions label:nth-child(4)").attr('class','');
      $("#ProfileHead .ProfilePicOptions label:nth-child(4)").attr('onclick','deleteProfilePic(this.parentElement.parentElement)');
      </script>
      _END;
      break;
      
   case "Owner":
      //delete the previously uploaded image
      if(file_exists("../$Uname/Profile/owner_profile.txt")){
        unlink("../$Uname/Profile/".file_get_contents("../$Uname/Profile/owner_profile.txt"));
      }
      $filename="owner_profile_".time();
      rename("$img","../$Uname/Profile/$filename".".$ext");
      $profileTxt=fopen("../$Uname/Profile/owner_profile.txt",'w');
      $profileTop=fopen("../$Uname/Profile/owner_profile_top.txt","w");
      $profileLeft=fopen("../$Uname/Profile/owner_profile_left.txt","w");
      $profileWidth=fopen("../$Uname/Profile/owner_profile_width.txt","w");
      fwrite($profileTxt,$filename.".$ext");
      fwrite($profileLeft,"");
      fwrite($profileTop,"");
      fwrite($profileWidth,"");
      fclose($profileTxt);
      fclose($profileLeft);
      fclose($profileTop);
      fclose($profileWidth);
      $type='update';
      echo <<<_END
      <script>
      $("#AboutOwner .ProfilePic").html("<img src='$Uname/Profile/$filename.$ext' onload='checkProfilePic(this,$type)'>");
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
  foreach($_POST as $key=>$value){
    $_POST[$key]=sanitizeString($value);
  }
  extract($_POST);
  switch($Type){
    case "Business":
      $profileTop=fopen("../$Uname/Profile/business_profile_top.txt","w");
      $profileLeft=fopen("../$Uname/Profile/business_profile_left.txt","w");
      $profileWidth=fopen("../$Uname/Profile/business_profile_width.txt","w");
      fwrite($profileTop,$top);
      fwrite($profileLeft,$left);
      fwrite($profileWidth,$width);
      echo <<<_END
      <script>
      $("#ProfileHead .ProfilePic img").css('bottom',$top);
      $("#ProfileHead .ProfilePic img").css('right',$left);
      $("#ProfileHead .ProfilePic img").css('width',$width);
      if($("#ProfileHead .ProfilePic img").css('width')=='120px'){
      $("#ProfileHead .ProfilePic img").css('width','');
      }
      successAlert("Editing successful!");
      $("#ProfileHead .AdjustPic").addClass('hidden');
      </script>
      _END;
      exit;
      break;
      
    case "Owner":
      $profileTop=fopen("../$Uname/Profile/owner_profile_top.txt","w");
      $profileLeft=fopen("../$Uname/Profile/owner_profile_left.txt","w");
      $profileWidth=fopen("../$Uname/Profile/owner_profile_width.txt","w");
      fwrite($profileTop,$top);
      fwrite($profileLeft,$left);
      fwrite($profileWidth,$width);
      echo <<<_END
      <script>
      $("#AboutOwner .ProfilePic img").css('bottom',$top);
      $("#AboutOwner .ProfilePic img").css('right',$left);
      $("#AboutOwner .ProfilePic img").css('width',$width);
      if($("#AboutOwner .ProfilePic img").css('width')=='60px'){
      $("#AboutOwner .ProfilePic img").css('width','');
      }
      successAlert("Editing successful!");
      $("#AboutOwner .AdjustPic").addClass('hidden');
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
      if(file_exists("../$Uname/Profile/business_profile.txt") && file_exists("../$Uname/Profile/business_profile_left.txt") && file_exists("../$Uname/Profile/business_profile_top.txt") && file_exists("../$Uname/Profile/business_profile_width.txt")){
      unlink("../$Uname/Profile/".file_get_contents("../$Uname/Profile/business_profile.txt"));
      unlink("../$Uname/Profile/business_profile.txt");
      unlink("../$Uname/Profile/business_profile_left.txt");
      unlink("../$Uname/Profile/business_profile_top.txt");
      unlink("../$Uname/Profile/business_profile_width.txt");
      }
      $img="<img src='Images/avatar.svg' class='AvatarSvg'>";
      echo<<<_END
      <script>
      $("#ProfileHead .ProfilePic").html("$img");
      $(".ProfilePicOptions").eq(0).children("label:nth-child(3),label:nth-child(4)").addClass('locked');
      $(".ProfilePicOptions").eq(0).children("label:nth-child(3),label:nth-child(4)").removeAttr('onclick');
      successAlert("Profile picture deleted!");
      </script>
      _END;
      break;
      
    case "Owner":
      if(file_exists("../$Uname/Profile/owner_profile.txt") && file_exists("../$Uname/Profile/owner_profile_position.txt")){
      unlink("../$Uname/Profile/".file_get_contents("../$Uname/Profile/owner_profile.txt"));
      unlink("../$Uname/Profile/owner_profile.txt");
      unlink("../$Uname/Profile/owner_profile_position.txt");
      }
      $img="<img src='Images/avatar.svg' class='AvatarSvg'>";
      echo<<<_END
      <script>
      $("#AboutOwner .ProfilePic").html("$img");
      $(".ProfilePicOptions").eq(1).children("label:nth-child(3),label:nth-child(4)").addClass('locked');
      $(".ProfilePicOptions").eq(1).children("label:nth-child(3),label:nth-child(4)").removeAttr('onclick');
      successAlert("Profile picture deleted!");
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
      $("#BusDescriptionText").html("$text");
      $("#BusDescriptionText").parent().addClass("loaded");
      if($("#BusDescriptionText").height()>100){
        $("#BusDescriptionText").siblings(".SeeMore").removeClass('hidden');
      }
      </script>
      _END;
    echo $script;
  }
      else{
    $script=<<<_END
    <script>
      failureAlert("Your description must not be more than 1000 characters");
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
      failureAlert("Your description must not be more than 1000 characters");
    </script>
    _END;
    echo $script;
  }
      break;
  }
  exit;
}
function NewProduct(){
  function ErrorScript($text,$j){
    $script=<<<_END
      <script>
      $("#AddProduct .error").eq($j).html("$text");
      </script>
      _END;
    echo $script;
  }
  function script($text){
    $script=<<<_END
      <script>
      $text
      </script>
      _END;
    echo $script;
  }
  foreach($_POST as $key=>$value){
    $_POST[$key]=sanitizeString($value);
  }
  extract($_POST);
  $ErrorCount=0;
  $script="";
  
  //check product cover pic
  if(!$Top1 || !$_FILES){
    ErrorScript("Please add a cover photo for your product.",0);
    script("$('#AddProductPic label').eq(0).addClass('Invalid')");
    $ErrorCount++;
  }
  else{
    foreach($_FILES as $key=>$values){
      if(!preg_match("/jpeg|png|gif/",$_FILES[$key]['type'])){
        ErrorScript("You uploaded an unsupported image type. Only jpeg, png and gif images are allowed.",0);
        $ErrorCount++;
      };
    }
  }
  
  //check product name
  if(!$Name || preg_match("/[a-zA-Z0-9]/",$Name)==false){
    ErrorScript("Please enter the name of your product.",1);
    script("$('#AddProductName').addClass('Invalid')");
    $ErrorCount++;
  }
  
  //check product description
  if(!$Description || preg_match("/[a-zA-Z0-9]/",$Description)==false){
    ErrorScript("Please enter a product description.",2);
    script("$('#AddProductDescription').addClass('Invalid')");
    $ErrorCount++;
  }
  
  //check product type selected
  if(!$PriceType || preg_match("/[a-zA-Z]/",$PriceType)==false){
    ErrorScript("Please select a price type.",3);
    script("$('#AddProductPriceType').parent().addClass('Invalid')");
    $ErrorCount++;
  }
  else{
    switch($PriceType){
      case "Fixed price":
        //check the fixed price entered
        if(!$Price){
          ErrorScript("Please enter a price.",4);
          script("$('#AddProductFixedPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        elseif(preg_match("/[^0-9]/",$Price)){
          ErrorScript("Please enter a valid price.",4);
          script("$('#AddProductFixedPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        elseif($Price<500){
          ErrorScript("Price must be NGN500 or above.",4);
          script("$('#AddProductFixedPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        break;
        
      case "Range price":
        $Price=explode(',',$Price);
        //check the minimum price entered
        if($Price[0]==''){
          ErrorScript("Please enter a minimum price.",5);
          script("$('#AddProductMinPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        elseif(preg_match("/[^0-9]/",$Price[0])){
          ErrorScript("Please enter a valid price.",5);
          script("$('#AddProductMinPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        elseif($Price[0]<500){
          ErrorScript("Price must be NGN500 or above.",5);
          script("$('#AddProductMinPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        
        //check the maximum price entered
        if($Price[1]==''){
          ErrorScript("Please enter a maximum price.",6);
          script("$('#AddProductMaxPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        elseif(preg_match("/[^0-9]/",$Price[1])){
          ErrorScript("Please enter a valid price.",6);
          script("$('#AddProductMaxPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        elseif($Price[1]<500){
          ErrorScript("Price must be NGN500 or above.",6);
          script("$('#AddProductMaxPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        
        //check if the minimum price is lesser than the maximum price
        if(($Price[0]-$Price[1])>=0){
          ErrorScript("Minimum price must be lesser than maximum price.",5);
          script("$('#AddProductMinPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        break;
        
      case "Discounted price":
        $Price=explode(',',$Price);
        if($Price[0]==''){
          ErrorScript("Please enter the original price.",7);
          script("$('#AddProductOriginalPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        elseif(preg_match("/[^0-9]/",$Price[0])){
          ErrorScript("Please enter a valid price.",7);
          script("$('#AddProductOriginalPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        elseif($Price[0]<500){
          ErrorScript("Price must be NGN500 or above.",7);
          script("$('#AddProductOriginalPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        
        //check the maximum price entered
        if($Price[1]==''){
          ErrorScript("Please enter the discounted price.",8);
          script("$('#AddProductDiscountedPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        elseif(preg_match("/[^0-9]/",$Price[1])){
          ErrorScript("Please enter a valid price.",8);
          script("$('#AddProductDiscountedPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        elseif($Price[1]<500){
          ErrorScript("Price must be NGN500 or above.",8);
          script("$('#AddProductDiscountedPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        //check if the minimum price is lesser than the maximum price
        elseif(($Price[1]-$Price[0])>=0){
          ErrorScript("Discounted price must be lesser than the Original price.",8);
          script("$('#AddProductDiscountedPrice').parent().addClass('Invalid')");
          $ErrorCount++;
        }
        break;
        
    }
  }
  
  //check for errors
  if($ErrorCount>0){
    $script= <<<END
    $("#AddProduct").removeClass('hidden');
    $("#Products_Services>div").eq(1).addClass('hidden');
    failureAlert("Please fix the errors with the form.");
    scrollIntoView("AddProduct");
    END;
    script($script);
  }
  else{
    
  }
  exit;
}
?>