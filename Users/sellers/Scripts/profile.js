var http=new XMLHttpRequest();
function showProfilePicOptions(){
  $("#ProfileHead #ProfilePicOptions").attr('class','');
}
function closeProfilePicOptions(){
$("#ProfileHead #ProfilePicOptions").attr('class','hidden');
}
function updateProfilePic(Obj){
  if(Obj.files.length!==0){
    if((Obj.files[0].type=='image/jpeg' || Obj.files[0].type=='image/png')){
      if(Obj.files[0].size<10240000){
        $("#EditProfilePic").attr('onclick','');
        $("#ProfilePicOptions").attr('class','hidden');
        $("#ProfilePic").css('justify-content','center');
        $('#ProfilePic').html("<img src='../../../Images/Loading.svg' class='LoadingImg'>Loading...");
        var formData=new FormData();
        formData.append('NewProfilePic',Obj.files[0]);
        var parent=Obj.parentElement;
        http.onreadystatechange=handleUploadRequest();
        http.open('POST','./profile.php',true);
        http.setRequestHeader("Cache-control",'nocache');
        http.send(formData);
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
          $("#alert #content").html("<div class='error'>You uploaded an unsupported image type. Only jpeg and png images are allowed.</div>");
          $("#alert").attr('class','shown');
          break;
        case "Too big":
          $("#alert #content").html("<div class='error'>Please select an image not greater than 10MB.");
          $("#alert").attr('class','shown');
          break;
      }
    }
    function handleUploadRequest(){
  if(http.readyState==4){
    if(http.status==200){
      $("#response").html(http.response);
      $("#EditProfilePic").attr('onclick','showProfilePicOptions()');
      $(Obj).remove();
      var inputFile=document.createElement("input");
      inputFile.type='file';
      inputFile.setAttribute('onchange','updateProfilePic(this)');
      inputFile.style='display:none';
      inputFile.id='NewProfilePic';
      $(parent).append(inputFile);
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
function adjustProfilePic(edited){
  $("#ProfilePicOptions").attr('class','hidden');
  switch(edited){
    case true:
      $("#ProfileHead #AdjustPic #Pic").css("overflow","hidden");
      $("#ProfileHead #AdjustPic input").attr('disabled',true);
      $("#ProfileHead #AdjustPic input").css('opacity','0.5');
      $("#ProfileHead #AdjustPic div").eq(1).html("<img src='../../../Images/Loading.svg' class='LoadingImg'>Editing...");
      var top=$("#ProfileHead #AdjustPic #Pic").scrollTop();
      var height=$("#ProfileHead #AdjustPic #Pic").height();
      top=(120/height)*top;
      http.open("POST","profile.php",true);
      http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      http.onreadystatechange=handleAdjustRequest();
      http.send(
        "AdjustProfilePic=true"+
        "&top="+top
      )
      break;
    case false: 
      $("#ProfileHead #AdjustPic").attr('class','');
      $("#ProfileHead #AdjustPic input").attr('disabled',true);
      $("#ProfileHead #AdjustPic input").css('opacity','0.5');
      $("#AdjustPic #Pic").html("<img src='../../../Images/Loading.svg' class='LoadingImg'><br>Loading...");
       $("#ProfileHead #AdjustPic div").eq(1).html("Shift the picture to adjust it's position.");
      var img=new Image();
      img.src=$("#ProfilePic img").attr('src');
      var center=document.createElement("center");
      setTimeout(function(){
        $("#AdjustPic #Pic").html(center);
        $("#AdjustPic #Pic center").html(img);
        if(img.height>240){
        $("#ProfileHead #AdjustPic #Pic").css('justify-content','flex-start');
        }
        $("#ProfileHead #AdjustPic input").attr('disabled',false);
        $("body").css('overflow','hidden');
        $("#ProfileHead #AdjustPic input").css('opacity','1');
      },2000);
      break;
    case null:
      $("#ProfileHead #AdjustPic #Pic").css('justify-content','center');
      $("#ProfileHead #AdjustPic").attr('class','hidden');
      $("body").css('overflow','scroll');

}
 function handleAdjustRequest(){
   if(http.readyState==4){
     if(http.status==200){
       $("#ProfileHead #AdjustPic #Pic").css('justify-content','center');
       $("#ProfileHead #AdjustPic #Pic").css('overflow','scroll');
       $("body").css('overflow','scroll');
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
function deleteProfilePic(){
  $("#ProfilePicOptions").attr('class','hidden');
  $("#ProfilePic").css('justify-content','center');
  $("#ProfilePic").html("<img src='../../../Images/Loading.svg' class='LoadingImg'>Deleting...");
  http.open("POST",'profile.php');
  http.setRequestHeader('Content-type','application/x-www-form-urlencoded');
  http.onreadystatechange=handleDeleteRequest();
  http.send(
  "DeleteProfilePic=true");
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
function editAboutBus(edited){
  switch(edited){
    case true:
      if($("#ProfilePage #BusDescription textarea").val()!=="" &&  $("#ProfilePage #BusDescription textarea").val().length<=1000){
        $("#ProfilePage #BusDescription>div:nth-child(1)>div:nth-child(2)").attr('onclick','');
        $("#ProfilePage #BusDescription>div:nth-child(2)").html("<div><img src='../../../Images/Loading.svg' class='LoadingImg'></div><div>Making changes...</div>");
        $("#ProfilePage #BusDescription>div:nth-child(2)").attr('class','');
      $("#ProfilePage #BusDescription>div:nth-child(3)").attr('class','hidden');
        var text=$("#ProfilePage #BusDescription textarea").val();
        text=text.replaceAll("&","%26");
        text=text.replaceAll("+","%2B");
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
                $("#ProfilePage #BusDescription>div:nth-child(1)>div:nth-child(2)").attr('onclick','editAboutBus(false)');
                http.abort();  
              },2000)
              $("#BusDescription>div:nth-child(3)>input:nth-child(4)").attr('class','locked')
              $("#BusDescription>div:nth-child(3)>input:nth-child(4)").attr('onclick','')

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
         }
      else{
        var text=$("#ProfilePage #BusDescription>div:nth-child(2)").html();
        text=text.replaceAll("<br>","\n");
        text=text.replaceAll("&lt;","<");
        text=text.replaceAll("&gt;",">");
        text=text.replaceAll("&amp;","&");
        $("#ProfilePage #BusDescription textarea").val(text);
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
}
function enableEditAboutBus(Obj){
  if(Obj.value==""){
    $("#BusDescription>div:nth-child(3)>input:nth-child(4)").attr('class','locked')
    $("#BusDescription>div:nth-child(3)>input:nth-child(4)").attr('onclick','')
  }
  else{
    $("#BusDescription>div:nth-child(3)>input:nth-child(4)").attr('class','')
    $("#BusDescription>div:nth-child(3)>input:nth-child(4)").attr('onclick','editAboutBus(true)');
  }
}