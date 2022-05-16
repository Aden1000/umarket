function allow(event)
 {
 event.preventDefault()
 }
 function drag(event,obj)
 {
   event.preventDefault();
   var parent=obj.parentElement
   var top=event.pageY-parent.clientHeight;
   var left=event.pageX-parent.clientWidth;
   if(top<0) top=parent.clientTop;
   if(left<0) {
     var right=event.pageX-parent.clientWidth/2
     right=Math.abs(right);
     console.log(right);
     obj.style.left="";
     obj.style.right=""+right+"px";
   }
   else{
   obj.style.left=""+left+"px";
   }
   obj.style.top=""+top+"px";
 }
 function drop(event)
 {
 event.preventDefault()
 var data=event.dataTransfer.getData('image/png')
 event.target.appendChild(O(data))
 }
function O(obj){
  return typeof obj == 'object' ? obj : document.getElementById(obj)
}
