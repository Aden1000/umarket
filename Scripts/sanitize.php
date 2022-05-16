<?php
function sanitizeString($input){
  $input=stripslashes($input);
  $input=strip_tags($input);
  $input=htmlentities($input);
  return $input;
}
?>