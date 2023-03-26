

export const initialState = {
    contact:{
        _id:null,
        name:"",
        profileImagePath:"",
        conversations:[],
        type:''
    },
    navigation:{
        name:'',
        value:''
    },
    notifications:{
        groupNotifications:[],
        messageNotifications:[],
        newFriendsNotifications:[],
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