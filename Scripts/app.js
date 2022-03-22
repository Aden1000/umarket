requirejs.config(
  {
  baseUrl:'../Scripts/'
  }
)
if(document.head.id=="SignupPage"){
 define(['Signup','jquery-2.1.3.min']) 
}

if(document.head.id=="IndexPage"){
  define(['index','jquery-2.1.3.min'])
}