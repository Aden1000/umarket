<?php
echo "<html>";
echo "<head>";
echo "<link rel='stylesheet' href='../Styles/test.css'>";
echo "</head>";
echo "<body>";
$paper = array(
  "Copier"=>"Copier and Multipurpose",
   "Inkjet"=>"Inkjet Printer",
   "Laser"=>"Laser Printer",
   "Photo"=>"Photographic Paper");
$j=0;
 foreach($paper as $value)
 {
 echo "[$j]: $value<br>";
   $j++;
 }
echo "</body>";
?>