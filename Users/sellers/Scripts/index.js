var LastIcon;
var ProfileScroll=0;
var OrderScroll=0;
var RevenueScroll=0;
var MessageScroll=0;
var NotificationScroll=0;
var MenuScroll=0;
var http = new XMLHttpRequest();
function ChangePage(Icon){
  LastIcon=Icon;
  var width;
  switch($(Icon).parents().attr('id')){
    case "Footer":
      switch(Icon.id){
        case "Profile":
          $(Icon).attr('class','selected');
          $("#ProfilePage").removeClass('hidden');
          $("#MainContent>div:not(#ProfilePage)").addClass('hidden');
          $("#MainContent").scrollLeft(0);
          document.body.scrollTop=ProfileScroll;
          $("#Footer>div:not(#Profile)").attr('class','unselected');
          $("#BannerTabs>div:not(#Profile)").attr('class','unselected');
          $("#BannerTabs>div#Profile").attr('class','selected');
          $("#PageName h1").html("Profile");
          break;

        case "Orders":
          $(Icon).attr('class','selected');
          $("#OrdersPage").removeClass('hidden');
          $("#MainContent>div:not(#OrdersPage)").addClass('hidden');
          width=document.body.clientWidth;
          $("#MainContent").scrollLeft(width);
          setTimeout(function(){
            width=document.body.clientWidth;
            $("#MainContent").scrollLeft(width);
          },1)
          document.body.scrollTop=OrderScroll;
          $("#Footer>div:not(#Orders)").attr('class','unselected');
          $("#BannerTabs>div:not(#Orders)").attr('class','unselected');
          $("#BannerTabs>div#Orders").attr('class','selected');
          $("#PageName h1").html("Orders");
          break;
     
        case "Revenue":
          $(Icon).attr('class','selected');
          $("#RevenuePage").removeClass('hidden');
          $("#MainContent>div:not(#RevenuePage)").addClass('hidden');
          width=document.body.clientWidth;
          $("#MainContent").scrollLeft(width*2);
          setTimeout(function(){
            width=document.body.clientWidth;
            $("#MainContent").scrollLeft(width*2);
          },1)
          document.body.scrollTop=RevenueScroll;
          $("#Footer>div:not(#Revenue)").attr('class','unselected');
          $("#BannerTabs>div:not(#Revenue)").attr('class','unselected');
          $("#BannerTabs>div#Revenue").attr('class','selected');
          $("#PageName h1").html("Revenue");
          break;

        case "Messages":
          $(Icon).attr('class','selected');
          $("#MessagesPage").removeClass('hidden');
          $("#MainContent>div:not(#MessagesPage)").addClass('hidden');
          width=document.body.clientWidth;
          $("#MainContent").scrollLeft(width*3);
          setTimeout(function(){
            width=document.body.clientWidth;
            $("#MainContent").scrollLeft(width*3);
          },1)
          document.body.scrollTop=MessageScroll;
          $("#Footer>div:not(#Messages)").attr('class','unselected');
          $("#BannerTabs>div:not(#Messages)").attr('class','unselected');
          $("#BannerTabs>div#Messages").attr('class','selected');
          $("#PageName h1").html("Messages");
          break;

        case "Notifications":
          $(Icon).attr('class','selected');
          $("#NotificationsPage").removeClass('hidden');
          $("#MainContent>div:not(#NotificationsPage)").addClass('hidden');
          width=document.body.clientWidth;
          $("#MainContent").scrollLeft(width*4);
          setTimeout(function(){
            width=document.body.clientWidth;
            $("#MainContent").scrollLeft(width*4);
          },1)
          document.body.scrollTop=NotificationScroll;
          $("#Footer>div:not(#Notifications)").attr('class','unselected');
          $("#BannerTabs>div:not(#Notifications)").attr('class','unselected');
          $("#BannerTabs>div#Notifications").attr('class','selected');
          $("#PageName h1").html("Notifications");
          break;

        case "Menu":
          $(Icon).attr('class','selected');
          $("#MenuPage").removeClass('hidden');
          $("#MainContent>div:not(#MenuPage)").addClass('hidden');
          width=document.body.clientWidth;
          $("#MainContent").scrollLeft(width*5);
          setTimeout(function(){
            width=document.body.clientWidth;
            $("#MainContent").scrollLeft(width*5);
          },1)
          document.body.scrollTop=NotificationScroll;
          $("#Footer>div:not(#Menu)").attr('class','unselected');
          $("#BannerTabs>div:not(#Menu)").attr('class','unselected');
          $("#BannerTabs>div#Menu").attr('class','selected');
          $("#PageName h1").html("Menu");    
          break;
     
 };
      break;
    case "BannerTabs":
       switch(Icon.id){
        case "Profile":
          $(Icon).attr('class','selected');
          $("#ProfilePage").removeClass('hidden');
          $("#MainContent>div:not(#ProfilePage)").addClass('hidden');
          $("#MainContent").scrollLeft(0);
          document.body.scrollTop=ProfileScroll;
          $("#BannerTabs>div:not(#Profile)").attr('class','unselected');
          $("#Footer>div:not(#Profile)").attr('class','unselected');
          $("#Footer>div#Profile").attr('class','selected');
          $("#PageName h1").html("Profile");
          break;

        case "Orders":
          $(Icon).attr('class','selected');
          $("#OrdersPage").removeClass('hidden');
          $("#MainContent>div:not(#OrdersPage)").addClass('hidden');
          width=document.body.clientWidth;
          $("#MainContent").scrollLeft(width);
          setTimeout(function(){
            width=document.body.clientWidth;
            $("#MainContent").scrollLeft(width);
          },1)
          document.body.scrollTop=OrderScroll;
          $("#BannerTabs>div:not(#Orders)").attr('class','unselected');
          $("#Footer>div:not(#Orders)").attr('class','unselected');
          $("#Footer>div#Orders").attr('class','selected');
          $("#PageName h1").html("Orders");
          break;
     
        case "Revenue":
          $(Icon).attr('class','selected');
          $("#RevenuePage").removeClass('hidden');
          $("#MainContent>div:not(#RevenuePage)").addClass('hidden');
          width=document.body.clientWidth;
          $("#MainContent").scrollLeft(width*2);
          setTimeout(function(){
            width=document.body.clientWidth;
            $("#MainContent").scrollLeft(width*2);
          },1)
          document.body.scrollTop=RevenueScroll;
          $("#BannerTabs>div:not(#Revenue)").attr('class','unselected');
          $("#Footer>div:not(#Revenue)").attr('class','unselected');
          $("#Footer>div#Revenue").attr('class','selected');
          $("#PageName h1").html("Revenue");
          break;

        case "Messages":
          $(Icon).attr('class','selected');
          $("#MessagesPage").removeClass('hidden');
          $("#MainContent>div:not(#MessagesPage)").addClass('hidden');
          width=document.body.clientWidth;
          $("#MainContent").scrollLeft(width*3);
          setTimeout(function(){
            width=document.body.clientWidth;
            $("#MainContent").scrollLeft(width*3);
          },1)
          document.body.scrollTop=MessageScroll;
          $("#BannerTabs>div:not(#Messages)").attr('class','unselected');
          $("#Footer>div:not(#Messages)").attr('class','unselected');
          $("#Footer>div#Messages").attr('class','selected');
          $("#PageName h1").html("Messages");
          break;

        case "Notifications":
          $(Icon).attr('class','selected');
          $("#NotificationsPage").removeClass('hidden');
          $("#MainContent>div:not(#NotificationsPage)").addClass('hidden');
          width=document.body.clientWidth;
          $("#MainContent").scrollLeft(width*4);
          setTimeout(function(){
            width=document.body.clientWidth;
            $("#MainContent").scrollLeft(width*4);
          },1)
          document.body.scrollTop=NotificationScroll;
          $("#BannerTabs>div:not(#Notifications)").attr('class','unselected');
          $("#Footer>div:not(#Notifications)").attr('class','unselected');
          $("#Footer>div#Notifications").attr('class','selected');
          $("#PageName h1").html("Notifications");
          break;

        case "Menu":
          $(Icon).attr('class','selected');
          $("#MenuPage").removeClass('hidden');
          $("#MainContent>div:not(#MenuPage)").addClass('hidden');
          width=document.body.clientWidth;
          $("#MainContent").scrollLeft(width*5);
          setTimeout(function(){
            width=document.body.clientWidth;
            $("#MainContent").scrollLeft(width*5);
          },1)
          document.body.scrollTop=MenuScroll;
          $("#BannerTabs>div:not(#Menu)").attr('class','unselected');
          $("#Footer>div:not(#Menu)").attr('class','unselected');
          $("#Footer>div#Menu").attr('class','selected');
          $("#PageName h1").html("Menu");    
          break;
     
 };
      break;
  }
}
function ResizePage(){
  $(LastIcon).click();
  if($("#BusDescriptionWrapper").height()>154){
    seeMore(document.getElementsByClassName("SeeMore").item(0));
  }
}
function PageScroll(){
  var icon=$("#Footer .selected").eq(0)
  switch(icon.attr('id')){
    case "Profile":
      ProfileScroll=$("body").eq(0).scrollTop();
      break;
    case "Orders":
      OrderScroll=$("body").eq(0).scrollTop();
      break;
    case "Revenue":
      RevenueScroll=$("body").eq(0).scrollTop();
      break;
    case "Messages":
      MessageScroll=$("body").eq(0).scrollTop();
      break;
    case "Notifications":
      NotificationScroll=$("body").eq(0).scrollTop();
      break;
    case "Menu":
      MenuScroll=$("body").eq(0).scrollTop();
      break;
  }
}
function ReloadProfile(Obj){
  $("#ProfilePage *:not(.LoadingImg)").remove();
  $("#ProfilePage").addClass('loading');
  http.open("POST","Scripts/profile.php",true);
  http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  http.onreadystatechange=handleReloadRequest();
  http.send("ReloadProfile="+true);
  function handleReloadRequest(){
    if(http.readyState==4){
      if(http.status==200){
        $("#response").html(http.response);
        http.abort();
      }
      else{
        setTimeout(handleReloadRequest,2000);
      }
    }
    else{
      setTimeout(handleReloadRequest,2000);
    }
  }
}
function CloseAlert(){
  $('#alert').addClass('hidden');
}
function failureAlert(text){
  $("#alert #alertIcon").html("<img src='../../Images/Failure.svg'>");
  $("#alert #content").html(text);
  $("#alert .close").removeClass('hidden');
  $("#alert").addClass('failure');
  $("#alert").removeClass('success');
  $("#alert").removeClass('info');
  $("#alert").removeClass('hidden');
}
function successAlert(text){
  $("#alert #alertIcon").html("<img src='../../Images/Success.svg'>");
  $("#alert #content").html(text);
  $("#alert .close").addClass('hidden');
  $("#alert").addClass('success');
  $("#alert").removeClass('failure');
  $("#alert").removeClass('info');
  $("#alert").removeClass('hidden');
  setTimeout(function(){
    $("#alert").addClass('hidden');
  },3000);
}
function infoAlert(text){
  $("#alert #alertIcon").html("<img src='../../Images/Tip.svg'>");
  $("#alert #content").html(text);
  $("#alert .close").removeClass('hidden');
  $("#alert").addClass('info');
  $("#alert").removeClass('failure');
  $("#alert").removeClass('success');
  $("#alert").removeClass('hidden');
}
function scrollIntoView(id,Adjust){
  document.getElementById(id).scrollIntoView(true);
  if(Adjust!=false){
    var height=$("#Banner").height()+$("#PageName").height();
    height=0-height;
    document.body.scrollBy(0,height);
  }
}
