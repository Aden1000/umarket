var http=new window.XMLHttpRequest
function getResponse(value){
  http.onreadystatechange=handleResponse();
  http.open("GET",'Scripts/test.php?txtName='+value,true);
  http.send(null);
  function handleResponse(){
   if(http.readyState==4){
     $("#response").html(http.responseText);
   }
  }
}