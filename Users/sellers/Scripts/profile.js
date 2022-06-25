var http = new XMLHttpRequest();
function showProfilePicOptions(Parent) {
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
    if(/jpeg|png|gif/.test(Obj.files[0].type)){
      if(Obj.files[0].size<52428800){
        switch(Parent.id){
          case "ProfileHead":
            $("#ProfileHead .EditProfilePic").attr('onclick','');
            $("#ProfileHead .ProfilePicOptions").addClass('hidden');
            $("#ProfileHead .ProfilePic").css('justify-content','center');
            $('#ProfileHead .ProfilePic').html("<img src='../../Images/Loading.svg' class='LoadingImg'>");
            var formData=new FormData();
            formData.append('NewProfilePic',Obj.files[0]);
            formData.append('Business',true);
            http.onreadystatechange=handleUploadRequest();
            http.open('POST','Scripts/profile.php',true);
            http.setRequestHeader("Cache-control",'nocache');
            http.send(formData);
            break;
          
          case "AboutOwner":
            $("#AboutOwner .EditProfilePic").attr('onclick','');
            $("#AboutOwner .ProfilePicOptions").addClass('hidden');
            $("#AboutOwner .ProfilePic").css('justify-content','center');
            $('#AboutOwner .ProfilePic').html("<img src='../../Images/Loading.svg' class='LoadingImg'>");
            var formData=new FormData();
            formData.append('NewProfilePic',Obj.files[0]);
            formData.append('Owner',true);
            http.onreadystatechange=handleUploadRequest();
            http.open('POST','Scripts/profile.php',true);
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
          failureAlert("You uploaded an unsupported image type. Only jpeg, png and gif images are allowed.");
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
          break;
       
        case "Too big":
          failureAlert("Please select an image not exceeding 5MB.");
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
function adjustProfilePic(edited,Parent,Obj){
  switch(Obj){
    case undefined:
      switch(Parent.id){
    case "ProfileHead":
      $("#ProfileHead .ProfilePicOptions").addClass('hidden');
      switch(edited){
    case true:
      $("#ProfileHead .AdjustPic .Pic").css("overflow","hidden");
      $("#ProfileHead .AdjustPic input").attr('disabled',true);
      $("#ProfileHead .AdjustPic input").css('opacity','0.5');
      $("#ProfileHead .AdjustPic div").eq(1).html("<img src='../../Images/Loading.svg' class='LoadingImg'>Editing...");
      var top=$("#ProfileHead .AdjustPic .Pic").scrollTop();
      var height=$("#ProfileHead .AdjustPic .Pic").height();
      top=(120/height)*top;
      http.open("POST","Scripts/profile.php",true);
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
          $("#ProfileHead .AdjustPic .Pic").html("<img src='../../Images/Loading.svg' class='LoadingImg'><br>");
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
          $("#AboutOwner .AdjustPic div").eq(1).html("<img src='../../Images/Loading.svg' class='LoadingImg'>Editing...");
          var top=$("#AboutOwner .AdjustPic .Pic").scrollTop();
          var height=$("#AboutOwner .AdjustPic .Pic").height();
          top=(60/height)*top;
          http.open("POST","Scripts/profile.php",true);
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
          $("#AboutOwner .AdjustPic .Pic").html("<img src='../../Images/Loading.svg' class='LoadingImg'><br>");
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
      break;

    default:
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
      $("#ProfileHead .ProfilePic").html("<img src='../../Images/Loading.svg' class='LoadingImg'>");
      http.open("POST",'Scripts/profile.php');
      http.setRequestHeader('Content-type','application/x-www-form-urlencoded');
      http.onreadystatechange=handleDeleteRequest();
      http.send(
      "DeleteProfilePic=true&Business=true");
      break; 
    
    case "AboutOwner":
      $("#AboutOwner .ProfilePicOptions").addClass('hidden');
      $("#AboutOwner .ProfilePic").css('justify-content','center');
      $("#AboutOwner .ProfilePic").html("<img src='../../Images/Loading.svg' class='LoadingImg'>");
      http.open("POST",'Scripts/profile.php');
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
      if($("#BusDescription textarea").val()!=="" &&  $("#BusDescription textarea").val().length<=1000){
        $("#BusDescription>div:nth-child(1)>div:nth-child(2)").attr('onclick','');
        $("#BusDescriptionText").html("<div><img src='../../Images/Loading.svg' class='LoadingImg'></div><div>Making changes...</div>");
        $("#BusDescriptionText").siblings(".SeeMore").addClass('hidden');
        $("#BusDescription>div:nth-child(2)").removeClass('hidden');
        $("#BusDescription>div:nth-child(3)").attr('class','hidden');
        var text=$("#BusDescription textarea").val();
        var count=text.length;
        var j;
        for(j=0; j<count; j++){
          text=text.replace("&","%26");
          text=text.replace("+","%2B");
        }
        http.open("POST",'Scripts/profile.php',true);
        http.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        http.onreadystatechange=handleEditRequest();
        http.send("EditAboutBus=true"+
                 "&text="+text);
        function handleEditRequest(){
          if(http.readyState==4){
            if(http.status==200){
               $("#BusDescriptionText").html("<div><img src='../../Images/Loading.svg' class='LoadingImg'></div><div>Almost done...</div>");
              setTimeout(function(){
                $("#response").html(http.response);
                $("#BusDescription>div:nth-child(1)>div:nth-child(2)").attr('onclick','editAbout(false,this.parentElement.parentElement)');
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
          if($("#BusDescriptionText").html()=="N/A"){
            $("#BusDescription textarea").val("");
            $("#BusDescription>div:nth-child(3) .WordCount").html("1000 characters left.");
          }
          else{
            var text=$("#BusDescriptionText").html();
            var count=text.length;
            var j;
            for(j=0; j<count; j++){
              text=text.replace("<br>","\n");
              text=text.replace("&lt;","<");
              text=text.replace("&gt;",">");
              text=text.replace("&amp;","&");
            }
            $("#BusDescription textarea").val(text);
            count=text.length;
            count=1000-count;
            $("#BusDescription>div:nth-child(3) .WordCount").html(count+" characters left.");
          }
          scrollIntoView("BusDescription");
          $("#BusDescription>div:nth-child(2)").addClass('hidden');
          $("#BusDescription>div:nth-child(3)").attr('class','');
          $("#BusDescription>div:nth-child(3)>textarea").focus();
          break;
      
        case null:
          setTimeout(function(){
            $("#BusDescription>div:nth-child(2)").removeClass('hidden');
          },500);
          $("#BusDescription>div:nth-child(3)").attr('class','hidden');
          scrollIntoView("BusDescription");
          break;
      }
      break; 
    case "AboutOwner":
      switch(edited){
        case true:
          if($("#AboutOwner textarea").val()!=="" &&  $("#AboutOwner textarea").val().length<=100){
        $("#AboutOwner>div:nth-child(6)>div:nth-child(2)").attr('onclick','');
        $("#AboutOwner>div:nth-child(7)").html("<div><img src='../../Images/Loading.svg' class='LoadingImg'></div><div>Making changes...</div>");
        $("#AboutOwner>div:nth-child(7)").attr('class','');
        $("#AboutOwner>div:nth-child(8)").attr('class','hidden');
        var text=$("#AboutOwner textarea").val();
        var count=text.length;
        var j;
        for(j=0;j<count;j++){
          text=text.replace("&","%26");
          text=text.replace("+","%2B");
        }
        http.open("POST",'Scripts/profile.php',true);
        http.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        http.onreadystatechange=handleEditRequest();
        http.send("EditAboutOwner=true"+
                 "&text="+text);
        function handleEditRequest(){
          if(http.readyState==4){
            if(http.status==200){
               $("#AboutOwner>div:nth-child(7)").html("<div><img src='../../Images/Loading.svg' class='LoadingImg'></div><div>Almost done...</div>");
              setTimeout(function(){
                $("#response").html(http.response);
                $("#AboutOwner>div:nth-child(6)>div:nth-child(2)").attr('onclick','editAbout(false,this.parentElement.parentElement)');
                http.abort();  
              },2000)
              $("#AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('class','locked')
              $("#AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('onclick','')

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
          if($("#AboutOwner>div:nth-child(7)").html()=="N/A"){
        $("#AboutOwner textarea").val("");
        $("#AboutOwner>div:nth-child(8) .WordCount").html("100 characters left.");
         }
          else{
        var text=$("#AboutOwner>div:nth-child(7)").html();
        var count=text.length;
        var j;
        for(j=0;j<count;j++){
        text=text.replace("<br>","\n");
        text=text.replace("&lt;","<");
        text=text.replace("&gt;",">");
        text=text.replace("&amp;","&");
        }
        $("#AboutOwner textarea").val(text);
        count=text.length;
        count=100-count
        $("#AboutOwner>div:nth-child(8) .WordCount").html(count+" characters left.");
      }
          $("#AboutOwner>div:nth-child(7)").attr('class','hidden');
          $("#AboutOwner>div:nth-child(8)").attr('class','');
          $("#AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('class','locked');
          $("#AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('onclick','');
          $("#AboutOwner>div:nth-child(8)>textarea").focus();
          setTimeout(function(){
            scrollIntoView("AboutOwner",false);
          },500)
          break;

        case null:
          setTimeout(function(){$("#AboutOwner>div:nth-child(7)").attr('class','');},500);
          $("#AboutOwner>div:nth-child(8)").attr('class','hidden');
          break;
      }
      break;
  }
}
function enableEditAbout(Obj,Parent){
  switch(Parent.id){
    case "BusDescription":
      var count=Obj.value.length;
      count=1000-count;
      $("#BusDescription>div:nth-child(3) .WordCount").html(count+" characters left.");
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
      count=100-count;
      $("#AboutOwner>div:nth-child(8) .WordCount").html(count+" characters left.");
      if(Obj.value==""){
        $("#AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('class','locked')
        $("#AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('onclick','')
      }
      else{
        $("#AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('class','')
        $("#AboutOwner>div:nth-child(8)>input:nth-child(4)").attr('onclick','editAbout(true,this.parentElement.parentElement)');
      }
      break;
  }
}
function seeMore(Obj){
  switch(Obj.parentElement.id){
    case "BusDescriptionWrapper":
      var height=$("#BusDescriptionText").height()+17;
      $(Obj).parent().css('maxHeight',height);
      $(Obj).addClass('hidden');
      setTimeout(function(){
        scrollIntoView("BusDescription");
      },300)
      break;
  }
}
function unSeeMore(Obj){
  if($(Obj).parent().css('maxHeight')!=='154px'){
    $(Obj).parent().css('maxHeight','');
    setTimeout(function(){
      scrollIntoView("BusDescription");
      $(Obj).siblings('.SeeMore').removeClass('hidden');
    },300)
  }
}
function showProducts_ServicesOptions(){
  setTimeout(function(){
    scrollIntoView("Products_Services")
  },500)
  $("#Products_Services>div:nth-child(3),#Products_Services>div:nth-child(4)").addClass('hidden');
  $("#Products_ServicesOptions").removeClass('hidden');
}
function closeProducts_ServicesOptions(){
  $("#Products_Services>#Products_ServicesOptions").addClass('hidden');
  $("#Products_Services>div:nth-child(3),#Products_Services>div:nth-child(4)").removeClass('hidden');
}
function showAddProduct(){
  $("#Products_Services>#Products_ServicesOptions").addClass('hidden');
  $("#Products_Services>div:nth-child(1)>.AddBtn").removeAttr('onclick');
  $("#AddProduct").removeClass('hidden');
  setTimeout(function(){
    scrollIntoView('AddProduct');
  },500)
}
function closeAddProduct(){
  $("#AddProduct").addClass("hidden");  
  $("#Products_Services>div:nth-child(1)>.AddBtn").attr('onclick','showProducts_ServicesOptions()');
  $("#Products_Services>div:nth-child(3),#Products_Services>div:nth-child(4)").removeClass('hidden');
  $("#AddProductPic label").html("Add product image<div class='AddBtn'><img src='../../Images/Add.svg'>")
  $("#AddProductPic label").eq(0).html("Add product cover image<div class='AddBtn'><img src='../../Images/Add.svg'>");
  $("#AddProductPic label").removeClass('loaded');
  $("#AddProductPic label .close").map(function(item,Obj){
    closeProductPicMenu(Obj);
  })
  $("#AddProductPic .AddProductPicMenu").map(function(item,Obj){
    removeProductPic(Obj);
  })
  $("#AddProduct input[type='text'], #AddProduct input[type='tel'], #AddProduct select, #AddProduct textarea").val("");
  $("#AddProductPrice div:not(div:nth-child(2),.error)").map(function(item,Obj){
    $(Obj).addClass('hidden');
  })
  $("#AddProductVariation>div:nth-child(2)").html("None");
  $("#AddProductLocations input[type='checkbox']:checked").map(function(item,Obj){
    $(Obj).removeAttr('onchange');
    $(Obj).click();
    $(Obj).attr('onchange','addProductLocation(this)');
  })
  $("label[for='AddProductLocationSelector']>div").remove();
  $("#AddProductLocations>div").addClass('hidden');
  closeProductVariationAdder();
  addProductName(document.getElementById('AddProductName'))
  addProductDescription(document.getElementById('AddProductDescription'))
  $("#AddProduct .error").html("");
  $("#AddProduct .Invalid").removeClass('Invalid');
  CloseAlert();
  scrollIntoView("Products_Services");
  }
function addProductPic(Obj){
  if(/jpeg|png|gif/.test(Obj.files[0].type)==true){
    if(Obj.files[0].size<52428800){
      var j=Obj.id.substr(-1,1);
      $("#AddProduct>#AddProductPic label").eq(j-1).html("<img src='../../Images/Loading.svg' class='LoadingImg'>");
      var img=document.createElement('img');
      var Reader=new FileReader();
      Reader.onload=function(event){
        event.preventDefault();
        img.src=event.target.result;
        Reader.onloadend=function(){
          var label=$("#AddProduct>#AddProductPic label").eq(j-1);
          $("#AddProduct>#AddProductPic label").eq(j-1).attr('for','');
          $("#AddProduct>#AddProductPic label").eq(j-1).html(img);
          checkProductCoverPic();
          CloseAlert();
          $("#AddProduct>#AddProductPic label").eq(j-1).append("<img src='../../Images/Drop Menu.svg' class='DropMenu' onclick='showProductPicMenu(this)'>");
          if(img.height>img.width){
          $("#AddProduct>#AddProductPic label").eq(j-1).addClass('loadedHeight');
          }
          else{
            $("#AddProduct>#AddProductPic label").eq(j-1).addClass('loadedWidth');
          }
          }
      }
      Reader.readAsDataURL(Obj.files[0]);
    }
    else{
      failureAlert("Please select an image not exceeding 5MB.");
      var input=document.createElement("input");
      input.type='file';
      input.setAttribute('onchange','addProductPic(this)');
      input.id=Obj.id;
      $(Obj).remove();
      $("#AddProduct>#AddProductPic").append(input);
    }
  }
  else{
    CloseAlert();
    setTimeout(function(){
      failureAlert("You uploaded an unsupported image type. Only jpeg, png and gif images are allowed.");
    },200)
    var input=document.createElement("input");
    input.type='file';
    input.setAttribute('onchange','addProductPic(this)');
    input.id=Obj.id;
    $(Obj).remove();
    $("#AddProduct>#AddProductPic").append(input);
  }
}
function removeProductPic(Obj){
  if($(Obj).siblings().eq(0).attr('position')=='1'){
    $(Obj).siblings().eq(0).html("Add product cover image<div class='AddBtn'><img src='../../Images/Add.svg'>");
  }
  else{
    $(Obj).siblings().eq(0).html("Add product image<div class='AddBtn'><img src='../../Images/Add.svg'>");
  }
  $(Obj).addClass('hidden');  
  $(Obj).siblings().eq(0).attr('class','');
  setTimeout(function(){  
    var position=$(Obj).siblings().eq(0).attr('position');
    var input=document.createElement("input");
    input.type='file';
    input.setAttribute('onchange','addProductPic(this)');
    input.id="AddProductPic"+position;
    $("#AddProductPic>input[type='file']#AddProductPic"+position).remove();
    $("#AddProductPic").append(input);
    $(Obj).siblings().eq(0).attr('for',"AddProductPic"+position);
  },1000);
}
function editProductPic(Obj,edited){
  switch(edited){
    case false:
      $(Obj).addClass('hidden');
      $(Obj).siblings(".AddProductPicOptions").removeClass('hidden');
      $("#AddProductPic").siblings(".Tip").removeClass('hidden');
      $(Obj).siblings("label").children(".close").attr('src','../../Images/Drop Menu.svg');
      $(Obj).siblings("label").children(".close").attr('class','hidden DropMenu');
      $("#AddProductPic label").attr('for','');
      $("#AddProductPic label .DropMenu").attr('onclick','');
      $(Obj).siblings("label").css('overflow-y','scroll');
      $("body").css('overflow','hidden');
      $("#AddProduct>.close").eq(0).attr('onclick','');
      $(Obj).siblings('label').children("img").eq(0).css('bottom','');
      scrollIntoView("AddProductPic");
      break;
      
    case null:
      $(Obj).addClass('hidden');
      $("#AddProductPic").siblings(".Tip").addClass('hidden');
      $(Obj).siblings("label").children(".DropMenu").removeClass('hidden');
      $(Obj).siblings("label").css('overflow-y','hidden');
      $(Obj).siblings("label").scrollTop(0);
      $("#AddProductPic label:not(label[class*='loaded'])").map(function(item,Obj){
        $(Obj).attr('for',"AddProductPic"+$(Obj).attr('position'));
      })
      $("#AddProductPic label .DropMenu").attr('onclick','showProductPicMenu(this)');
      $("body").css('overflow','scroll');
      $("#AddProduct>.close").eq(0).attr('onclick','closeAddProduct()');
      $("#AddProductPic").siblings(".Tip").addClass('hidden');
      break;
      
    case true:
      $(Obj).addClass('hidden');
      var scroll=$(Obj).siblings('label').scrollTop();
      $(Obj).siblings('label').children("img").eq(0).css('bottom',scroll);
       $(Obj).siblings('label').scrollTop(0);
      $(Obj).siblings("label").children(".DropMenu").removeClass('hidden');
      $(Obj).siblings("label").css('overflow-y','hidden');
      $("#AddProductPic label:not(label[class*='loaded'])").map(function(item,Obj){
        $(Obj).attr('for',"AddProductPic"+$(Obj).attr('position'));
      })
      $("#AddProductPic label .DropMenu").attr('onclick','showProductPicMenu(this)');
      $("body").css('overflow','scroll');
      $("#AddProduct>.close").eq(0).attr('onclick','closeAddProduct()');
      $("#AddProductPic").siblings(".Tip").addClass('hidden');
      break;
  }
}
function showProductPicMenu(Obj){
  $("#AddProductPic>div>.AddProductPicMenu").addClass('hidden');
  $("#AddProductPic label>.close").attr('src','../../Images/Drop Menu.svg');
  $("#AddProductPic label>.close").attr('onclick','showProductPicMenu(this)');
  $("#AddProductPic label>.close").attr('class','DropMenu');
  $(Obj).attr('src','../../Images/Close.svg');
  $(Obj).attr('class','close');
  $(Obj).attr('onclick','closeProductPicMenu(this)');
  $(Obj).parent().siblings().eq(1).removeClass('hidden');
  scrollIntoView("AddProductPic");
}
function closeProductPicMenu(Obj){
  $(Obj).attr('src','../../Images/Drop Menu.svg');
  $(Obj).attr('class','DropMenu');
  $(Obj).attr('onclick','showProductPicMenu(this)');
  $(Obj).parent().siblings().eq(1).addClass('hidden');
}
function addProductName(Obj){
  var count=Obj.value.length;
  count=70-count
  $(Obj).siblings('.WordCount').eq(0).html(count+" characters left");
  checkProductName(Obj);
}
function addProductDescription(Obj){
  var count=Obj.value.length;
  count=1000-count
  $(Obj).siblings('.WordCount').eq(1).html(count+" characters left");
  checkProductDescription(Obj);
}
function showProductPriceOptions(Type){
  $("#AddProductPrice input").val("");
  switch(Type){
    case "Fixed price":
      $("#AddProductPrice>div:not(.error)").eq(1).removeClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(2).addClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(3).addClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(4).addClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(5).addClass('hidden');
      break;
      
    case "Range price":
      $("#AddProductPrice>div:not(.error)").eq(1).addClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(2).removeClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(3).removeClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(4).addClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(5).addClass('hidden');
      break;
    
    case "Discounted price":
      $("#AddProductPrice>div:not(.error)").eq(1).addClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(2).addClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(3).addClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(4).removeClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(5).removeClass('hidden');
      break;
    
   default:
      $("#AddProductPrice>div:not(.error)").eq(1).addClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(2).addClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(3).addClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(4).addClass('hidden');
      $("#AddProductPrice>div:not(.error)").eq(5).addClass('hidden');
      break;  
  }
    checkProductPriceType($("#AddProductPriceType"));
}
function showProductVariationAdder(){
  $("#AddProductVariation>div:nth-child(2)").addClass('hidden');
  $("#ProductVariationAdder").removeClass('hidden');
  setTimeout(function(){
    scrollIntoView("AddProductVariation");
  },1)
}
function closeProductVariationAdder(){
  $("#ProductVariationAdder .error").html("");
  $("#ProductVariationAdder .Invalid").removeClass("Invalid");
  $("#AddProductVariation>div:nth-child(2)").removeClass('hidden');
  $("#ProductVariationAdder").addClass('hidden');
  $("#ProductVariationAdder input[type='text']").val("");
  scrollIntoView("AddProductVariation");
}
function addProductVariation(){
  CloseAlert();
  var Name=$("#ProductVariationName").val();
  var Variations=$("#ProductVariation").val();
  if(Name==""){
    $("#ProductVariationName").addClass('Invalid');
    $("#AddProduct .error").eq(9).html("Please enter a variation name.");
    return false;
  }
  else if(/[a-zA-Z0-9]/.test(Variations)==false){
    $("#ProductVariationName").removeClass('Invalid');
    $("#ProductVariation").addClass('Invalid');
    $("#AddProduct .error").eq(9).html("");
    $("#AddProduct .error").eq(10).html("Please enter a variation.");
    return false;
  }
  else{
    $("#ProductVariationName").removeClass('Invalid');
    $("#ProductVariation").removeClass('Invalid');
    $("#AddProduct .error").eq(9).html("");
    $("#AddProduct .error").eq(10).html("");
    Variations=Variations.split(", ");
    if(Variations.length>max){
      Variations.splice(max);
      setTimeout(function(){
        infoAlert("You can only add up to " + max +" variations for your current hosting plan. Upgrade your hosting plan to unlock more slots.")
      },200)
    }
    if($("#AddProductVariation>div:nth-child(2)").children().length==3){
      setTimeout(function(){
        infoAlert("You can only add up to " + max +" variations for your current hosting plan. Upgrade your hosting plan to unlock more slots.")
      },200)
      return false;
    }
    var div=document.createElement('div');
    div.appendChild(document.createElement('div'));
    div.lastElementChild.appendChild(document.createElement('div'));
    div.lastElementChild.getElementsByTagName('div').item(0).innerHTML='Remove';
    div.lastElementChild.getElementsByTagName('div').item(0).setAttribute('onclick','removeProductVariation(this.parentElement.parentElement)');
    div.appendChild(document.createElement('div'));
    div.lastElementChild.innerHTML=Name;
    div.appendChild(document.createElement('div'));
    var j;
    for(j=0; j<Variations.length; j++){
      div.lastElementChild.appendChild(document.createElement('div'));
      div.lastElementChild.lastElementChild.append(Variations[j]);
    }
    if($("#AddProductVariation>div:nth-child(2)").html()=='None'){
      $("#AddProductVariation>div:nth-child(2)").html(div);
    }
    else{
    $("#AddProductVariation>div:nth-child(2)").append(div);
    } 
    closeProductVariationAdder();
    return true;
  }
}
function removeProductVariation(Obj){
  var parent=$(Obj.parentElement)
  $(Obj).remove();
  if($(parent).html()==""){
    $(parent).html("None");
  }
  CloseAlert();
}
function addProductLocation(Obj){
  CloseAlert();
  var count=0;
  scrollIntoView("AddProductAvailability");
  if(Obj.value==''){
    $("#AddProductLocations>div").addClass('hidden')
  }
  else{
    $("#AddProductLocations>div").addClass('hidden');
    $("#AddProductLocations input[type='checkbox']:not(:checked)").parent().removeClass('hidden');
    switch($(Obj).attr('type')){
    case "text":
      $("#AddProductLocations input[type='checkbox']:not(:checked)").map(function(item,input){
        if(input.value.search(Obj.value)!=-1){
          $(input).parent().removeClass('hidden');
          count++
        }
        else{
          $(input).parent().addClass('hidden');
        }
      })
        if(count==0){
          $("#AddProductLocations>div:last-child").html("No results found!");
          $("#AddProductLocations>div:last-child").removeClass('hidden');
        }
      break;
        
      case "checkbox":
        count=0;
        var div=document.createElement('div');
        div.innerHTML=Obj.value+"<img src='../../Images/Close.svg' class='close' onclick='removeProductLocation(this)'>";
        if($("#AddProductLocationSelector").siblings("div").length==3){
          setTimeout(function(){
            infoAlert("You can only add up to " + max +" locations for your current hosting plan. Upgrade your hosting plan to unlock more slots.")
          },200)
          $(Obj).removeAttr('onchange');
          $(Obj).click();
          $(Obj).attr('onchange','addProductLocation(this)');
          $(Obj).parent().removeClass('hidden');
          if($("#AddProductLocationSelector").val()!=""){
            $("#AddProductLocations input[type='checkbox']:not(:checked)").map(function(item,input){
            if(input.value.search($("#AddProductLocationSelector").val())!=-1){
              $(input).parent().removeClass('hidden');
              count++
            }
            else{
              $(input).parent().addClass('hidden');
            }
          })
            if(count==0){
              $("#AddProductLocations>div:last-child").html("No results found!");
              $("#AddProductLocations>div:last-child").removeClass('hidden');
            }
          }
        }
        else{
        CloseAlert();
        $("#AddProductLocationSelector").before(div);
        if($("#AddProductLocationSelector").val()!=""){
        $("#AddProductLocations input[type='checkbox']:not(:checked)").map(function(item,input){
        if(input.value.search($("#AddProductLocationSelector").val())!=-1){
          $(input).parent().removeClass('hidden');
          count++
        }
        else{
          $(input).parent().addClass('hidden');
        }
      })
        if(count==0){
          $("#AddProductLocations>div:last-child").html("No results found!");
          $("#AddProductLocations>div:last-child").removeClass('hidden');
        }
        }
        }
        break;
    }
  }
  $("#AddProductLocationSelector").focus();
  checkProductAvailability(null,$("label[for='AddProductLocationSelector']"));
}
function removeProductLocation(Obj){
  var text=$(Obj).parent().text();
  $(Obj).parent().remove();
  var input=$("#AddProductLocations input[type='checkbox']").filter("input[value='"+text+"']").eq(0);
  input.parent().removeClass('hidden');
  input.removeAttr('onchange')
  $(input).click();
  input.attr('onchange','addProductLocation(this)');
  $("#AddProductLocations>div:last-child").addClass('hidden');
  CloseAlert();
  checkProductAvailability(null,$("label[for='AddProductLocationSelector']"));
}
function digitsOnly(Obj){
  var count=$(Obj).val().length;
  var j;
  var text;
  text=$(Obj).val();
  for(j=0; j<count; j++){
  text=text.replace(/[^0-9\.]/,"");
  }
  $(Obj).val(text);
}
function addProduct(){
  var ErrorCount=0;
//  if(checkProductCoverPic()==false) ErrorCount++
//  if(checkProductName($("#AddProductName"))==false) ErrorCount++
//  if(checkProductDescription($("#AddProductDescription"))==false) ErrorCount++
//  if(checkProductPriceType($("#AddProductPriceType"))==false) ErrorCount++;
//  if(checkProductAvailability($("#AddProductStockAvailable"),$("#AddProductAvailability label").eq(0))==false) ErrorCount++;
  addProductVariation();
  closeProductVariationAdder();
  if(ErrorCount==0){
    CloseAlert();
    $("#AddProduct").addClass('hidden');
    $("#Products_Services>div:nth-child(2)").removeClass('hidden');
    scrollIntoView("Products_Services");
    var Form=new FormData();
    $("#AddProductPic label[class*='loaded']").map(function(item,Obj){
      var id="AddProductPic"+$(Obj).attr('position');
      var Pic='Pic'+$(Obj).attr('position');
      var Top='Top'+$(Obj).attr('position');
      Form.append(Pic,document.getElementById(id).files[0]);
      Form.append(Top,$(Obj).find("img").eq(0).css('bottom'));
    });
    Form.append('Name',$("#AddProductName").val());
    Form.append('Description',$("#AddProductDescription").val());
    Form.append('PriceType',$("#AddProductPriceType").val());
    var Price=[];
    switch($("#AddProductPriceType").val()){
      case "Fixed price":
        Form.append('Price',$("#AddProductFixedPrice").val());
        break;
        
      case "Range price":
        Price.push($("#AddProductMinPrice").val());
        Price.push($("#AddProductMaxPrice").val());
        console.log(Price);
        Form.append('Price',Price);
        console.log(Form.get('Price'));
        break;
        
      case "Discounted price":
        Price.push($("#AddProductOriginalPrice").val());
        Price.push($("#AddProductDiscountedPrice").val());
        Form.append('Price',Price);
        break;
    }
    if($("#AddProductVariation>div:nth-child(2)>div").length!=0){
      var VariationName=[];
      $("#AddProductVariation>div:nth-child(2)>div").map(function(item,Variation){
        var Variations=[];
        var name=$(Variation).children().eq(1).html();
        VariationName.push(name);
        $(Variation).find("div:last-child>div").map(function(item,Obj){
          Variations.push($(Obj).text());
        })
        Form.append(name,Variations);
      })
      Form.append('VariationName',VariationName);
    }
    Form.append('Stock',$("#AddProductStockAvailable").val());
    var Locations=[];
    $("label[for='AddProductLocationSelector']>div").map(function(item,Obj){
      Locations.push($(Obj).text());
    });
      Form.append("Locations",Locations);
    Form.append('NewProduct',true);
    http.onreadystatechange=handleRequest();
    http.open('POST','Scripts/profile.php',true);
    http.send(Form);
    function handleRequest(){
      if(http.readyState==4){
        if(http.status==200){
          $("#response").html(http.response);
          http.abort();
        }
        else{
          setTimeout(handleRequest,2000)
        }
      }
      else{
        setTimeout(handleRequest,2000)
      }
    }
  }
  else{
    CloseAlert();
    setTimeout(function(){
      failureAlert("Please fix the errors with the form.");
      scrollIntoView("AddProduct");
    },200)
  }
}
function checkProductCoverPic(){
  if($("#AddProductPic label").eq(0).has(".AddBtn").length!=0){
    $("#AddProductPic label").eq(0).addClass('Invalid');
    $("#AddProduct .error").eq(0).html("Please add a cover photo for your product.");
    return false;
  }
  else{
    $("#AddProduct .error").eq(0).html("");
    $("#AddProductPic label").eq(0).removeClass('Invalid');
    return true;
  }
}
function checkProductName(Obj){
  if(/[a-zA-Z0-9]/.test($(Obj).val())==false){
    $(Obj).addClass("Invalid");
    $("#AddProduct .error").eq(1).html("Please enter the name of your product.");
    return false;
  }
  else{
    $(Obj).removeClass("Invalid");
    $("#AddProduct .error").eq(1).html("");
    return true;
  }
}
function checkProductDescription(Obj){
  if(/[a-zA-Z0-9]/.test($(Obj).val())==false){
    $(Obj).addClass('Invalid');
    $("#AddProduct .error").eq(2).html("Please enter a product description.");
    return false;
  }
  else{
    $(Obj).removeClass('Invalid');
    $("#AddProduct .error").eq(2).html("");
    return true;
  }
}
function checkProductPriceType(Obj){
  $("#AddProductPrice .error").html("");
  if($(Obj).val()==""){
    $(Obj).parent().addClass("Invalid");
    $("#AddProduct .error").eq(3).html("Please select a price type.");
    return false;
  }
  else{
    $(Obj).parent().removeClass("Invalid");
    $("#AddProduct .error").eq(3).html("");
    switch($(Obj).val()){
      case "Fixed price":
        if(checkProductFixedPrice($("#AddProductFixedPrice"))==false) return false;
        break;
      case "Range price":
        if(checkProductRangePrice($("#AddProductMinPrice"),$("#AddProductMaxPrice"))==false) return false;
        break;

      case "Discounted price":
        if(checkProductDiscountedPrice($("#AddProductOriginalPrice"),$("#AddProductDiscountedPrice"))==false) return false;
        break;
    }
  }
}
function checkProductFixedPrice(Obj){
  digitsOnly(Obj);
  if($(Obj).val()==""){
    $(Obj).parent().addClass("Invalid");
    $("#AddProduct .error").eq(4).html("Please enter a price.");
    return false
  }
  else if($(Obj).val()<500){
    $(Obj).parent().addClass("Invalid");
    $("#AddProduct .error").eq(4).html("Price must be NGN500 or above.");
    return false;
  }
  else{
    $(Obj).parent().removeClass("Invalid");
    $("#AddProduct .error").eq(4).html("");
    return true;
  }
}
function checkProductRangePrice(min,max){
  var ErrorCount=0
  if(min){
    digitsOnly(min);
    if($(min).val()==""){
      $(min).parent().addClass("Invalid");
      $("#AddProduct .error").eq(5).html("Please enter a minimum price.");
      ErrorCount++
    }
    else if($(min).val()<500){
      $(min).parent().addClass("Invalid");
      $("#AddProduct .error").eq(5).html("Price must be NGN500 or above.");
      ErrorCount++;
    }
    else{
      $(min).parent().removeClass("Invalid");
      $("#AddProduct .error").eq(5).html("");
    }
  }
  if(max){
    digitsOnly(max);
     if($(max).val()==""){
       $(max).parent().addClass("Invalid");
      $("#AddProduct .error").eq(6).html("Please enter a maximum price.");
      ErrorCount++;
     }
    else if($(max).val()<500){
      $(max).parent().addClass("Invalid");
      $("#AddProduct .error").eq(6).html("Price must be NGN500 or above.");
      ErrorCount++;
    }
    else{
      $(max).parent().removeClass("Invalid");
      $("#AddProduct .error").eq(6).html("");
    }
  }
  if(min && max){
    if((min.val()-max.val())>=0){
      $(min).parent().addClass("Invalid");
      $("#AddProduct .error").eq(5).html("Minimum price must be lesser than maximum price");
      ErrorCount++
    }
  }
  if(ErrorCount==0){
    return true;
  }
  else{
    return false;
  }
}
function checkProductDiscountedPrice(Original,Discount){
  var ErrorCount=0
  if(Original){
    digitsOnly(Original);
    if($(Original).val()==""){
      $(Original).parent().addClass("Invalid");
      $("#AddProduct .error").eq(7).html("Please enter the original price.");
      ErrorCount++
    }
    else if($(Original).val()<500){
      $(Original).parent().addClass("Invalid");
      $("#AddProduct .error").eq(7).html("Price must be NGN500 or above.");
      ErrorCount++;
    }
    else{
      $(Original).parent().removeClass("Invalid");
      $("#AddProduct .error").eq(7).html("");
    }
  }
  if(Discount){
    digitsOnly(Discount);
     if($(Discount).val()==""){
       $(Discount).parent().addClass("Invalid");
      $("#AddProduct .error").eq(8).html("Please enter the discounted price.");
      ErrorCount++;
     }
    else if($(Discount).val()<500){
      $(Discount).parent().addClass("Invalid");
      $("#AddProduct .error").eq(8).html("Price must be NGN500 or above.");
      ErrorCount++;
    }
    else{
      $(Discount).parent().removeClass("Invalid");
      $("#AddProduct .error").eq(8).html("");
    }
  }
  if(Original && Discount){
    if((Discount.val()-Original.val())>=0){
      $(Discount).parent().addClass("Invalid");
      $("#AddProduct .error").eq(8).html("Discounted price must be lesser than the Original price.");
      ErrorCount++
    }
  }
  if(ErrorCount==0){
    return true;
  }
  else{
    return false;
  }
}
function checkProductAvailability(Stock,Location){
  var ErrorCount=0;
  if(Stock){
    digitsOnly(Stock);
    if($(Stock).val()==""){
      $(Stock).addClass('Invalid');
      $("#AddProduct .error").eq(11).html("Please enter a value.");
      ErrorCount++;
    }
    else{
      $(Stock).removeClass('Invalid');
      $("#AddProduct .error").eq(11).html("");
    }
  }
  if(Location){
    if($(Location).children().length==1){
      $(Location).addClass('Invalid');
      $("#AddProduct .error").eq(12).html("Please select a location");
      ErrorCount++
    }
    else{
      $(Location).removeClass('Invalid');
      $("#AddProduct .error").eq(12).html("");
    } 
  }
  if(ErrorCount>0){
    return false;
  }
}