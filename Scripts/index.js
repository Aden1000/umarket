ShowModule();
function ShowModule(){
  var count=document.getElementsByClassName("hidden module").length;
  for(j=0; j<count; j++){
    var HiddenModule=document.getElementsByClassName("hidden module").item(0);
   if (CheckPosition(HiddenModule)==true){
     HiddenModule.setAttribute('class','shown module');
   }
  }
  function CheckPosition(Object){
    Position=Object.getBoundingClientRect().top;
    var ScreenHeight=window.innerHeight-40;
    if(Position<ScreenHeight){
      return true
    }
  }
}