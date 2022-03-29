require.config(
{
  baseUrl:"Scripts"
})
if(document.head.id=="SignupPage"){
 define(['Signup','jquery-3.6.0']) 
}

if(document.head.id=="IndexPage"){
  define(['index','jquery-3.6.0'],function(){
    $("body").on("load",function(){
  ShowModule();
    });

$("body").on("scroll",ShowModule());
  })
}