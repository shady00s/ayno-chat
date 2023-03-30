import { axiosInestance, userInstance } from "./axios/inestance"

class ApiCall {
    static getAuthentication = () => {
        try {
            const data = userInstance.get('/checkAuthentication').then((value) => value)

            return data
        } catch (error) {
            console.log(error)
        }

    }
    static getFriendsList = () => {
        try {
            let friendsList = userInstance.get('/friends').then((value) => {
                return value
            })
            return friendsList
        } catch (error) {
            console.log(error)
        }


    }
    static getUserChatMessages = (conversation_id,page) => {

            let result = axiosInestance.get(`/chat/messages`, {


                params: {
                    conversation_id:conversation_id,
                    page:page
                }
            }).then(data => {
                return data
            })
            return result
       
    }
    static getSearchData = (contactName) => {
        try {
            let searchList = userInstance.get('/search', {
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
        
            let userData = userInstance.get('/login', {params:userLoginData}).then(value => value)
            return userData
       
    }
    static getMediaData = (conversation_id) => {
        try {
            let media = userInstance.get('/get-media', { params: { conversation_id: conversation_id } }).then(val => val)
            return media
        } catch (e) {
            console.log(e)
        }
    }
    static postUserRegisterData = (data) => {


        try {
            let postData = userInstance.post('/register', data).then(value => value)
            return postData

        } catch (error) {
            console.log(error)
        }

    }
    static postMediaToServer(media) {
        try {
            return userInstance.post('/send-image', media, {}).then(val => val)
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
            const sendFriendRequest = userInstance.post('/add-friend', data).then(value => value)
            return sendFriendRequest
        } catch (error) {
            console.log(error)
        }
    }

    static getFriendsRequestList = () => {
        try {
            const getFriendRequestsList = userInstance.get('/get-friend-requests').then(val => val)
            return getFriendRequestsList
        } catch (error) {
            console.log(error)
        }

    }

    static acceptFriendRequest = (contact_id) => {
        try {
            const postFriendRequest = userInstance.post('/accept-friend', { contact_id: contact_id }).then(val => val)
            return postFriendRequest;
        } catch (error) {
            console.log(error)
        }
    }
    static ignoreFriendRequest(friend_id) {
        try {
            const ignore = userInstance.get('/ignore-friend-requests', {
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
            const profile = userInstance.post('/edit-profile', profileData).then(value => value)

            return profile
        } catch (error) {
            console.log(error)
        }

    }

    static createGroup(groupData) {
        try {
            const group = userInstance.post('/create-group',groupData).then(value => value)
            return group
        } catch (error) {
            console.log(error)
        }

    }
    static getGroups(){
        const groups = userInstance.get('/get-groups').then(value => value)
        return groups
    }

    static getGroupContacts(id){
        const contacts = userInstance.get('/get-group-contacts',{params:{groupId:id}}).then(value => value)
        return contacts
    }

    static getGroupsInfo(id){
        const groups = userInstance.get('/group-information',{params:{conversation_id:id}}).then(value => value)
        return groups
    }
    static getGroupMessges(id,page){
        const groups = axiosInestance.get('/chat/group-messages',{params:{conversation_id:id,page}}).then(value => value)
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
    static sendVoteParticipent (voteSubmitData){
        const vote = axiosInestance.post('/chat/send-vote-particepent',voteSubmitData).then(res=>res)
   
            return vote
    }
    static addContactToGroup(contactData){
        const contact = userInstance.post('/add-contact-to-group',contactData).then(res=>res)
        
        return contact
    }
    static deleteFriend(contact_id){
        const friend = userInstance.post('/remove-friend',{friend_id:contact_id}).then(res=>res)
        return friend
    }
    static getNewFriendsToGroup(id){
        const data = userInstance.get('/get-new-group-members',{params:{group_id:id}}).then(res=>res)
        return data
    }

    static logOut(){
        const logOut = userInstance.get('/logout').then(res=>res)
        return logOut
    }
}

export default ApiCall