<?php
$text="\rHello";
$text="&";
//$text=htmlspecialchars($text);
$text=htmlentities($text);
echo $text;
?>