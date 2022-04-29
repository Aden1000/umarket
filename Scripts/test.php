<?php
session_start();
session_regenerate_id();
setcookie('PHPSESSID',session_id(),time()+60,"/");
echo "Done";
?>