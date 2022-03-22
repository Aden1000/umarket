document.body.onload=function(){
  ShowModule();
}
function ShowModule(){
  var NhiddenModule=$("[class='hidden module']").length;
  for(j=0; j<NhiddenModule; j++){
    Position=document.getElementsByClassName("hidden module").item(0).getBoundingClientRect().top;
   if (CheckPosition(Position)==true){
    $("[class='hidden module']").first().attr("class","shown module"); 
   }
  }
  function CheckPosition(Position){
    var ScreenHeight=window.innerHeight-40;
    if(Position<ScreenHeight){
      return true
    }
  }
}