<?php
$json=file_get_contents("../test.json");
$json=json_decode($json,true);
$comment=$json['Comments'][1];
echo $comment['Username'];
echo "<br>";
echo $comment['Comment'];
echo "<br>";
echo count($json['Comments']);
?>