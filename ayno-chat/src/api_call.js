import {axiosInestance} from "./axios/inestance"

class ApiCall {
    static getAuthentication = ()=>{
        try {
            const data = axiosInestance.get('/user/checkAuthentication').then((value) => value)

            return data
        } catch (error) {
            console.log(error)
        }
        
    }
    static getFriendsList = () => {
        try {
            let friendsList = axiosInestance.get('/user/friends' ).then((value) => {
                    return value
                })
            return friendsList
        } catch (error) {
            console.log(error)
        }


    }
    static getUserChatMessages = (friendId) => {
        try {
            let result = axiosInestance.post(`/chat/messages`, {


                params: {

                    friend_id: friendId
                }
            }).then(data => {
                return data
            })
            return result
        } catch (error) {
            console.log(error)
        }
    }
    static getSearchData = (userName, userId) => {
        try {
            let searchList = axiosInestance.get('/user/search', {


            }).then((value) => {

                return value
            })
            return searchList
        } catch (error) {
            console.log(error)
        }

    }

    static getUserLoginData = (userLoginData) => {
        try {
            let userData = axiosInestance.post('/user/login', userLoginData, {}).then(value => value)
            return userData
        } catch (error) {
            console.log(error)
        }
    }
    static getMediaData = (conversation_id) => {
        try {
            let media = axiosInestance.get('/user/get-media', { params: { conversation_id: conversation_id } }).then(val => val)
            return media
        } catch (e) {
            console.log(e)
        }
    }
    static postUserRegisterData = (data) => {


        try {
            let postData = axiosInestance.post('/user/register', data).then(value => value)
            return postData

        } catch (error) {
            console.log(error)
        }

    }
    static postMediaToServer(media) {
        try {
            return axiosInestance.post('/user/send-image', media, {}).then(val => val)
        } catch (error) {
            console.log(error)
        }
    }
    static postUserMessage = (data) => {
        try {
            const message = axiosInestance.post('/chat/send-message/', data).then(value => value)
            return message
        } catch (error) {
            console.log(error)
        }
    }

    static postFriendRequest = (data) => {
        try {
            const sendFriendRequest = axiosInestance.post('/user/add-friend', data).then(value => value)
            return sendFriendRequest
        } catch (error) {
            console.log(error)
        }
    }

    static getFriendsRequestList = ()=>{
        try {
            const getFriendRequestsList = axiosInestance.get('/user/get-friend-requests').then(val=>val)
            return getFriendRequestsList
        } catch (error) {
            console.log(error)
        }
       
    }
}

export default ApiCall