// to save the wanted user data to use it in another places
import Cookies  from 'js-cookie'
class StorageManager{


    static setCookies = (data)=>{

      Cookies.set('userData',data,{sameSite:"strict"})
      
          
    }
   static getUserData = ()=>{
    
   
   const data = Cookies.get('userData')
   if (data !== undefined && Object.keys(data).length !== 0){
    return JSON.parse(data)
   }
   else{
    return {}
   }
     
    }
   
}

export default StorageManager

