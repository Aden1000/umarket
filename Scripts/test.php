<?php
echo "<html>";
echo "<head>";
echo "<title>File/Folder Creation</title>";
echo "<link rel='stylesheet' href='../Styles/test.css'>";
echo "<link rel='icon' href='../Images/Umarket.ico'";
echo "</head>";
echo "<body>";
echo "</body>";
extract($_POST);
$Name=sanitizeString($Name);
if($Name!==""){
  echo $Name;
  exit;
}
else{
  echo "...";
  exit;
}
function sanitizeString($input){
  $input=stripslashes($input);
  $input=htmlentities($input);
  return $input;
}
?>