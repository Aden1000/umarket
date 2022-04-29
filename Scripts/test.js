var http=new window.XMLHttpRequest;
function getResponse(){
  http.onreadystatechange=handleResponse();
  http.open("GET",'./Scripts/test.php',true);
  http.send(null);
  function handleResponse(){
    if(http.readyState==4){
     if(http.status==200){
       var response=$("#response").eq(0).html(http.responseText);
       alert(response);
       http.abort();
     }
     else{
       setTimeout(handleResponse,2000);
     }
   }
  }
}