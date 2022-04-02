var ErrorCount=0;
var Error=[""];
var http=new window.XMLHttpRequest;
function DisplayForm(Button){
  $(Button).siblings().attr('class','unselected');
  $(Button).attr('class','selected');
  $("#Form").attr('class','shown');
  $("div[class='error']").html("");
  $("input[class='Invalid'],select[class='Invalid']").attr('class',"");
  switch(Button.innerHTML){
   case "SELLER":
      $("#Form").children("fieldset").attr('class','shown');      $("#Form").children("fieldset").eq(1).children("legend").eq(0).html("Owner's Information");
      $("input[name='AccountType']").eq(0).attr('value','Seller account');
      break;
    case "BUYER":
      $("#Form").children("fieldset:nth-child(2)").attr('class','hidden');
      $("#Form").children("fieldset").eq(1).children("legend").eq(0).html("Personal Information");
            $("input[name='AccountType']").eq(0).attr('value','Buyer account');

      break;
    case "DELIVERY AGENT":
         $("#Form").children("fieldset").attr('class','shown');      $("#Form").children("fieldset").eq(1).children("legend").eq(0).html("Owner's Information");
            $("input[name='AccountType']").eq(0).attr('value','Delivery Agent account');
      break;
  }
}
function SubmitForm(Button){
  $(Button).parent().submit();
}
function EvaluateForm(Form){
  ErrorCount=0;
  var BusName=Form.getElementsByTagName("input").item(1);
  var Title=Form.getElementsByTagName("select").item(0);
  var Fname=Form.getElementsByTagName("input").item(2);
  var Lname=Form.getElementsByTagName("input").item(3);
  var DOB=Form.getElementsByTagName("input").item(4);
  var Uname=Form.getElementsByTagName("input").item(5);
  var Pwd=Form.getElementsByTagName("input").item(6);
  var ConfirmPwd=Form.getElementsByTagName("input").item(7);
  
  //evaluate data
   if(checkTitle(Title)==false){
      ErrorCount++
    }
    if(checkFname(Fname)==false){
      ErrorCount++
    }
    if(checkLname(Lname)==false){
      ErrorCount++
    }
    if(checkDOB(DOB)==false){
      ErrorCount++
    }
    if(checkUname(Uname)==false){
      ErrorCount++
    }
    if(checkPwd(Pwd)==false){
      ErrorCount++
    }
    if(checkConfirmPwd(ConfirmPwd)==false){
      ErrorCount++
    }

  if($(Form).children("input[name='AccountType']").eq(0).attr("value")=="Seller account" || $(Form).children("input[name='AccountType']").eq(0).attr("value")=="Delivery Agent account"){
    if(checkBname(BusName)==false){
      ErrorCount++
    }
  }
  if(ErrorCount>0){
      return false
    }
  else{
    http.onreadystatechange=handleResponse();
    http.open("POST",'Scripts/signup.php',true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    if($(Form).children("input[name='AccountType']").eq(0).attr("value")=="Seller account" || $(Form).children("input[name='AccountType']").eq(0).attr("value")=="Delivery Agent account"){
      http.send(
        "BusName="+ BusName.value +
        "&Title="+ Title.value +
        "&Fname="+ Fname.value +
        "&Lname="+ Lname.value +
        "&DOB="+ DOB.value +
        "&Uname="+ Uname.value +
        "&Pwd="+Pwd.value+
        "&ConfirmPwd="+ConfirmPwd.value
      );
    }
    else{
      http.send(
        "Title="+ Title.value +
        "&Fname="+ Fname.value +
        "&Lname="+ Lname.value +
        "&DOB="+ DOB.value +
        "&Uname="+ Uname.value +
        "&Pwd="+Pwd.value+
        "&ConfirmPwd="+ConfirmPwd.value
      )
    }
      function handleResponse(){
        if(http.readyState==4){
          if(http.status==200){
            alert(http.responseText);
            http.abort();
          }
        }
        else{
          setTimeout(handleResponse,2000);
        }
      }
    return false;
  }
}

function checkBname(input){
  $(input).siblings().eq(0).html("");
   if($(input).val()==""){
      Error[0]="Please enter your Business' name.";
      ErrorCount +=1;
      $(input).siblings().eq(0).html(Error[0]);
      $(input).attr('class','Invalid');
     return false;
    }  
    else if(/[^a-zA-Z,\.'? ]/.test($(input).val())==true){
      Error[0]="Only characters a-z, commas(,), apostrophes(') and fullstops(.) are allowed."
      ErrorCount++;
      $(input).siblings().eq(0).html(Error[0]);
      $(input).attr('class','Invalid');
      return false;
    }
    else{
      $(input).siblings().eq(0).html("");
      $(input).attr('class','Valid');
      return true;
    }
}
function checkTitle(input){
  $(input).siblings().eq(0).html("");
   if($(input).val()==""){
      Error[2]="Please select a title.";
      ErrorCount++;
      $(input).siblings().eq(0).html(Error[2]);
      $(input).attr('class','Invalid');
     return false;
    }
      else{
        $(input).siblings().eq(0).html("");
        $(input).attr('class','Valid');
        return true;
      } 
}
function checkFname(input){
  $(input).siblings().eq(0).html("");
    if($(input).val()==""){
        Error[3]="Please enter your firstname."
        ErrorCount++;
        $(input).siblings().eq(0).html(Error[3]);
        $(input).attr('class','Invalid');
      return false;
    }
      else if(/[^a-zA-Z ]/.test($(input).val())==true){
        Error[3]="Only letters a-z are allowed."
        ErrorCount++;
        $(input).siblings().eq(0).html(Error[3]);
        $(input).attr('class','Invalid');
        return false;
      }
      else{
        $(input).siblings().eq(0).html("");
        $(input).attr('class','Valid');
        return true;
      }

}
function checkLname(input){
  $(input).siblings().eq(0).html("");
    if($(input).val()==""){
        Error[4]="Please enter your firstname."
        ErrorCount++;
        $(input).siblings().eq(0).html(Error[3]);
        $(input).attr('class','Invalid');
      return false;
    }
      else if(/[^a-zA-Z ]/.test($(input).val())==true){
        Error[4]="Only letters a-z are allowed."
        ErrorCount++;
        $(input).siblings().eq(0).html(Error[4]);
        $(input).attr('class','Invalid');
        return false;
      }
      else{
        $(input).siblings().eq(0).html("");
        $(input).attr('class','Valid');
        return true;
      }

}
function checkDOB(input){
  $(input).siblings().eq(0).html("");
   if($(input).val()==""){
     Error[5]="Please enter your date of birth."
     ErrorCount++;
     $(input).siblings().eq(0).html(Error[5]);
     $(input).attr('class','Invalid');
     return false;
     }
      else{
        $(input).siblings().eq(0).html("");
        $(input).attr('class','Valid');
        return true;
      }
    
}
function checkUname(input){
  $(input).siblings().eq(0).html("");
  if($(input).val()==""){
      Error[6]="Please enter a username.";
      ErrorCount++;
      $(input).siblings().eq(0).html(Error[6]);
      $(input).attr('class','Invalid');
    return false;
    }
  else if($(input).val().length<6){
      Error[6]="Your username must be longer than 5 characters.\n"
    ErrorCount++;
    $(input).siblings().eq(0).html(Error[6]);
    $(input).attr('class','Invalid');
    return false;
  }
  else if(/[^a-zA-Z0-9_]/.test($(input).val())==true){
      Error[6]="Only characters a-z, numbers 0-9 and the underscore(_) are allowed.";
    ErrorCount++;
    $(input).siblings().eq(0).html(Error[6]);
    $(input).attr('class','Invalid');
    return false;
    }
  else{
      $(input).siblings().eq(0).html("");
      $(input).attr('class','Valid');
    return true;
    }
}
function checkPwd(input){
  $(input).siblings().eq(0).html("");
   if($(input).val()==""){
      Error[7]="Please enter a password.";
      ErrorCount++;
      $(input).siblings().eq(0).html(Error[7]);
      $(input).attr('class','Invalid');
     return false;
    }
    else if($(input).val().length<6){
      Error[7]="Your password must be longer than 5 characters";
      ErrorCount++;
      $(input).siblings().eq(0).html(Error[7]);
      $(input).attr('class','Invalid');
      return false;
    }
    else{
      $(input).siblings().eq(0).html("");
      $(input).attr('class','Valid');
      return true;
    }
}
function checkConfirmPwd(input){
  $(input).siblings().eq(0).html("");
  if($(input).val()==""){
      Error[8]="Please confirm your password.";
      ErrorCount++;
      $(input).siblings().eq(0).html(Error[8]);
      $(input).attr('class','Invalid');
    return false;
    }
  else if($(input).val()!=$("#txtPwd").val()){
      Error[8]="Both passwords must match.";
      ErrorCount++;
      $(input).siblings().eq(0).html(Error[8]);
      $(input).attr('class','Invalid');
    return false;
    }
  else{
      $(input).siblings().eq(0).html("");
      $(input).attr('class','Valid');
    return true;
    }
}