import { axiosInestance } from "./axios/inestance"

class ApiCall {
    static getAuthentication = () => {
        try {
            const data = axiosInestance.get('/user/checkAuthentication').then((value) => value)

            return data
        } catch (error) {
            console.log(error)
        }

    }
    static getFriendsList = () => {
        try {
            let friendsList = axiosInestance.get('/user/friends').then((value) => {
                return value
            })
            return friendsList
        } catch (error) {
            console.log(error)
        }


    }
    static getUserChatMessages = (conversation_id,page) => {
        try {
            let result = axiosInestance.get(`/chat/messages`, {


                params: {
                    conversation_id:conversation_id,
                    page:page
                }
            }).then(data => {
                return data
            })
            return result
        } catch (error) {
            console.log(error)
        }
    }
    static getSearchData = (contactName) => {
        try {
            let searchList = axiosInestance.get('/user/search', {
                params: {
                    contactName: contactName
                }

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

    static getFriendsRequestList = () => {
        try {
            const getFriendRequestsList = axiosInestance.get('/user/get-friend-requests').then(val => val)
            return getFriendRequestsList
        } catch (error) {
            console.log(error)
        }

    }

    static acceptFriendRequest = (contact_id) => {
        try {
            const postFriendRequest = axiosInestance.post('/user/accept-friend', { contact_id: contact_id }).then(val => val)
            return postFriendRequest;
        } catch (error) {
            console.log(error)
        }
    }
    static ignoreFriendRequest(friend_id) {
        try {
            const ignore = axiosInestance.get('/user/ignore-friend-requests', {
                params: {
                    friend_id: friend_id
                }
            }).then(val => val)

            return ignore
        } catch (error) {
            console.log(error)
        }



    }
    static editProfileData(profileData) {
        try {
            const profile = axiosInestance.post('/user/edit-profile', profileData).then(value => value)

            return profile
        } catch (error) {
            console.log(error)
        }

    }

    static createGroup(groupData) {
        try {
            const group = axiosInestance.post('/user/create-group',groupData).then(value => value)
            return group
        } catch (error) {
            console.log(error)
        }

    }
    static getGroups(){
        const groups = axiosInestance.get('/user/get-groups').then(value => value)
        return groups
    }

    static getGroupContacts(id){
        const contacts = axiosInestance.get('/user/get-group-contacts',{params:{groupId:id}}).then(value => value)
        return contacts
    }

    static getGroupsInfo(id){
        const groups = axiosInestance.get('/user/group-information',{params:{conversation_id:id}}).then(value => value)
        return groups
    }
    static getGroupMessges(id){
        const groups = axiosInestance.get('/user/get-group-messages',{params:{conversation_id:id}}).then(value => value)
        return groups
    }
    static postGroupMessage(messageData){
        const groups = axiosInestance.post('/chat/send-group-message',messageData).then(value => value)
        return groups
    }
    static createVote(voteData){
        const vote = axiosInestance.post('/chat/create-vote',voteData).then(res=>res)
   
            return vote
    }
}

export default ApiCall