// to save the wanted user data to use it in another places
import {userStorageName} from '../constants'
import Cookies  from 'js-cookie'
class StorageManager{


    static getDataFromStorage = ()=>{
        console.log(Cookies.get('userId'))
     return  Cookies.get('userId')
         
    }
    static removeUserData = ()=>{
        localStorage.removeItem(userStorageName)
        sessionStorage.removeItem(userStorageName)
    }
}

export default StorageManager

