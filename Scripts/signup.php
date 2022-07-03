<?php
require_once('./mysql.php');             
require_once('./sanitize.php');
$ErrorCount=0;
extract($_SERVER);
$host=sanitizeString($HTTP_HOST);
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
  $mysql=connect('select');
  $query="SELECT * FROM login WHERE LoginID=\"$LoginID\" and IP=\"$REMOTE_ADDR\"";
  $result=$mysql->query($query);
 if($result->num_rows==1){
   $row=$result->fetch_array();
   $uname=$row['Username'];
   $table=$row['AccountType'];
   $loginID=$row['LoginID'];
   //obtain the info about the user
   setcookie(session_name(),session_id(),time()+60*60*24*7,"/",$host,true,true);
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
   $_SESSION['Pwd']=$_POST['Pwd'];
   $_SESSION['loginID']=$loginID;
   $_SESSION['CreationTime']=$row['CreationTime'];
   $script="
   <script>
   window.location.replace('$http://$host/Users/$table');
   </script>";
   echo $script;
   die();
 };
}
setcookie("PHPSESSID",$_COOKIE['PHPSESSID'],time()-1,"/",$host,true,true);


//ensure that the call to this script is from the signup page
if(sanitizeString($HTTP_REFERER) !== $referer){
  //the current session id has not been logged in
  echo <<<_END
  <script>
  window.location.replace("$http://$host/signup.html")
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
  setTimeout(function(){location.replace("$referer")},3000);
  </script>
  _END;
  exit;
  }
switch($AccountType){
  case "Seller account":
    $table='sellers';
    break;
  case "Buyer account":
    $table='buyers';
    break;
  case "Delivery Agent account":
    $table='delivery_agents';
    break;
}
if($AccountType=="Seller account" or $AccountType=="Delivery Agent account"){
  if(checkBname($BusName,$table)==false) $ErrorCount++;
  if(checkBtype($BusType)==false) $ErrorCount++;
  }
