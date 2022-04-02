<?php
extract($_SERVER);
$referer1="http://" . sanitizeString($HTTP_HOST) . "/signup.html";
$referer2="https://" . sanitizeString($HTTP_HOST) . "/signup.html";
if(sanitizeString($HTTP_REFERER) !== $referer1 && sanitizeString($HTTP_REFERER) !== $referer2){
  echo <<<_END
  <script>location.replace("http://$HTTP_HOST/signup.html")
  </script>
  _END;
}
foreach($_POST as $key=>$value){
  $value=sanitizeString($value);
}
print_r($_POST);
function sanitizeString($input){
  $input=htmlentities($input);
  $input=stripslashes($input);
  $input=strip_tags($input);
  return $input;
}
?>