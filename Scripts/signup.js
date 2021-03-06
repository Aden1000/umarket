var ErrorCount=0;
var Error;
var http=new window.XMLHttpRequest;
function DisplayForm(Button){
  $(Button).siblings().attr('class','unselected');
  $(Button).attr('class','selected');
  $("#Form").attr('class','shown');
  $("div[class='error']").html("");
  $("input[class='Invalid'],select[class='Invalid']").attr('class',"");
  switch(Button.innerHTML){
   case "SELLER":
      $("#Form").children("fieldset").attr('class','shown');
      $("#Form").children("fieldset").eq(1).children("legend").eq(0).html("Owner's Information");
      $("label[for='txtUname']").eq(0).children().eq(0).html("[for your business]");
    $("label[for='txtEmail']").eq(0).children().eq(0).html("[for your business]");
      $("input[name='AccountType']").eq(0).attr('value','Seller account');
      break;
    case "BUYER":
      $("#Form").children("fieldset:nth-child(2)").attr('class','hidden');
      $("#Form").children("fieldset").eq(1).children("legend").eq(0).html("Personal Information");
            $("label[for='txtUname']").eq(0).children().eq(0).html("[for you]");
      $("label[for='txtEmail']").eq(0).children().eq(0).html("[for you]");
            $("input[name='AccountType']").eq(0).attr('value','Buyer account');

      break;
    case "DELIVERY AGENT":
         $("#Form").children("fieldset").attr('class','shown');      $("#Form").children("fieldset").eq(1).children("legend").eq(0).html("Owner's Information");
      $("label[for='txtUname']").eq(0).children().eq(0).html("[for your business]");
      $("label[for='txtEmail']").eq(0).children().eq(0).html("[for your business]");
            $("input[name='AccountType']").eq(0).attr('value','Delivery Agent account');
      break;
  }
}
function SubmitForm(Button){
  $(Button).parent().submit();
}
function EvaluateForm(event,Form){
  event.preventDefault();
  ErrorCount=0;
  var AccountType=document.getElementById("hidAccountType");
  var BusName=document.getElementById("txtBusName");
  var BusType=document.getElementById('txtBusType');
  var Title=document.getElementById('sltTitle');
  var Fname=document.getElementById('txtFname');
  var Lname=document.getElementById('txtLname');
  var DOB=document.getElementById('txtDOB');
  var Uname=document.getElementById('txtUname');
  var Email=document.getElementById('txtEmail');
  var Pwd=document.getElementById('txtPwd');
  var ConfirmPwd=document.getElementById('txtConfirmPwd');
  
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
  if(checkEmail(Email)==false){
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
    if(checkBtype(BusType)==false){
      ErrorCount++
    } 
  }
  if(ErrorCount==0){
    var img=document.createElement("img");
    img.src='./Images/Loading.svg';
    img.id='LoadingImg';
    $("#SubmitBtn").attr('class','hidden');
    $("#Form>div:last-child").attr('class','');
    $("#Form>div:last-child").html(img);
    $("#Form>div:last-child").append("Uploading information...");
    $("#AccountType>div").attr('onclick','');
    $("#AccountType>div").addClass('locked');
    $("#Form input:not(#SubmitBtn)").addClass('locked');
    $("#Form input:not(#SubmitBtn)").attr('disabled',true);
    $("#Form select").addClass('locked');
    $("#Form select").attr('disabled',true);
    var stamp=document.getElementById('txtDOB').valueAsDate.getTime();
    http.onreadystatechange=handleResponse();
    http.open("POST",'Scripts/signup.php',true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    if($(Form).children("input[name='AccountType']").eq(0).attr("value")=="Seller account" || $(Form).children("input[name='AccountType']").eq(0).attr("value")=="Delivery Agent account"){
      http.send(
        "AccountType="+ $(AccountType).attr('value') +
        "&BusName="+ BusName.value +
        "&BusType=" + BusType.value +
        "&Title="+ Title.value +
        "&Fname="+ Fname.value +
        "&Lname="+ Lname.value +
        "&DOB="+ DOB.value +
        "&stamp="+ stamp +
        "&Uname="+ Uname.value +
        "&Email=" + Email.value +
        "&Pwd="+Pwd.value+
        "&ConfirmPwd="+ConfirmPwd.value
      );
    }
    else{
      http.send(
        "AccountType="+ AccountType.value +
        "&Title="+ Title.value +
        "&Fname="+ Fname.value +
        "&Lname="+ Lname.value +
        "&DOB="+ DOB.value +
        "&stamp="+ stamp +
        "&Uname="+ Uname.value +
        "&Email=" + Email.value +
        "&Pwd="+Pwd.value+
        "&ConfirmPwd="+ConfirmPwd.value
      )
    }
      function handleResponse(){
        if(http.readyState==4){
          if(http.status==200){
            $("#Form>div:last-child").html(img);
            $("#Form>div:last-child").append("Verifying data...");
            setTimeout(function(){
              $("#response").html(http.responseText);
              $("#AccountType>div").attr('onclick','DisplayForm(this)');
              $("#AccountType>div").removeClass('locked');
              $("#Form input:not(#SubmitBtn)").removeClass('locked');
              $("#Form input:not(#SubmitBtn)").removeAttr('disabled');
              $("#Form select").removeClass('locked');
              $("#Form select").removeAttr('disabled');
              $("#SubmitBtn").attr("class","");
              $("#Form>div:last-child").attr("class","hidden");
            http.abort();
            },2000);
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
      Error="Please enter your business' name.";
      ErrorCount +=1;
      $(input).siblings().eq(0).html(Error);
      $(input).attr('class','Invalid');
     return false;
    }  
    else if(/[^a-zA-Z,\.'? 0-9]/.test($(input).val())==true){
      Error="Only characters a-z, commas(,), apostrophes(') and fullstops(.) are allowed."
      
      $(input).siblings().eq(0).html(Error);
      $(input).attr('class','Invalid');
      return false;
    }
    else{
      $(input).attr('class','Valid');
      return true;
    }
}
function checkBtype(input){
  $(input).siblings().eq(0).html("");
   if($(input).val()=="" || /[^a-zA-Z| ]/.test($(input).val())==true){
      Error="Please select a business type.";
      $(input).siblings().eq(0).html(Error);
      $(input).attr('class','Invalid');
     return false;
    }
  else{
        $(input).attr('class','Valid');
        return true;
      } 
 }
function checkEmail(input){
  $(input).siblings().eq(0).html("");
  if($(input).val()==""){
    Error="Please enter an email address.";
    $(input).siblings().eq(0).html(Error);
    $(input).attr('class','Invalid');
    return false;
  }
  else if(/[a-z0-9]([_\.-][a-z0-9]+)*@.*\.[a-z]{2,}$/.test($(input).val())==false){
    Error='Please enter a valid email address.';
    $(input).siblings().eq(0).html(Error);
    $(input).attr('class','Invalid');
    return false;
  }
  else{
    $(input).attr('class','Valid');
    return true;
  }
}
function checkTitle(input){
  $(input).siblings().eq(0).html("");
  if($(input).val()=="" || /[^a-zA-Z]/.test($(input).val())==true){
      Error="Please select a title.";
      $(input).siblings().eq(0).html(Error);
      $(input).attr('class','Invalid');
     return false;
    }  
  else{
        $(input).attr('class','Valid');
        return true;
      } 
}
function checkFname(input){
  $(input).siblings().eq(0).html("");
    if($(input).val()==""){
        Error="Please enter your firstname."
        
        $(input).siblings().eq(0).html(Error);
        $(input).attr('class','Invalid');
      return false;
    }
      else if(/[^a-zA-Z ]/.test($(input).val())==true){
        Error="Only letters a-z are allowed."
        
        $(input).siblings().eq(0).html(Error);
        $(input).attr('class','Invalid');
        return false;
      }
      else{
        $(input).attr('class','Valid');
        return true;
      }

}
function checkLname(input){
  $(input).siblings().eq(0).html("");
    if($(input).val()==""){
        Error="Please enter your lastname."
        
        $(input).siblings().eq(0).html(Error);
        $(input).attr('class','Invalid');
      return false;
    }
      else if(/[^a-zA-Z ]/.test($(input).val())==true){
        Error="Only letters a-z are allowed."
        
        $(input).siblings().eq(0).html(Error);
        $(input).attr('class','Invalid');
        return false;
      }
      else{
        $(input).attr('class','Valid');
        return true;
      }

}
function checkDOB(input){
  var Now=new Date();
  $(input).siblings().eq(0).html("");
  if($(input).val()==""){
     Error="Please enter your date of birth."
     $(input).siblings().eq(0).html(Error);
     $(input).attr('class','Invalid');
     return false;
     }
  else{
    if((Now.getFullYear()-input.valueAsDate.getFullYear())<18){
      Error="You must be at least 18 years old to create an account.";
      $(input).siblings().eq(0).html(Error);
      $(input).attr('class','Invalid');
      return false;
    }
    else{
      if(Now.getMonth()<input.valueAsDate.getMonth()){
        Error="You must be at least 18 years old to create an account.";
        $(input).siblings().eq(0).html(Error);
        $(input).attr('class','Invalid');
        return false;
    }
      else if(Now.getMonth()==input.valueAsDate.getMonth()){
        if(Now.getDate()<input.valueAsDate.getDate()){
          Error="You must be at least 18 years old to create an account.";
          $(input).siblings().eq(0).html(Error);
          $(input).attr('class','Invalid');
          return false;
  }
        else{
        $(input).attr('class','Valid');
        $(input).siblings().eq(0).html("");
        return true;
  }
      }
      else{
        $(input).attr('class','Valid');
        $(input).siblings().eq(0).html("");
        return true;
  }
    }
  }
}
function checkUname(input){
  $(input).siblings().eq(0).html("");
  if($(input).val()==""){
      Error="Please enter a username.";
      
      $(input).siblings().eq(0).html(Error);
      $(input).attr('class','Invalid');
    return false;
    }
  else if($(input).val().length<6){
      Error="Your username must be longer than 5 characters.\n"
    
    $(input).siblings().eq(0).html(Error);
    $(input).attr('class','Invalid');
    return false;
  }
  else if(/[^a-zA-Z0-9_]/.test($(input).val())==true){
      Error="Only characters a-z, numbers 0-9 and the underscore(_) are allowed.";
    
    $(input).siblings().eq(0).html(Error);
    $(input).attr('class','Invalid');
    return false;
    }
  else{
      $(input).attr('class','Valid');
    return true;
    }
}
function checkPwd(input){
  $(input).siblings().eq(0).html("");
   if($(input).val()==""){
      Error="Please enter a password.";
      
      $(input).siblings().eq(0).html(Error);
      $(input).attr('class','Invalid');
     return false;
    }
    else if($(input).val().length<6){
      Error="Your password must be longer than 5 characters";
      
      $(input).siblings().eq(0).html(Error);
      $(input).attr('class','Invalid');
      return false;
    }
    else{
      $(input).attr('class','Valid');
      return true;
    }
}
function checkConfirmPwd(input){
  $(input).siblings().eq(0).html("");
  if($(input).val()==""){
      Error="Please confirm your password.";
      $(input).siblings().eq(0).html(Error);
      $(input).attr('class','Invalid');
    return false;
    }
  else if($(input).val()!=$("#txtPwd").val()){
      Error="Both passwords must match.";
      $(input).siblings().eq(0).html(Error);
      $(input).attr('class','Invalid');
    return false;
    }
  else{
      $(input).attr('class','Valid');
    return true;
    }
}