var LastIcon;
var ProfileScroll;
var OrderScroll;
var RevenueScroll;
var MessageScroll;
var NotificationScroll;
var MenuScroll;
function ChangePage(Icon){
  LastIcon=Icon;
  var width=document.body.clientWidth;
  switch($(Icon).parents().attr('id')){
    case "Footer":
      switch(Icon.id){
        case "Profile":
          $(Icon).attr('class','selected');
          $("#ProfilePage").attr('class','');
          $("#MainContent").scrollLeft(0);
          document.body.scrollTo(0,ProfileScroll);
          $("#MainContent").children("div[id!='ProfilePage']").attr('class','hidden');
          $("#Footer div[id!='Profile']").attr('class','unselected');
          $("#BannerTabs div[id!='Profile']").attr('class','unselected');
          $("#BannerTabs div[id='Profile']").attr('class','selected');
          $("#PageName h1").html("Profile");
          break;

        case "Orders":
          $(Icon).attr('class','selected');
          $("#OrdersPage").attr('class','');
          $("#MainContent").scrollLeft(width);         
          document.body.scrollTo(0,OrderScroll);

          $("#MainContent").children("div[id!='OrdersPage']").attr('class','hidden');
          $("#Footer div[id!='Orders']").attr('class','unselected');
          $("#BannerTabs div[id!='Orders']").attr('class','unselected');
          $("#BannerTabs div[id='Orders']").attr('class','selected');
          $("#PageName h1").html("Orders");
          break;
     
        case "Revenue":
          $(Icon).attr('class','selected');
          $("#RevenuePage").attr('class','');
          $("#MainContent").scrollLeft(width*2);
          document.body.scrollTo(0,RevenueScroll);
          $("#MainContent").children("div[id!='RevenuePage']").attr('class','hidden');
          $("#Footer div[id!='Revenue']").attr('class','unselected');
          $("#BannerTabs div[id!='Revenue']").attr('class','unselected');
          $("#BannerTabs div[id='Revenue']").attr('class','selected');
          $("#PageName h1").html("Revenue");
          break;

        case "Messages":
          $(Icon).attr('class','selected');
          $("#MessagesPage").attr('class','');
          $("#MainContent").scrollLeft(width*3);  
          document.body.scrollTo(0,MessageScroll);
          $("#MainContent").children("div[id!='MessagesPage']").attr('class','hidden');
          $("#Footer div[id!='Messages']").attr('class','unselected');
          $("#BannerTabs div[id!='Messages']").attr('class','unselected');
          $("#BannerTabs div[id='Messages']").attr('class','selected');
          $("#PageName h1").html("Messages");
          break;

        case "Notifications":
          $(Icon).attr('class','selected');
          $("#NotificationsPage").attr('class','');
          $("#MainContent").scrollLeft(width*4);
          document.body.scrollTo(0,NotificationScroll);
          $("#MainContent").children("div[id!='NotificationsPage']").attr('class','hidden');
          $("#Footer div[id!='Notifications']").attr('class','unselected');
          $("#BannerTabs div[id!='Notifications']").attr('class','unselected');
          $("#BannerTabs div[id='Notifications']").attr('class','selected');
          $("#PageName h1").html("Notifications");
          break;

        case "Menu":
          $(Icon).attr('class','selected');
          $("#MenuPage").attr('class','');
          $("#MainContent").scrollLeft(width*5);
          document.body.scrollTo(0,MenuScroll);
          $("#MainContent").children("div[id!='MenuPage']").attr('class','hidden');
          $("#Footer div[id!='Menu']").attr('class','unselected');
          $("#BannerTabs div[id!='Menu']").attr('class','unselected');
          $("#BannerTabs div[id='Menu']").attr('class','selected');
          $("#PageName h1").html("Menu");    
          break;
     
 };
      break;
    case "BannerTabs":
      switch(Icon.id){
        case "Profile":
          $(Icon).attr('class','selected');
          $("#ProfilePage").attr('class','');
          $("#MainContent").scrollLeft(0);
          document.body.scrollTo(0,ProfileScroll);
          $("#MainContent").children("div[id!='ProfilePage']").attr('class','hidden');
          $("#BannerTabs div[id!='Profile']").attr('class','unselected');
          $("#Footer div[id!='Profile']").attr('class','unselected');
          $("#Footer div[id='Profile']").attr('class','selected');
          $("#PageName h1").html("Profile");
          break;
     
        case "Orders":
          $(Icon).attr('class','selected');
          $("#OrdersPage").attr('class','');
          $("#MainContent").scrollLeft(width);
          document.body.scrollTo(0,OrderScroll);
          $("#MainContent").children("div[id!='OrdersPage']").attr('class','hidden');
          $("#BannerTabs div[id!='Orders']").attr('class','unselected');
          $("#Footer div[id!='Orders']").attr('class','unselected');
          $("#Footer div[id='Orders']").attr('class','selected');
          $("#PageName h1").html("Orders");
          break;
     
        case "Revenue":
          $(Icon).attr('class','selected');
          $("#RevenuePage").attr('class','');
          $("#MainContent").scrollLeft(width*2);
          document.body.scrollTo(0,RevenueScroll);
          $("#MainContent").children("div[id!='RevenuePage']").attr('class','hidden');
          $("#BannerTabs div[id!='Revenue']").attr('class','unselected');
          $("#Footer div[id!='Revenue']").attr('class','unselected');
          $("#Footer div[id='Revenue']").attr('class','selected');
          $("#PageName h1").html("Revenue");
          break;
     
        case "Messages":
          $(Icon).attr('class','selected');
          $("#MessagesPage").attr('class','');
          $("#MainContent").scrollLeft(width*3);
          document.body.scrollTo(0,MessageScroll);
          $("#MainContent").children("div[id!='MessagesPage']").attr('class','hidden');
          $("#BannerTabs div[id!='Messages']").attr('class','unselected');
          $("#Footer div[id!='Messages']").attr('class','unselected');
          $("#Footer div[id='Messages']").attr('class','selected');
          $("#PageName h1").html("Messages");
          break;
          
        case "Notifications":
          $(Icon).attr('class','selected');
          $("#NotificationsPage").attr('class','');
          $("#MainContent").scrollLeft(width*4);
          document.body.scrollTo(0,NotificationScroll);
          $("#MainContent").children("div[id!='NotificationsPage']").attr('class','hidden');
          $("#BannerTabs div[id!='Notifications']").attr('class','unselected');
          $("#Footer div[id!='Notifications']").attr('class','unselected');
          $("#Footer div[id='Notifications']").attr('class','selected');
          $("#PageName h1").html("Notifications");
          break;
          
        case "Menu":
          $(Icon).attr('class','selected');
          $("#MenuPage").attr('class','');
          $("#MainContent").scrollLeft(width*5);
          document.body.scrollTo(0,MenuScroll);
          $("#MainContent").children("div[id!='MenuPage']").attr('class','hidden');
          $("#BannerTabs div[id!='Menu']").attr('class','unselected');
          $("#Footer div[id!='Menu']").attr('class','unselected');
          $("#Footer div[id='Menu']").attr('class','selected');
          $("#PageName h1").html("Menu");    
          break;
 };
      break;
  }
}
function CloseAlert(obj){
  $(obj).css('transform','scale(1.5,1.5)');
  $(obj).css('transform','scale(1,1)');
  $(obj.parentElement.parentElement).attr('class','hidden');
}
function ResizePage(){
  $(LastIcon).click()
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