var http=new window.XMLHttpRequest;
function getResponse(value){
  http.onreadystatechange=handleResponse();
  http.open("POST",'Scripts/test.php',true);
  http.setRequestHeader("Content-type",
 "application/x-www-form-urlencoded");
  http.send('txtName='+value);
  function handleResponse(){
   if(http.readyState==4){
     if(http.status==200){
     $("#response").html(http.responseText);
       http.abort();
     }
   }
  }
}