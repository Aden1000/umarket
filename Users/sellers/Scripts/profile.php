<?php
session_start();
extract($_SESSION);
if(!file_exists("../$Uname/Profile/index.html")) {
  $text=createProfile();
  echo $text;
}
function createProfile(){
  $text=<<<_END
    _END;
  return $text;
}
?>