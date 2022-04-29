<?php
global $host,$pwd;
extract($_SERVER);
//mysqli($hn, $un, $pw, $db);
function connect($user){
  return new mysqli("$host","$user","Jesusismylord1","users");
}
function disconnect(){
  return null;
}
?>