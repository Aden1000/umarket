<?php
function sanitizeString($input){
  $input=stripslashes($input);
  $input=htmlentities($input);
  return $input;
}
?>