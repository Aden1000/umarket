require.config(
{
  baseUrl:"Scripts"
})
if(document.head.id=="SignupPage"){
 define(['Signup','jquery-3.6.0']) 
}

if(document.head.id=="IndexPage"){
  define(['index'])
}

if(document.head.id=="TestPage"){
  define(['test','jquery-3.6.0'])
}