if(checkTitle($Title)==false) $ErrorCount++;
if(checkFname($Fname)==false) $ErrorCount++;
if(checkLname($Lname)==false) $ErrorCount++;
if(checkDOB($DOB,$stamp)==false) $ErrorCount++;
if(checkUname($Uname,$table)==false) $ErrorCount++;
if(checkEmail($Email,$table)==false) $ErrorCount++;
if(checkPwd($Pwd)==false) $ErrorCount++;
if(checkConfirmPwd($ConfirmPwd,$Pwd)==false) $ErrorCount++;
if($ErrorCount==0){
  $Pwd=password_hash($Pwd,PASSWORD_DEFAULT);
  $mysql=connect('insert');
  switch($AccountType){
    case "Seller account":
      $stmt=$mysql->prepare("INSERT INTO sellers  (BusName,BusType,Email,Title,Firstname,Lastname,DOB,Username,Password) VALUES (?,?,?,?,?,?,?,?,?)");
      $stmt->bind_param("sssssssss",$BusName,$BusType,$Email,$Title,$Fname,$Lname,$DOB,$Uname,$Pwd);
      $stmt->execute();
      if(!file_exists("../Users/sellers/$Uname")){
        mkdir("../Users/sellers/$Uname");
        $htaccess=fopen("../Users/sellers/$Uname/.htaccess","w");
        $string=<<<_END
          DirectoryIndex ../../sellers
          DirectoryIndexRedirect off
          _END;
        fwrite($htaccess,$string);
        fclose($htaccess);
        mkdir("../Users/sellers/$Uname/Profile");
        $htaccess=fopen("../Users/sellers/$Uname/Profile/.htaccess","w");
        $string=<<<_END
          DirectoryIndex ../../../sellers
          DirectoryIndexRedirect off
          _END;
        fwrite($htaccess,$string);
        fclose($htaccess);
        mkdir("../Users/sellers/$Uname/Products");
        copy("../Users/sellers/$Uname/Profile/.htaccess","../Users/sellers/$Uname/Products/.htaccess");
        $productJson=fopen("../Users/sellers/$Uname/Products/product.json","w");
        $string=<<<_END
        {
          "max":3,
          "numberProducts":0,
          "Products":[
            ]
        }
        _END;
        fwrite($productJson,$string);
        fclose($productJson); 
        mkdir("../Users/sellers/$Uname/Services");
        copy("../Users/sellers/$Uname/Profile/.htaccess","../Users/sellers/$Uname/Services/.htaccess");
        $serviceJson=fopen("../Users/sellers/$Uname/Services/service.json","w");
        $string=<<<_END
        {
          "max":3,
          "numberServices":0,
          "Services":[
            ]
        }
        _END;
        fwrite($serviceJson,$string);
        fclose($serviceJson);
        mkdir("../Users/sellers/$Uname/Messages");
        copy("../Users/sellers/$Uname/Profile/.htaccess","../Users/sellers/$Uname/Messages/.htaccess");
        mkdir("../Users/sellers/$Uname/Orders");
        copy("../Users/sellers/$Uname/Profile/.htaccess","../Users/sellers/$Uname/Orders/.htaccess");
        mkdir("../Users/sellers/$Uname/Images");
        copy("../Users/sellers/$Uname/Profile/.htaccess","../Users/sellers/$Uname/Images/.htaccess");
      }
      break;
      
    case "Buyer account":
      $stmt=$mysql->prepare("INSERT INTO buyers  (Title,Firstname,Lastname,DOB,Username,Email,Password) VALUES (?,?,?,?,?,?,?)");
      $stmt->bind_param("sssssss",$Title,$Fname,$Lname,$DOB,$Uname,$Email,$Pwd);
      $stmt->execute();
      break;
      
    case "Delivery Agent account":
      $stmt=$mysql->prepare("INSERT INTO delivery_agents (BusName,BusType,Email,Title,Firstname,Lastname,DOB,Username,Password) VALUES (?,?,?,?,?,?,?,?,?)");
      $stmt->bind_param("sssssssss",$BusName,$BusType,$Email,$Title,$Fname,$Lname,$DOB,$Uname,$Pwd);
      $stmt->execute();
      break;
  }
  $mysql=disconnect();
  setcookie("PHPSESSID",session_id(),time()+60*60*24*7,"/",$host,true,true);
  $_SESSION['initialized']=true;
  $_SESSION['logged_in']=true;
  $_SESSION['Fname']=$Fname;
  $_SESSION['Lname']=$Lname;
  $_SESSION['BusName']=$BusName;
  $_SESSION['BusType']=$BusType;
  $_SESSION['AccountType']=$table;
  $_SESSION['Uname']=$Uname;
  $_SESSION['Pwd']=$_POST['Pwd'];
  $_SESSION['LoginID']=session_id();
  $script="<script>
  window.location.replace('$http://$host/Scripts/login.php');
  </script>";
  echo $script;
}
function checkBname($input,$table){
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
    $mysql=connect('select');
    $mysql=connect('select');
    $stmt=$mysql->prepare("SELECT BusName FROM $table where BusName=?");
    $stmt->bind_param("s",$input);
    $stmt->execute();
    $result=$stmt->get_result();
    if($result->num_rows>0){
      $Error="Sorry. This business name has been used already.";
      $script="<script>
      $('#txtBusName').siblings().eq(0).html(\"$Error\");
      $('#txtBusName').attr('class','Invalid');
      </script>";
      $mysql=disconnect();
      $stmt->close();
      echo $script;
      return false;
    }
    else{
      $mysql=disconnect();
      $stmt->close();
      return true;
    }
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
function checkEmail($input,$table){
  if($input==""){
    $Error='Please enter an email address.';
    $script="<script>
    $('#txtEmail').siblings().eq(0).html(\"$Error\");
    $('#txtEmail').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  elseif(preg_match("/[a-z0-9]([_\.-][a-z0-9]+)*@.*\.[a-z]{2,}$/",$input)==false){
    $Error="Please enter a valid email address.";
    $script="<script>
    $('#txtEmail').siblings().eq(0).html(\"$Error\");
    $('#txtEmail').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
  else{
    $mysql=connect('select');
    $query="SELECT Email FROM $table WHERE Email='$input'";
    $result=$mysql->query($query);
    if($result->num_rows>0){
      $Error="Sorry. This email address has been used already.";
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
function checkDOB($input,$stamp){
  $year=date("Y");
  $month=date("m")-1;
  $day=date("d")+1;
  $stamp=$stamp/1000;
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
    if(($year-date("Y",$stamp))<18){
    $Error="You must be at least 18 years old to create an account.";
    $script="<script>
    $('#txtDOB').siblings().eq(0).html(\"$Error\");
    $('#txtDOB').attr('class','Invalid');
    </script>";
    echo $script;
    return false;
  }
    else{
      if($month<(date("m",$stamp)-1)){
        $Error="You must be at least 18 years old to create an account.";
        $script="<script>
        $('#txtDOB').siblings().eq(0).html(\"$Error\");
        $('#txtDOB').attr('class','Invalid');
        </script>";
        echo $script;
        return false;
  }
      elseif($month==(date("m",$stamp)-1)){
        if($day<(date("d",$stamp)+1)){
          $Error="You must be at least 18 years old to create an account.";
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
      else{
        return true;
      }
    }
  }
}
function checkUname($input,$table){
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
    $mysql=connect('select');
    $stmt=$mysql->prepare("SELECT Username FROM $table WHERE Username=?");
    $stmt->bind_param("s",$input);
    $stmt->execute();
    $result=$stmt->get_result();
    if($result->num_rows>0){
      $Error="Sorry. This username has been used already.";
      $script="<script>
      $('#txtUname').siblings().eq(0).html(\"$Error\");
      $('#txtUname').attr('class','Invalid');
      </script>";
      $mysql=disconnect();
      $stmt->close();
      echo $script;
      return false;
    }
    else{
      $mysql=disconnect();
      $stmt->close();
      return true;
  }
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