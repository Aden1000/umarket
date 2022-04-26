function ChangePage(Icon){
  switch($(Icon).parents().attr('id')){
    case "Footer":
      switch(Icon.id){
   case "Profile":
     $(Icon).attr('class','selected');
     $("#ProfilePage").attr('class','');
     $("#MainContent").children("div[id!='ProfilePage']").attr('class','hidden');
     $("#Footer div[id!='Profile']").attr('class','unselected');
     $("#PageName h1").html("Profile");
     break;
     
   case "Orders":
     $(Icon).attr('class','selected');
     $("#OrdersPage").attr('class','');
     $("#MainContent").children("div[id!='OrdersPage']").attr('class','hidden');
     $("#Footer div[id!='Orders']").attr('class','unselected');
     $("#PageName h1").html("Orders");
     break;
     
   case "Revenue":
     $(Icon).attr('class','selected');
     $("#RevenuePage").attr('class','');
     $("#MainContent").children("div[id!='RevenuePage']").attr('class','hidden');
     $("#Footer div[id!='Revenue']").attr('class','unselected');
     $("#PageName h1").html("Revenue");
     break;
     
     case "Messages":
     $(Icon).attr('class','selected');
     $("#MessagesPage").attr('class','');
     $("#MainContent").children("div[id!='MessagesPage']").attr('class','hidden');
     $("#Footer div[id!='Messages']").attr('class','unselected');
     $("#PageName h1").html("Messages");
     break;
          
   case "Notifications":
     $(Icon).attr('class','selected');
     $("#NotificationsPage").attr('class','');
     $("#MainContent").children("div[id!='NotificationsPage']").attr('class','hidden');
     $("#Footer div[id!='Notifications']").attr('class','unselected');
     $("#PageName h1").html("Notifications");
     break;
          
   case "Menu":
     $(Icon).attr('class','selected');
     $("#MenuPage").attr('class','');
     $("#MainContent").children("div[id!='MenuPage']").attr('class','hidden');
     $("#Footer div[id!='Menu']").attr('class','unselected');
     $("#PageName h1").html("Menu");    
     break;
     
 };
      break;
    case "BannerTabs":
      switch(Icon.id){
   case "Profile":
     $(Icon).attr('class','selected');
     $("#ProfilePage").attr('class','');
     $("#MainContent").children("div[id!='ProfilePage']").attr('class','hidden');
     $("#BannerTabs div[id!='Profile']").attr('class','unselected');
     $("#PageName h1").html("Profile");
     break;
     
   case "Orders":
     $(Icon).attr('class','selected');
     $("#OrdersPage").attr('class','');
     $("#MainContent").children("div[id!='OrdersPage']").attr('class','hidden');
     $("#BannerTabs div[id!='Orders']").attr('class','unselected');
     $("#PageName h1").html("Orders");
     break;
     
   case "Revenue":
     $(Icon).attr('class','selected');
     $("#RevenuePage").attr('class','');
     $("#MainContent").children("div[id!='RevenuePage']").attr('class','hidden');
     $("#BannerTabs div[id!='Revenue']").attr('class','unselected');
     $("#PageName h1").html("Revenue");
     break;
     
     case "Messages":
     $(Icon).attr('class','selected');
     $("#MessagesPage").attr('class','');
     $("#MainContent").children("div[id!='MessagesPage']").attr('class','hidden');
     $("#BannerTabs div[id!='Messages']").attr('class','unselected');
     $("#PageName h1").html("Messages");
     break;
          
   case "Notifications":
     $(Icon).attr('class','selected');
     $("#NotificationsPage").attr('class','');
     $("#MainContent").children("div[id!='NotificationsPage']").attr('class','hidden');
     $("#BannerTabs div[id!='Notifications']").attr('class','unselected');
     $("#PageName h1").html("Notifications");
     break;
          
   case "Menu":
     $(Icon).attr('class','selected');
     $("#MenuPage").attr('class','');
     $("#MainContent").children("div[id!='MenuPage']").attr('class','hidden');
     $("#BannerTabs div[id!='Menu']").attr('class','unselected');
     $("#PageName h1").html("Menu");    
     break;
 };
      break;
  }
}