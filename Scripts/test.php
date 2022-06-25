<?php
 class Variations{
  public $Color=['Red','Blue','Indigo'];
};
$Variations=new Variations();
$name="Color";
print_r($Variations->$name);
?>