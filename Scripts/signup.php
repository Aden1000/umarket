<?php
global $Error,$ErrorCount,$script,$string;
$ErrorCount=0;
extract($_SERVER);
$referer1="http://" . sanitizeString($HTTP_HOST) . "/signup.html";
$referer2="https://" . sanitizeString($HTTP_HOST) . "/signup.html";
if(sanitizeString($HTTP_REFERER) !== $referer1 && sanitizeString($HTTP_REFERER) !== $referer2){
  echo <<<_END
  <script>location.replace("http://$HTTP_HOST/signup.html")
  </script>
  _END;
}

//sanitize each entry submitted
foreach($_POST as $key=>$value){
  $value=sanitizeString($value);
  $_POST[$key]=$value;
}
extract($_POST);

//check the length of each entry submitted
foreach($_POST as $value){
  if(strlen($value)>30){
    echo <<<_END
    <script>
    $(".error").eq(0).html("No entry must exceed the maximum 30 characters.
    </script>;
    _END;
    exit;
  }
}

if(checkBname($BusName)==false) $ErrorCount++;
if(checkTitle($Title)==false) $ErrorCount++;
if(checkFname($Fname)==false) $ErrorCount++;
if(checkLname($Lname)==false) $ErrorCount++;
if(checkDOB($DOB)==false) $ErrorCount++;
if(checkUname($Uname)==false) $ErrorCount++;
if(checkPwd($Pwd)==false) $ErrorCount++;
if(checkConfirmPwd($ConfirmPwd,$Pwd)==false) $ErrorCount++;
if($ErrorCount>0) exit;

function sanitizeString($input){
  $input=stripslashes($input);
  $input=strip_tags($input);
  $input=htmlentities($input);
  return $input;

}
function checkAccountType($input){
  if($input!=="Seller account" && $input!=="Buyer account" && $input!=="Delivery Agent account"){
    echo <<<_END
  <script>
  $('.error').eq(0).html("Sorry, an error Occured!");
  setTimeout(function(){location.replace("http://$HTTP_HOST/signup.html")},3000);
  </script>
  _END;
  }}
function checkBname($input){
  if($input==""){
    $Error="Please enter your business' name.";
    
    $script="<script>
    $('.error').eq(1).html(\"$Error\");
    $('#Form').find('input').eq(1).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(preg_match("/[^a-zA-Z,\.'? 0-9]/",$input)){
    $Error="Only characters a-z, commas(,), apostrophes(') and fullstops(.) are allowed.";
    
    $script="<script>$('.error').eq(1).html(\"$Error\")</script>";
    echo $script;
    return false;
  }
  else{
   $script="<script>
    $('#Form').find('input').eq(1).attr('class','Valid');
    </script>";
    echo $script;
    return true;
  }
}
function checkTitle($input){
  if($input==""){
    $Error="Please select a title.";
    
    $script="<script>
    $('.error').eq(2).html(\"$Error\");
    $('#Form').find('select').eq(0).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
     $script="<script>
    $('#Form').find('select').eq(0).attr('class','Valid');
    </script>";
    echo $script;
    return true;
  }
}
function checkFname($input){
  if($input==""){
    $Error="Please enter your firstname.";
    
    $script="<script>
    $('.error').eq(3).html(\"$Error\");
    $('#Form').find('input').eq(2).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(preg_match("/[^a-zA-Z ]/",$input)){
    $Error='Only letters a-z are allowed.';
    
    $script="<script>
    $('.error').eq(3).html(\"$Error\");
    $('#Form').find('input').eq(2).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    $script="<script>
    $('#Form').find('input').eq(2).attr('class','Valid');
    </script>";
    echo $script;
    return true;
  }
}
function checkLname($input){
  if($input==""){
    $Error="Please enter your lastname.";
    $script="<script>
    $('.error').eq(4).html(\"$Error\");
    $('#Form').find('input').eq(3).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(preg_match("/[^a-zA-Z ]/",$input)){
    $Error='Only letters a-z are allowed.';
    
    $script="<script>
    $('.error').eq(3).html(\"$Error\");
    $('#Form').find('input').eq(3).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    $script="<script>
    $('#Form').find('input').eq(3).attr('class','Valid');
    </script>";
    echo $script;
    return true;
  }

}
function checkDOB($input){
  if($input=="" || preg_match("/[^0-9\-]/",$input)){
    $Error="Please enter your date of birth.";
    $script="<script>
    $('.error').eq(5).html(\"$Error\");
    $('#Form').find('input').eq(4).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
     $script="<script>
     $('#Form').find('input').eq(4).attr('class','Valid');
    </script>";
    echo $script;
    return true;
  }
}
function checkUname($input){
  if($input==""){
    $Error="Please enter a username.";
    $script="<script>
    $('.error').eq(6).html(\"$Error\");
    $('#Form').find('input').eq(5).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(strlen($input)<6){
    $Error="Your username must be longer than 5 characters";
    $script="<script>
    $('.error').eq(6).html(\"$Error\");
    $('#Form').find('input').eq(5).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(preg_match("/[^a-zA-Z0-9_]/",$input)){
    $Error="Only characters a-z, numbers 0-9 and the underscore(_) are allowed.";
    $script="<script>
    $('.error').eq(4).html(\"$Error\");
    $('#Form').find('input').eq(5).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
     $script="<script>
     $('#Form').find('input').eq(5).attr('class','Valid');
    </script>";
    echo $script;
    return true;
  }
}
function checkPwd($input){
  if($input==""){
    $Error="Please enter a password.";
    
    $script="<script>
    $('.error').eq(7).html(\"$Error\");
    $('#Form').find('input').eq(6).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(strlen($input)<6){ 
    $Error="Your password must be longer than 5 characters.";
    $script="<script>
    $('.error').eq(7).html(\"$Error\");
    $('#Form').find('input').eq(6).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    $script="<script>
    $('#Form').find('input').eq(6).attr('class','Valid');
    </script>";
    echo $script;
    return true;
  }
}
function checkConfirmPwd($input,$input2){
  if($input==""){
    $Error="Please confirm your password.";
    $script="<script>
    $('.error').eq(8).html(\"$Error\");
    $('#Form').find('input').eq(7).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif($input!==$input2){   
    $Error="Both passwords must match.";
    $script="<script>
    $('.error').eq(8).html(\"$Error\");
    $('#Form').find('input').eq(7).attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    $script="<script>
    $('#Form').find('input').eq(7).attr('class','Valid');
    </script>";
    echo $script;
    return true;
  }
}
?>