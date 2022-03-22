function DisplayForm(Button){
  $(Button).siblings().attr('class','unselected');
  $(Button).attr('class','selected');
  if(Button.innerHTML=='SELLER'){
    $("form[id='SellerType']").attr('class','shown');
    $("form[id='BuyerType']").attr('class','hidden');
 $("form[id='DeliveryAgentType']").attr('class','hidden');
  }
  else if(Button.innerHTML=='BUYER'){
    $("form[id='SellerType']").attr('class','hidden');
    $("form[id='BuyerType']").attr('class','shown');
    $("form[id='DeliveryAgentType']").attr('class','hidden');
  }
   
  else{
    $("form[id='SellerType']").attr('class','hidden');
    $("form[id='BuyerType']").attr('class','hidden');
    $("form[id='DeliveryAgentType']").attr('class','shown');
  }
}

function SubmitForm(Button){
  $(Button).parent().submit();
}

function EvaluateForm(Form){
  var ErrorCount=0;
  var Error=[""];
  if(Form.id=="SellerType") 
  {
    Seller(Form);
  }    
  else if(Form.id=="BuyerType")
  {
    Buyer(Form);
  }
  else
  {
    DeliveryAgent(Form)
  }
  
  function Seller(Form)
  {
    //create the necessary variables for each form element
   var BusName=$(Form).find("input").eq(1);
    var Title=$(Form).find("select").eq(0);
    var Firstname=$(Form).find("input").eq(2);
    var Lastname=$(Form).find("input").eq(3);
    var DOB=$(Form).find("input").eq(4);
    var Username=$(Form).find("input").eq(5);
    var Pwd=$(Form).find("input").eq(6);
    var ConfirmPwd=$(Form).find("input").eq(7);
  
    //begin the data evaluation
    if(BusName.val()==""){
      Error[0]="Please enter your Business' name.";
      ErrorCount +=1;
      BusName.siblings().eq(0).html(Error[0]);
      BusName.attr('class','Invalid');
    }  
    else if(/[^a-zA-Z,\. ]/.test(BusName.val())==true){
      Error[0]="Only characters a-z, commas(,) and fullstops(.) are allowed."
      ErrorCount++;
      BusName.siblings().eq(0).html(Error[0]);
      BusName.attr('class','Invalid');
    }
    else{
      BusName.siblings().eq(0).html("");
      BusName.attr('class','Valid');;
    }
    
    //evaluate the personal info
      if(Title.val()==""){
  
      Error[2]="Please select a title.";
      ErrorCount++;
      Title.siblings().eq(0).html(Error[2]);
      Title.attr('class','Invalid');
    }
      else{
      
        Title.siblings().eq(0).html("");
        Title.attr('class','Valid');;
      }
   
      if(Firstname.val()==""){
        Error[3]="Please enter your firstname."
        ErrorCount++;
        Firstname.siblings().eq(0).html(Error[3]);
        Firstname.attr('class','Invalid');
    }
      else if(/[^a-zA-Z]/.test(Firstname.val())==true){
        Error[3]="Only letters a-z are allowed."
        ErrorCount++;
        Firstname.siblings().eq(0).html(Error[3]);
        Firstname.attr('class','Invalid');
      }
      else{
        Firstname.siblings().eq(0).html("");
        Firstname.attr('class','Valid');;
      }
      
      if(Lastname.val()==""){
        Error[4]="Please enter your lastname.";
        ErrorCount++;
        Lastname.siblings().eq(0).html(Error[4]);
        Lastname.attr('class','Invalid');
      }
      else if(/[^a-zA-Z]/.test(Lastname.val())==true){
        Error[4]="Only letter a-z are allowed";
        ErrorCount++;
        Lastname.siblings().eq(0).html(Error[4]);
        Lastname.attr('class','Invalid');
      }
      else{
        Lastname.siblings().eq(0).html("");
        Lastname.attr('class','Valid');; 
      }
      
      if(DOB.val()==""){
     
       Error[5]="Please enter your date of birth."
       ErrorCount++;
       DOB.siblings().eq(0).html(Error[5]);
       DOB.attr('class','Invalid');
     }
      else{
        DOB.siblings().eq(0).html("");
        DOB.attr('class','Valid');;
      }
    
    if(Username.val()==""){
      Error[6]="Please enter a username.";
      ErrorCount++;
      Username.siblings().eq(0).html(Error[6]);
      Username.attr('class','Invalid');
    }
    else if(Username.val().length<6){
      Error[6]="Your username must be longer than 5 characters.\n"
      ErrorCount++;
      if(/[^a-zA-Z0-9_]/.test(Username.val())==true){
      Error[6]+="Only characters a-z, numbers 0-9 and the underscore(_) are allowed.";
      ErrorCount++;
      Username.siblings().eq(0).html(Error[6]);
      Username.attr('class','Invalid');
      }
    }    
    else{
      Username.siblings().eq(0).html("");
      Username.attr('class','Valid');;
    }
    
    if(Pwd.val()==""){
      Error[7]="Please enter a password.";
      ErrorCount++;
      Pwd.siblings().eq(0).html(Error[7]);
      Pwd.attr('class','Invalid');
    }
    else if(Pwd.val().length<6){
      Error[7]="Your password must be longer than 5 characters";
      ErrorCount++;
      Pwd.siblings().eq(0).html(Error[7]);
      Pwd.attr('class','Invalid'); 
    }
    else{
      Pwd.siblings().eq(0).html("");
      Pwd.attr('class','Valid');;
       
    }
    
    if(ConfirmPwd.val()==""){
      Error[8]="Please confirm your password.";
      ErrorCount++;
      ConfirmPwd.siblings().eq(0).html(Error[8]);
      ConfirmPwd.attr('class','Invalid');
    }
    else if(ConfirmPwd.val()!=Pwd.val()){
      Error[8]="Both passwords must match.";
      ErrorCount++;
      ConfirmPwd.siblings().eq(0).html(Error[8]);
      ConfirmPwd.attr('class','Invalid');
    }
    else{
      ConfirmPwd.siblings().eq(0).html("");
      ConfirmPwd.attr('class','Valid');;
    }
  }
  
  function Buyer(Form)
  {
    var Title=$(Form).find("select").eq(0);
    var Firstname=$(Form).find("input").eq(1);
    var Lastname=$(Form).find("input").eq(2);
    var DOB=$(Form).find("input").eq(3);
    var StateOrigin=$(Form).find("select").eq(1); 
    var Username=$(Form).find("input").eq(4);
    var Pwd=$(Form).find("input").eq(5);
    var ConfirmPwd=$(Form).find("input").eq(6);
 
    //begin the evaluation
     if(Title.val()==""){
  
      Error[2]="Please select a title.";
      ErrorCount++;
      Title.siblings().eq(0).html(Error[2]);
      Title.attr('class','Invalid');
    }
      else{
      
        Title.siblings().eq(0).html("");
        Title.attr('class','Valid');;
      }
   
      if(Firstname.val()==""){
        Error[3]="Please enter your firstname."
        ErrorCount++;
        Firstname.siblings().eq(0).html(Error[3]);
        Firstname.attr('class','Invalid');
    }
      else if(/[^a-zA-Z]/.test(Firstname.val())==true){
        Error[3]="Only letters a-z are allowed."
        ErrorCount++;
        Firstname.siblings().eq(0).html(Error[3]);
        Firstname.attr('class','Invalid');
      }
      else{
        Firstname.siblings().eq(0).html("");
        Firstname.attr('class','Valid');;
      }
      
      if(Lastname.val()==""){
        Error[4]="Please enter your lastname.";
        ErrorCount++;
        Lastname.siblings().eq(0).html(Error[4]);
        Lastname.attr('class','Invalid');
      }
      else if(/[^a-zA-Z]/.test(Lastname.val())==true){
        Error[4]="Only letter a-z are allowed";
        ErrorCount++;
        Lastname.siblings().eq(0).html(Error[4]);
        Lastname.attr('class','Invalid');
      }
      else{
        Lastname.siblings().eq(0).html("");
        Lastname.attr('class','Valid');; 
      }
      
      if(DOB.val()==""){
     
       Error[5]="Please enter your date of birth."
       ErrorCount++;
       DOB.siblings().eq(0).html(Error[5]);
       DOB.attr('class','Invalid');
     }
      else{
        DOB.siblings().eq(0).html("");
        DOB.attr('class','Valid');;
      }
    
     if(Username.val()==""){
      Error[6]="Please enter a username.";
      ErrorCount++;
      Username.siblings().eq(0).html(Error[6]);
      Username.attr('class','Invalid');
    }
    else if(Username.val().length<6){
      Error[6]="Your username must be longer than 5 characters.\n"
      ErrorCount++;
      if(/[^a-zA-Z0-9_]/.test(Username.val())==true){
      Error[6]+="Only characters a-z, numbers 0-9 and the underscore(_) are allowed.";
      ErrorCount++;
      Username.siblings().eq(0).html(Error[6]);
      Username.attr('class','Invalid');
      }
    }    
    else{
      Username.siblings().eq(0).html("");
      Username.attr('class','Valid');;
    }
    
    if(Pwd.val()==""){
      Error[7]="Please enter a password.";
      ErrorCount++;
      Pwd.siblings().eq(0).html(Error[7]);
      Pwd.attr('class','Invalid');
    }
    else if(Pwd.val().length<6){
      Error[7]="Your password must be longer than 5 characters";
      ErrorCount++;
      Pwd.siblings().eq(0).html(Error[7]);
      Pwd.attr('class','Invalid'); 
    }
    else{
      Pwd.siblings().eq(0).html("");
      Pwd.attr('class','Valid');;
       
    }
    
    if(ConfirmPwd.val()==""){
      Error[8]="Please confirm your password.";
      ErrorCount++;
      ConfirmPwd.siblings().eq(0).html(Error[8]);
      ConfirmPwd.attr('class','Invalid');
    }
    else if(ConfirmPwd.val()!=Pwd.val()){
      Error[8]="Both passwords must match.";
      ErrorCount++;
      ConfirmPwd.siblings().eq(0).html(Error[8]);
      ConfirmPwd.attr('class','Invalid');
    }
    else{
      ConfirmPwd.siblings().eq(0).html("");
      ConfirmPwd.attr('class','Valid');;
    }
  }
  
  function DeliveryAgent(Form)
  {
    var BusName=$(Form).find("input").eq(1);
    var Title=$(Form).find("select").eq(0);
    var Firstname=$(Form).find("input").eq(2);
    var Lastname=$(Form).find("input").eq(3);
    var DOB=$(Form).find("input").eq(4);
    var StateOrigin=$(Form).find("select").eq(1);
    var Username=$(Form).find("input").eq(5);
    var Pwd=$(Form).find("input").eq(6);
    var ConfirmPwd=$(Form).find("input").eq(7);

    //begin the data evaluation
    if(BusName.val()==""){
      Error[0]="Please enter your Business' name.";
      ErrorCount +=1;
      BusName.siblings().eq(0).html(Error[0]);
      BusName.attr('class','Invalid');
    }  
    else if(/[^a-zA-Z,\. ]/.test(BusName.val())==true){
      Error[0]="Only characters a-z, commas(,) and fullstops(.) are allowed."
      ErrorCount++;
      BusName.siblings().eq(0).html(Error[0]);
      BusName.attr('class','Invalid');
    }
    else{
      BusName.siblings().eq(0).html("");
      BusName.attr('class','Valid');;
    }
    
    //evaluate the personal info
      if(Title.val()==""){
  
      Error[2]="Please select a title.";
      ErrorCount++;
      Title.siblings().eq(0).html(Error[2]);
      Title.attr('class','Invalid');
    }
      else{
      
        Title.siblings().eq(0).html("");
        Title.attr('class','Valid');;
      }
   
      if(Firstname.val()==""){
        Error[3]="Please enter your firstname."
        ErrorCount++;
        Firstname.siblings().eq(0).html(Error[3]);
        Firstname.attr('class','Invalid');
    }
      else if(/[^a-zA-Z]/.test(Firstname.val())==true){
        Error[3]="Only letters a-z are allowed."
        ErrorCount++;
        Firstname.siblings().eq(0).html(Error[3]);
        Firstname.attr('class','Invalid');
      }
      else{
        Firstname.siblings().eq(0).html("");
        Firstname.attr('class','Valid');;
      }
      
      if(Lastname.val()==""){
        Error[4]="Please enter your lastname.";
        ErrorCount++;
        Lastname.siblings().eq(0).html(Error[4]);
        Lastname.attr('class','Invalid');
      }
      else if(/[^a-zA-Z]/.test(Lastname.val())==true){
        Error[4]="Only letter a-z are allowed";
        ErrorCount++;
        Lastname.siblings().eq(0).html(Error[4]);
        Lastname.attr('class','Invalid');
      }
      else{
        Lastname.siblings().eq(0).html("");
        Lastname.attr('class','Valid');; 
      }
      
      if(DOB.val()==""){
     
       Error[5]="Please enter your date of birth."
       ErrorCount++;
       DOB.siblings().eq(0).html(Error[5]);
       DOB.attr('class','Invalid');
     }
      else{
        DOB.siblings().eq(0).html("");
        DOB.attr('class','Valid');;
      }

  //evaluate Account information
    if(Username.val()==""){
      Error[6]="Please enter a username.";
      ErrorCount++;
      Username.siblings().eq(0).html(Error[6]);
      Username.attr('class','Invalid');
    }
    else if(Username.val().length<6){
      Error[6]="Your username must be longer than 5 characters.\n"
      ErrorCount++;
      if(/[^a-zA-Z0-9_]/.test(Username.val())==true){
      Error[6]+="Only characters a-z, numbers 0-9 and the underscore(_) are allowed.";
      ErrorCount++;
      Username.siblings().eq(0).html(Error[6]);
      Username.attr('class','Invalid');
      }
    }    
    else{
      Username.siblings().eq(0).html("");
      Username.attr('class','Valid');;
    }
    
    if(Pwd.val()==""){
      Error[7]="Please enter a password.";
      ErrorCount++;
      Pwd.siblings().eq(0).html(Error[7]);
      Pwd.attr('class','Invalid');
    }
    else if(Pwd.val().length<6){
      Error[7]="Your password must be longer than 5 characters";
      ErrorCount++;
      Pwd.siblings().eq(0).html(Error[7]);
      Pwd.attr('class','Invalid'); 
    }
    else{
      Pwd.siblings().eq(0).html("");
      Pwd.attr('class','Valid');;
       
    }
    
    if(ConfirmPwd.val()==""){
      Error[8]="Please confirm your password.";
      ErrorCount++;
      ConfirmPwd.siblings().eq(0).html(Error[8]);
      ConfirmPwd.attr('class','Invalid');
    }
    else if(ConfirmPwd.val()!=Pwd.val()){
      Error[8]="Both passwords must match.";
      ErrorCount++;
      ConfirmPwd.siblings().eq(0).html(Error[8]);
      ConfirmPwd.attr('class','Invalid');
    }
    else{
      ConfirmPwd.siblings().eq(0).html("");
      ConfirmPwd.attr('class','Valid');;
    }
  }

  if(ErrorCount>0){
      return false
    }
  else{
  
      return true
    }
}