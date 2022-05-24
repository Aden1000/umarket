var http=new XMLHttpRequest();
function showProfilePicOptions(Parent){
  switch(Parent.id){
    case "AboutOwner":
      $("#AboutOwner .ProfilePicOptions").removeClass('hidden');
      break;
    case "ProfileHead":
      $("#ProfileHead .ProfilePicOptions").removeClass('hidden');
      break;
  }
}
function closeProfilePicOptions(Parent){
switch(Parent.id){
    case "AboutOwner":
      $("#AboutOwner .ProfilePicOptions").addClass('hidden');
      break;
    case "ProfileHead":
      $("#ProfileHead .ProfilePicOptions").addClass('hidden');
      break;
  }
}
function updateProfilePic(Obj,Parent){
  if(Obj.files.length!==0){
    if(Obj.files[0].type=='image/jpeg' || Obj.files[0].type=='image/png' || Obj.files[0].type=='image/gif'){
      if(Obj.files[0].size<10240000){
        switch(Parent.id){
          case "ProfileHead":
            $("#ProfileHead .EditProfilePic").attr('onclick','');
            $("#ProfileHead .ProfilePicOptions").addClass('hidden');
            $("#ProfileHead .ProfilePic").css('justify-content','center');
            $('#ProfileHead .ProfilePic').html("<img src='../../../Images/Loading.svg' class='LoadingImg'>");
            var formData=new FormData();
            formData.append('NewProfilePic',Obj.files[0]);
            formData.append('Business',true);
            http.onreadystatechange=handleUploadRequest();
            http.open('POST','./profile.php',true);
            http.setRequestHeader("Cache-control",'nocache');
            http.send(formData);
            break;
          
          case "AboutOwner":
            $("#AboutOwner .EditProfilePic").attr('onclick','');
            $("#AboutOwner .ProfilePicOptions").addClass('hidden');
            $("#AboutOwner .ProfilePic").css('justify-content','center');
            $('#AboutOwner .ProfilePic').html("<img src='../../../Images/Loading.svg' class='LoadingImg'>");
            var formData=new FormData();
            formData.append('NewProfilePic',Obj.files[0]);
            formData.append('Owner',true);
            http.onreadystatechange=handleUploadRequest();
            http.open('POST','./profile.php',true);
            http.setRequestHeader("Cache-control",'nocache');
            http.send(formData);
            break;
        }
      }
      else{UploadError("Too big")}
  }
    else{
    UploadError('Invalid');
  }
  }
    function UploadError(error){
      switch(error){
        case "Invalid":
          $("#alert #content").html("<img src='../../../Images/Failure.svg'><div>You uploaded an unsupported image type. Only jpeg and png images are allowed.</div>");
          $("#alert").attr('class','shown');
          break;
        case "Too big":
          $("#alert #content").html("<div class='error'>Please select an image not exceeding 10MB.");
          $("#alert").attr('class','shown');
          break;
      }
    }
    function handleUploadRequest(){
  if(http.readyState==4){
    if(http.status==200){
      $("#response").html(http.response);
      switch(Parent.id){
        case "ProfileHead":
          $("#ProfileHead .EditProfilePic").attr('onclick','showProfilePicOptions(this.parentElement.parentElement)');
          Parent=Obj.parentElement
          $(Obj).remove();
          var inputFile=document.createElement("input");
          inputFile.type='file';
          inputFile.style='display:none';
          inputFile.id='NewProfilePic';
          inputFile.setAttribute("onchange",'updateProfilePic(this,this.parentElement.parentElement.parentElement)')
          $(Parent).append(inputFile);
          break;
        
        case "AboutOwner":
          $("#AboutOwner .EditProfilePic").attr('onclick','showProfilePicOptions(this.parentElement.parentElement)');
          Parent=Obj.parentElement
          $(Obj).remove();
          var inputFile=document.createElement("input");
          inputFile.type='file';
          inputFile.style='display:none';
          inputFile.id='OwnerNewProfilePic';
          inputFile.setAttribute("onchange",'updateProfilePic(this,this.parentElement.parentElement.parentElement)')
          $(Parent).append(inputFile);
          break;
      }
      http.abort();
    }
    else{
      setTimeout(handleUploadRequest,2000);
    }
  }
  else{
    setTimeout(handleUploadRequest,2000);
  }  
}
}
function adjustProfilePic(edited,Parent){
  switch(Parent.id){
    case "ProfileHead":
      $("#ProfileHead .ProfilePicOptions").addClass('hidden');
      switch(edited){
    case true:
      $("#ProfileHead .AdjustPic .Pic").css("overflow","hidden");
      $("#ProfileHead .AdjustPic input").attr('disabled',true);
      $("#ProfileHead .AdjustPic input").css('opacity','0.5');
      $("#ProfileHead .AdjustPic div").eq(1).html("<img src='../../../Images/Loading.svg' class='LoadingImg'>Editing...");
      var top=$("#ProfileHead .AdjustPic .Pic").scrollTop();
      var height=$("#ProfileHead .AdjustPic .Pic").height();
      top=(120/height)*top;
      http.open("POST","profile.php",true);
      http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      http.onreadystatechange=handleAdjustRequest();
      http.send(
        "AdjustProfilePic=true&Business=true"+
        "&top="+top
      )
      break;
    case false: 
          $("#ProfileHead .AdjustPic").removeClass('hidden');
          $("#ProfileHead .AdjustPic input").attr('disabled',true);
          $("#ProfileHead .AdjustPic input").css('opacity','0.5');
          $("#ProfileHead .AdjustPic .Pic").html("<img src='../../../Images/Loading.svg' class='LoadingImg'><br>");
          $("#ProfileHead .AdjustPic div").eq(1).html("Shift the picture to adjust it's position.");
          var img=new Image();
          img.src=$("#ProfileHead .ProfilePic img").attr('src');
          var center=document.createElement("center");
          setTimeout(function(){
          $("#ProfileHead .AdjustPic .Pic").html(center);
          $("#ProfileHead .AdjustPic .Pic center").html(img);
          if(img.height>img.parentElement.parentElement.clientHeight){
          $("#ProfileHead .AdjustPic .Pic").css('justify-content','flex-start');
          }
          $("#ProfileHead .AdjustPic input").attr('disabled',false);
          $("body").css('overflow','hidden');
          $("#ProfileHead .AdjustPic input").css('opacity','1');
          },2000);
          break;
    case null:
      $("#ProfileHead .AdjustPic .Pic").css('justify-content','center');
      $("#ProfileHead .AdjustPic").addClass('hidden');
      $("body").css('overflow','scroll');

}
      break;
      
    case "AboutOwner":
      $("#AboutOwner .ProfilePicOptions").addClass('hidden');
      switch(edited){
    
        case true:
          $("#AboutOwner .AdjustPic .Pic").css("overflow","hidden");
          $("#AboutOwner .AdjustPic input").attr('disabled',true);
          $("#AboutOwner .AdjustPic input").css('opacity','0.5');
          $("#AboutOwner .AdjustPic div").eq(1).html("<img src='../../../Images/Loading.svg' class='LoadingImg'>Editing...");
          var top=$("#AboutOwner .AdjustPic .Pic").scrollTop();
          var height=$("#AboutOwner .AdjustPic .Pic").height();
          top=(60/height)*top;
          http.open("POST","profile.php",true);
          http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          http.onreadystatechange=handleAdjustRequest();
          http.send(
            "AdjustProfilePic=true&Owner=true"+
            "&top="+top
          )
          break;
    
        case false: 
          $("#AboutOwner .AdjustPic").removeClass('hidden');
          $("#AboutOwner .AdjustPic input").attr('disabled',true);
          $("#AboutOwner .AdjustPic input").css('opacity','0.5');
          $("#AboutOwner .AdjustPic .Pic").html("<img src='../../../Images/Loading.svg' class='LoadingImg'><br>");
          $("#AboutOwner .AdjustPic div").eq(1).html("Shift the picture to adjust it's position.");
          var img=new Image();
          img.src=$("#AboutOwner .ProfilePic img").attr('src');
          var center=document.createElement("center");
          setTimeout(function(){
            $("#AboutOwner .AdjustPic .Pic").html(center);
            $("#AboutOwner .AdjustPic .Pic center").html(img);
            if(img.height>img.parentElement.parentElement.clientHeight){
            $("#AboutOwner .AdjustPic .Pic").css('justify-content','flex-start');
            }
            $("#AboutOwner .AdjustPic input").attr('disabled',false);
            $("body").css('overflow','hidden');
            $("#AboutOwner .AdjustPic input").css('opacity','1');
            },2000);
          break;
          
        case null:
          $("#AboutOwner .AdjustPic .Pic").css('justify-content','center');
          $("#AboutOwner .AdjustPic").addClass('hidden');
          $("body").css('overflow','scroll');
}
      break;
  }
 function handleAdjustRequest(){
   if(http.readyState==4){
     if(http.status==200){
           
       switch(Parent.id){
         case "ProfileHead":
           $("#ProfileHead .AdjustPic .Pic").css('justify-content','center');
           $("#ProfileHead .AdjustPic .Pic").css('overflow','scroll');
           $("body").css('overflow','scroll');
           break;
         
         case "AboutOwner":
           $("#AboutOwner .AdjustPic .Pic").css('justify-content','center');
           $("#AboutOwner .AdjustPic .Pic").css('overflow','scroll');
           $("body").css('overflow','scroll');
           break;
       }
       $("#response").html(http.response);
       http.abort();
     }
     else{
       setTimeout(handleAdjustRequest,2000)
     }
   }
   else{
       setTimeout(handleAdjustRequest,2000)
     }

 }
}
function deleteProfilePic(Parent){
  
  switch(Parent.id){
    case "ProfileHead":
      $("#ProfileHead .ProfilePicOptions").addClass('hidden');
      $("#ProfileHead .ProfilePic").css('justify-content','center');
      $("#ProfileHead .ProfilePic").html("<img src='../../../Images/Loading.svg' class='LoadingImg'>");
      http.open("POST",'profile.php');
      http.setRequestHeader('Content-type','application/x-www-form-urlencoded');
      http.onreadystatechange=handleDeleteRequest();
      http.send(
      "DeleteProfilePic=true&Business=true");
      break; 
    
    case "AboutOwner":
      $("#AboutOwner .ProfilePicOptions").addClass('hidden');
      $("#AboutOwner .ProfilePic").css('justify-content','center');
      $("#AboutOwner .ProfilePic").html("<img src='../../../Images/Loading.svg' class='LoadingImg'>");
      http.open("POST",'profile.php');
      http.setRequestHeader('Content-type','application/x-www-form-urlencoded');
      http.onreadystatechange=handleDeleteRequest();
      http.send(
      "DeleteProfilePic=true&Owner=true");
      break;
  }
  function handleDeleteRequest(){
    if(http.readyState==4){
      if(http.status==200){
        $("#response").html(http.response);
        http.abort();
      }
      else{
        setTimeout(handleDeleteRequest,2000);
      }
    }
    else{
        setTimeout(handleDeleteRequest,2000);
      }
  }
}
function editAbout(edited,Parent){
  switch(Parent.id){
    case "BusDescription":
      switch(edited){
    case true:
      if($("#ProfilePage #BusDescription textarea").val()!=="" &&  $("#ProfilePage #BusDescription textarea").val().length<=1000){
        $("#ProfilePage #BusDescription>div:nth-child(1)>div:nth-child(2)").attr('onclick','');
        $("#ProfilePage #BusDescription>div:nth-child(2)").html("<div><img src='../../../Images/Loading.svg' class='LoadingImg'></div><div>Making changes...</div>");
        $("#ProfilePage #BusDescription>div:nth-child(2)").attr('class','');
      $("#ProfilePage #BusDescription>div:nth-child(3)").attr('class','hidden');
        var text=$("#ProfilePage #BusDescription textarea").val();
        var count=text.length;
        var j;
        for(j=0;j<count;j++){
          text=text.replace("&","%26");
          text=text.replace("+","%2B");
        }
        http.open("POST",'profile.php',true);
        http.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        http.onreadystatechange=handleEditRequest();
        http.send("EditAboutBus=true"+
                 "&text="+text);
        function handleEditRequest(){
          if(http.readyState==4){
            if(http.status==200){
               $("#ProfilePage #BusDescription>div:nth-child(2)").html("<div><img src='../../../Images/Loading.svg' class='LoadingImg'></div><div>Almost done...</div>");
              setTimeout(function(){
                $("#response").html(http.response);
                $("#ProfilePage #BusDescription>div:nth-child(1)>div:nth-child(2)").attr('onclick','editAbout(false,this.parentElement.parentElement)');
                http.abort();  
              },2000)
              $("#BusDescription>div:nth-child(3)>input:nth-child(5)").attr('class','locked')
              $("#BusDescription>div:nth-child(3)>input:nth-child(5)").attr('onclick','')

            }
            else{
              setTimeout(handleEditRequest,2000)
            }
          }
          else{
            setTimeout(handleEditRequest,2000);
          }
        }
      }
      break;
      
    case false:
          if($("#ProfilePage #BusDescription>div:nth-child(2)").html()=="N/A"){
            $("#ProfilePage #BusDescription textarea").val("");
            $("#ProfilePage #BusDescription>div:nth-child(3) .WordCount").html("0/1000 words used");
          }
      else{
        var text=$("#ProfilePage #BusDescription>div:nth-child(2)").html();
        var count=text.length;
        var j;
        for(j=0;j<count;j++){
          text=text.replace("<br>","\n");
          text=text.replace("&lt;","<");
          text=text.replace("&gt;",">");
          text=text.replace("&amp;","&");
        }
        $("#ProfilePage #BusDescription textarea").val(text);
        count=text.length;
        $("#ProfilePage #BusDescription>div:nth-child(3) .WordCount").html(count+"/1000 words used");
      }
      $("#ProfilePage #BusDescription>div:nth-child(2)").attr('class','hidden');
      $("#ProfilePage #BusDescription>div:nth-child(3)").attr('class','');
      $("#ProfilePage #BusDescription>div:nth-child(3)>textarea").focus();
      break;
      
      case null:
      setTimeout(function(){$("#ProfilePage #BusDescription>div:nth-child(2)").attr('class','');},500);
      $("#ProfilePage #BusDescription>div:nth-child(3)").attr('class','hidden');
      break;
  }
      break; 
    case "AboutOwner":
      switch(edited){
    case true:
      if($("#ProfilePage #AboutOwner textarea").val()!=="" &&  $("#ProfilePage #AboutOwner textarea").val().length<=100){
        $("#ProfilePage #AboutOwner>div:nth-child(6)>div:nth-child(2)").attr('onclick','');
        $("#ProfilePage #AboutOwner>div:nth-child(7)").html("<div><img src='../../../Images/Loading.svg' class='LoadingImg'></div><div>Making changes...</div>");
        $("#ProfilePage #AboutOwner>div:nth-child(7)").attr('class','');
        $("#ProfilePage #AboutOwner>div:nth-child(8)").attr('class','hidden');
        var text=$("#ProfilePage #AboutOwner textarea").val();
        var count=text.length;
        var j;
        for(j=0;j<count;j++){
          text=text.replace("&","%26");
          text=text.replace("+","%2B");
        }
        http.open("POST",'profile.php',true);
        http.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        http.onreadystatechange=handleEditRequest();
        http.send("EditAboutOwner=true"+
                 "&text="+text);
        function handleEditRequest(){
          if(http.readyState==4){
            if(http.status==200){
               $("#ProfilePage #AboutOwner>div:nth-child(7)").html("<div><img src='../../../Images/Loading.svg' class='LoadingImg'></div><div>Almost done...</div>");
              setTimeout(function(){
                $("#response").html(http.response);
                $("#ProfilePage #AboutOwner>div:nth-child(6)>div:nth-child(2)").attr('onclick','editAbout(false,this.parentElement.parentElement)');
                http.abort();  
              },2000)
              $("#ProfilePage #AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('class','locked')
              $("#ProfilePage #AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('onclick','')

            }
            else{
              setTimeout(handleEditRequest,2000)
            }
          }
          else{
            setTimeout(handleEditRequest,2000);
          }
        }
      }
      break;
      
    case false:
      if($("#ProfilePage #AboutOwner>div:nth-child(7)").html()=="N/A"){
         
        $("#ProfilePage #AboutOwner textarea").val("");
        $("#ProfilePage #AboutOwner>div:nth-child(8) .WordCount").html("0/100 words used");
         }
      else{
        var text=$("#ProfilePage #AboutOwner>div:nth-child(7)").html();
        var count=text.length;
        var j;
        for(j=0;j<count;j++){
        text=text.replace("<br>","\n");
        text=text.replace("&lt;","<");
        text=text.replace("&gt;",">");
        text=text.replace("&amp;","&");
        }
        $("#ProfilePage #AboutOwner textarea").val(text);
        count=text.length;
        $("#ProfilePage #AboutOwner>div:nth-child(8) .WordCount").html(count+"/1000 words used");
      }
      $("#ProfilePage #AboutOwner>div:nth-child(7)").attr('class','hidden');
      $("#ProfilePage #AboutOwner>div:nth-child(8)").attr('class','');
      $("#ProfilePage #AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('class','locked');
      $("#ProfilePage #AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('onclick','');
      $("#ProfilePage #AboutOwner>div:nth-child(8)>textarea").focus();
      break;
      
      case null:
      setTimeout(function(){$("#ProfilePage #AboutOwner>div:nth-child(7)").attr('class','');},500);
      $("#ProfilePage #AboutOwner>div:nth-child(8)").attr('class','hidden');
      break;
  }

      break;
  }
}
function enableEditAbout(Obj,Parent){
  switch(Parent.id){
    case "BusDescription":
      var count=Obj.value.length;
      $("#ProfilePage #BusDescription>div:nth-child(3) .WordCount").html(count+"/1000 words used");
      if(Obj.value==""){
        $("#BusDescription>div:nth-child(3)>input:nth-child(5)").attr('class','locked')
        $("#BusDescription>div:nth-child(3)>input:nth-child(5)").attr('onclick','')
      }
      else{
        $("#BusDescription>div:nth-child(3)>input:nth-child(5)").attr('class','')
        $("#BusDescription>div:nth-child(3)>input:nth-child(5)").attr('onclick','editAbout(true,this.parentElement.parentElement)');
      }
      break;
    case "AboutOwner":
      var count=Obj.value.length;
      $("#ProfilePage #AboutOwner>div:nth-child(8) .WordCount").html(count+"/100 words used");
      if(Obj.value==""){
        $("#ProfilePage #AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('class','locked')
        $("#ProfilePage #AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('onclick','')
      }
      else{
        $("#ProfilePage #AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('class','')
        $("#ProfilePage #AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('onclick','editAbout(true,this.parentElement.parentElement)');
      }
      break;
  }
}
function showProducts_ServicesOptions(){
  $("#Products_Services>div:nth-child(2),#Products_Services>div:nth-child(3)").addClass('hidden');
  setTimeout(function(){
  $("#Products_Services>#Products_ServicesOptions").removeClass('hidden');
  },500)
}
function closeProducts_ServicesOptions(){
  $("#Products_Services>#Products_ServicesOptions").addClass('hidden');
  setTimeout(function(){
  $("#Products_Services>div:nth-child(2),#Products_Services>div:nth-child(3)").removeClass('hidden');
  },500)
}
function showAddProduct(){
  $("#Products_Services>#Products_ServicesOptions").addClass('hidden');
  $("#Products_Services>div:nth-child(1)>.AddBtn").removeAttr('onclick');
  setTimeout(function(){
  $("#Products_Services>div:nth-child(5)").removeClass("hidden");
  },500);
}
function closeAddProduct(){
  $("#Products_Services>div:nth-child(5)").addClass("hidden");  
  $("#Products_Services>div:nth-child(1)>.AddBtn").attr('onclick','showProducts_ServicesOptions()');
  setTimeout(function(){
  $("#Products_Services>div:nth-child(2),#Products_Services>div:nth-child(3)").removeClass('hidden');
  },500);
}