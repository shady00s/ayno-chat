

export const initialState = {
    contact:{
        _id:null,
        name:"",
        profileImagePath:"",
        conversations:[],
        type:''
    },

    notifications:{
        groupNotifications:[],
        messageNotifications:[],
        friendsNotifications:[],
        friendRequestsNotifications:[]
    },
    user:{
        id:null,
        name:"",
        profileImagePath:"",
    },
    friend:{
        data:{
            _id:null,
        name:"",
        profileImagePath:"",
        conversations:[]
        },
        type:""
        
    }
}