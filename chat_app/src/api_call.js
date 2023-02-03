import axiosInestance from "./axios/inestance"

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
    static getSearchData = (userName,userId)=>{
        try {
            let searchList = axiosInestance.get('/user/search',{
                params:{contactName:userName,userId}
            
            }).then((value)=>{
               
                    return value
            })
            return searchList
        } catch (error) {
            console.log(error)
        }
        
    }

    static getUserLoginData = (userLoginData)=>{
        try {
            let userData = axiosInestance.post('/user/login',userLoginData).then(value=>value)
            return userData
        } catch (error) {
            console.log(error)
        }
    }
    static getMediaData = (conversation_id)=>{
        try{
            let media = axiosInestance.get('/user/get-media',{params:{conversation_id:conversation_id}}).then(val=>val)
            return media
        }catch(e){
            console.log(e)
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
    static postMediaToServer(media){
        try {
            return axiosInestance.post('/user/send-image',media).then(val=>val)
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

    static postFriendRequest = (data)=>{
        try {
            const friendReq = axiosInestance.post('/user/add-friend',data).then(value=>value)
            return friendReq
        } catch (error) {
            console.log(error)
        }
    }
}

export default ApiCall