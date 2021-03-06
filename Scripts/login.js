var http=new XMLHttpRequest();
function SubmitForm(event){
  event.preventDefault();
  var ErrorCount=0;
  //ensure that all fields as filled
  if(checkUname()==false) ErrorCount++
  if(checkPwd()==false) ErrorCount++;
  if(checkAccountType()==false) ErrorCount++;
  if(ErrorCount==0){
    $('.error').html('');
    $('#LoginBtn').eq(0).attr('class','hidden');
    var img=document.createElement("img");
    img.src='./Images/Loading.svg';
    img.id='LoadingImg';
    $("#Form>div:last-child").eq(0).html(img);
    $("#Form>div:last-child").eq(0).append("Checking information...");
    $("#Form>div:last-child").eq(0).removeAttr('class');
    $("#Form input:not(#LoginBtn), #Form select").addClass('locked');
    $("#Form input:not(#LoginBtn), #Form select").attr('disabled',true);
    http.onreadystatechange=handleResponse();
    http.open("POST","./Scripts/login.php",true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http.send(
      "Uname="+ $("#txtUname").eq(0).val() +
      "&Pwd=" + $("#txtPwd").eq(0).val() +
      "&AccountType="+ $("#sltAccountType").eq(0).val()
    )
    function handleResponse(){
      if(http.readyState==4){
        if(http.status==200){
          $("#Form>div:last-child").eq(0).html(img)
          $("#Form>div:last-child").eq(0).append('Almost done...')
          setTimeout(function(){
            $('#response').eq(0).html(http.response);
            $('#Form>div:last-child').eq(0).attr('class','hidden');
            $('#LoginBtn').eq(0).removeClass('hidden');
                $("#Form input:not(#LoginBtn), #Form select").removeClass('locked');
    $("#Form input:not(#LoginBtn), #Form select").removeAttr('disabled');
            http.abort();
          },2000);
        }
      }
      else{
          setTimeout(handleResponse,2000);
        }
    }
  }
}
function checkUname(){
  $("#txtUname").eq(0).siblings().eq(0).html("");
  if($("#txtUname").eq(0).val()==""){
    $("#txtUname").eq(0).siblings().eq(0).html("Please enter your username.");
    $("#txtUname").eq(0).attr('class','Invalid');
    return false;
  }
  else{
    $("#txtUname").eq(0).attr('class','Valid');
    return true;
  }
}
function checkPwd(){
  $("#txtPwd").eq(0).siblings().eq(0).html("");
  if($("#txtPwd").eq(0).val()==""){
    $("#txtPwd").eq(0).siblings().eq(0).html("Please enter your password.");
    $("#txtPwd").eq(0).attr('class','Invalid');
    return false;
  }
  else{
    $("#txtPwd").eq(0).attr('class','Valid');
    return true;
  }
}
function checkAccountType(){
  $("#sltAccountType").eq(0).siblings().eq(0).html("");
  if($("#sltAccountType").eq(0).val()==""){
    $("#sltAccountType").eq(0).siblings().eq(0).html("Please select your account type.");
    $("#sltAccountType").eq(0).attr('class','Invalid');
    return false;
  }
  else{
    $("#sltAccountType").eq(0).attr('class','Valid');
    return true;
  }
}