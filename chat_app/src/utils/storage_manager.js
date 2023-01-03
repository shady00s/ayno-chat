// to save the wanted user data to use it in another places
import {userStorageName} from '../constants'

class StorageManager{
    static insertDataToStorage = (userData, storageType)=>{

        switch (storageType) {
            case "local":
    
                // remove any old data 
                localStorage.removeItem(userStorageName)
                //add data to localstorage
                localStorage.setItem(userStorageName, JSON.stringify(userData))
                break;
    
            case "session":
                // remove any old data 
                sessionStorage.removeItem( userStorageName )
                //add data to sessionStorage
                sessionStorage.setItem(userStorageName, JSON.stringify(userData))
                break;
            default:
                break;
        }
    }

    static getDataFromStorage = ()=>{
        //search in local storage
        let userDataFromLocalStorage = JSON.parse(localStorage.getItem(userStorageName)) 
        let userDataFromSessionStorage = JSON.parse(sessionStorage.getItem(userStorageName)) 
            if(userDataFromLocalStorage !== null){
                return userDataFromLocalStorage
            }
            else if (userDataFromSessionStorage !==null) {
                return userDataFromSessionStorage
            } 
            else{
                console.log("no data found")
               return {}
            }
         
    }
}

export default StorageManager

