<?php
global $Error,$ErrorCount,$script,$string,$referer,$host;
require_once('./mysql.php');             
require_once('./sanitize.php');
$ErrorCount=0;
extract($_SERVER);
$host=sanitizeString($HTTP_HOST);
if($HTTPS=='on'){
  $referer="https://$host/signup.html";
}
else{
  $referer="http://" . $host . "/signup.html";
}

//ensure that the call to this script is from the signup page
if(sanitizeString($HTTP_REFERER) !== $referer){
  echo <<<_END
  <script>location.replace("http://$host/signup.html")
  </script>
  _END;
}

//check the length of each entry submitted
foreach($_POST as $value){
  if(strlen($value)>50){
    echo <<<_END
    <script>
    $(".error").eq(0).html("No entry must exceed the maximum of 50 characters.
    </script>;
    _END;
    exit;
  }
}

//sanitize each entry submitted
foreach($_POST as $key=>$value){
  $value=sanitizeString($value);
  $_POST[$key]=$value;
}
extract($_POST);

//check if the value of hidAccountType is empty
if($AccountType!=="Seller account" && $AccountType!=="Buyer account" && $AccountType!=="Delivery Agent account"){
    echo <<<_END
  <script>
  $('.error').eq(0).html("Sorry, an error Occured!");
  setTimeout(function(){location.replace("$referer1")},3000);
  </script>
  _END;
  exit;
  }

if(checkBname($BusName)==false) $ErrorCount++;
if(checkBtype($BusType)==false) $ErrorCount++;
if(checkEmail($Email)==false) $ErrorCount++;
if(checkTitle($Title)==false) $ErrorCount++;
if(checkFname($Fname)==false) $ErrorCount++;
if(checkLname($Lname)==false) $ErrorCount++;
if(checkDOB($DOB)==false) $ErrorCount++;
if(checkUname($Uname)==false) $ErrorCount++;
if(checkPwd($Pwd)==false) $ErrorCount++;
if(checkConfirmPwd($ConfirmPwd,$Pwd)==false) $ErrorCount++;
if($ErrorCount>0) {
  exit;
}
else{
  require_once('mysql.php');
  $mysql=connect('insert');
  $mysql=disconnect();
}

function checkBname($input){
  if($input==""){
    $Error="Please enter your business' name.";
    $script="<script>
    $('#txtBusName').siblings().eq(0).html(\"$Error\");
    $('#txtBusName').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(preg_match("/[^a-zA-Z,\.'? 0-9]/",$input)){
    $Error="Only characters a-z, commas(,), apostrophes(') and fullstops(.) are allowed.";
    $script="<script>
    $('#txtBusName').siblings().eq(0).html(\"$Error\");
    $('#txtBusName').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    return true;
  }
}
function checkBtype($input){
  if($input=="" || preg_match("/[^a-zA-Z| ]/",$input)){
    $Error="Please select a business type.";
    $script="<script>
    $('#txtBusType').siblings().eq(0).html(\"$Error\");
    $('#txtBusType').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    return true;
  }
}
function checkEmail($input){
  if($input==""){
    $Error='Please enter an email address.';
    $script="<script>
    $('#txtEmail').siblings().eq(0).html(\"$Error\");
    $('#txtEmail').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(preg_match("/@.*\.[a-z]+$/",$input)==false){
    $Error="Please enter a valid email address.";
    $script="<script>
    $('#txtEmail').siblings().eq(0).html(\"$Error\");
    $('#txtEmail').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    return true;
  }
}
function checkTitle($input){
  if($input==""){
    $Error="Please select a title.";
    $script="<script>
   $('#sltTitle').siblings().eq(0).html(\"$Error\");
   $('#sltTitle').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    return true;
  }
}
function checkFname($input){
  if($input==""){
    $Error="Please enter your firstname.";
    $script="<script>
    $('#txtFname').siblings().eq(0).html(\"$Error\");
    $('#txtFname').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(preg_match("/[^a-zA-Z ]/",$input)){
    $Error='Only letters a-z are allowed.';
    $script="<script>
    $('#txtFname').siblings().eq(0).html(\"$Error\");
    $('#txtFname').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    return true;
  }
}
function checkLname($input){
  if($input==""){
    $Error="Please enter your lastname.";
    $script="<script>
    $('#txtLname').siblings().eq(0).html(\"$Error\");
    $('#txtLname').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(preg_match("/[^a-zA-Z ]/",$input)){
    $Error='Only letters a-z are allowed.';
    $script="<script>
    $('#txtLname').siblings().eq(0).html(\"$Error\");
    $('#txtLname').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    return true;
  }

}
function checkDOB($input){
  if($input=="" || preg_match("/[^0-9\-]/",$input)){
    $Error="Please enter your date of birth.";
    $script="<script>
    $('#txtDOB').siblings().eq(0).html(\"$Error\");
    $('#txtDOB').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    return true;
  }
}
function checkUname($input){
  if($input==""){
    $Error="Please enter a username.";
    $script="<script>
    $('#txtUname').siblings().eq(0).html(\"$Error\");
    $('#txtUname').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(strlen($input)<6){
    $Error="Your username must be longer than 5 characters";
    $script="<script>
    $('#txtUname').siblings().eq(0).html(\"$Error\");
    $('#txtUname').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(preg_match("/[^a-zA-Z0-9_]/",$input)){
    $Error="Only characters a-z, numbers 0-9 and the underscore(_) are allowed.";
    $script="<script>
    $('#txtUname').siblings().eq(0).html(\"$Error\");
    $('#txtUname').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    return true;
  }
}
function checkPwd($input){
  if($input==""){
    $Error="Please enter a password.";
    $script="<script>
    $('#txtPwd').siblings().eq(0).html(\"$Error\");
    $('#txtPwd').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(strlen($input)<6){ 
    $Error="Your password must be longer than 5 characters.";
    $script="<script>
    $('#txtPwd').siblings().eq(0).html(\"$Error\");
    $('#txtPwd').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    return true;
  }
}
function checkConfirmPwd($input,$input2){
  if($input==""){
    $Error="Please confirm your password.";
    $script="<script>
    $('#txtConfirmPwd').siblings().eq(0).html(\"$Error\");
    $('#txtConfirmPwd').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif($input!==$input2){   
    $Error="Both passwords must match.";
    $script="<script>
    $('#txtConfirmPwd').siblings().eq(0).html(\"$Error\");
    $('#txtConfirmPwd').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    return true;
  }
}
?>