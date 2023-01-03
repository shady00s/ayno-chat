import axiosInestance from "../axios/inestance"

class ApiCall{
    static getFriendsList = (userID)=>{
        try {
            let friendsList =  axiosInestance.get('/user/friends'
            ,{
                  params:{
                      user_id:userID
                  }
              }).then((value)=>{
                     return value
              })
              return friendsList
        } catch (error) {
            console.log(error)
        }

     
    }
    static getUserChatMessages = (userID,friendId)=>{
        try {
            let result = axiosInestance.post(`/chat/messages`,{},{params:{
                user_id:userID, 
                friend_id:friendId
            }}).then(data=>{
               return data
            } )
            return result
        } catch (error) {
            console.log(error)
        }
    }
    static getSearchData = (userName)=>{
        try {
            let searchList = axiosInestance.get('/user/search',{
                params:{contactName:userName}
            
            }).then((value)=>{
               
                    return value
            })
            return searchList
        } catch (error) {
            console.log(error)
        }
        
    }

    static getUserLoginData = ()=>{
        try {
            let userData = axiosInestance.get('/user/login').then(value=>value)
            return userData
        } catch (error) {
            console.log(error)
        }
    }

    static postUserRegisterData = (data)=>{


        try {
            let postData = axiosInestance.post('/user/register',data).then(value=> value)
            return postData        

        } catch (error) {
            console.log(error)
        }

    }
    static postUserMessage = (data)=>{
        try{
       const message = axiosInestance.post('/chat/send-message/',data).then(value=>value)
        return message
    } catch (error) {
        console.log(error)
    }
    }
}

export default ApiCall